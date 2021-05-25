using DivinoLanches.Models;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DivinoLanches.Repository
{
    public class ProdutoRepo
    {
        public async Task<List<ProdutoModel>> ObterTodos()
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("SELECT * FROM produto;", connection);
            using var reader = await command.ExecuteReaderAsync();

            List<ProdutoModel> lista = new List<ProdutoModel>();

            while (await reader.ReadAsync())
            {
                lista.Add(new ProdutoModel()
                {
                    Id = Convert.ToInt32(reader.GetValue(0)),
                    Nome = reader.GetValue(1).ToString(),
                    Tipo = reader.GetValue(2).ToString(),
                    SubTipo = reader.GetValue(3).ToString(),
                    Valor = reader.GetValue(4).ToString(),
                    Ativo = Convert.ToBoolean(reader.GetValue(5))
                });
            }

            await connection.CloseAsync();

            return lista;
        }

        public async Task<List<ProdutoModel>> ObterFiltrado(ProdutoModel model)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("SELECT * FROM produto WHERE (nome = @nome or @nome is null) and (tipo = @tipo or @tipo is null) and (subtipo = @subtipo or @subtipo is null) and (ativo = @ativo or @ativo is null);", connection);

            command.Parameters.AddWithValue("@nome", model.Nome);
            command.Parameters.AddWithValue("@tipo", model.Tipo);
            command.Parameters.AddWithValue("@subtipo", model.SubTipo);
            command.Parameters.AddWithValue("@ativo", model.Ativo);
            
            using var reader = await command.ExecuteReaderAsync();

            List<ProdutoModel> lista = new List<ProdutoModel>();

            while (await reader.ReadAsync())
            {
                lista.Add(new ProdutoModel()
                {
                    Id = Convert.ToInt32(reader.GetValue(0)),
                    Nome = reader.GetValue(1).ToString(),
                    Tipo = reader.GetValue(2).ToString(),
                    SubTipo = reader.GetValue(3).ToString(),
                    Valor = reader.GetValue(4).ToString(),
                    Ativo = Convert.ToBoolean(reader.GetValue(5))
                });
            }

            await connection.CloseAsync();

            return lista;
        }

        public async Task<ProdutoModel> ObterPorId(int id)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("SELECT * FROM produto WHERE id = @id;", connection);

            command.Parameters.AddWithValue("@id", id);

            using var reader = await command.ExecuteReaderAsync();

            ProdutoModel obj = new ProdutoModel();

            while (await reader.ReadAsync())
            {
                obj.Id = Convert.ToInt32(reader.GetValue(0));
                obj.Nome = reader.GetValue(1).ToString();
                obj.Tipo = reader.GetValue(2).ToString();
                obj.SubTipo = reader.GetValue(3).ToString();
                obj.Valor = reader.GetValue(4).ToString();
                obj.Ativo = Convert.ToBoolean(reader.GetValue(5));
            }

            await connection.CloseAsync();

            return obj;
        }

        public async void Incluir(ProdutoModel model)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("INSERT INTO produto (nome, tipo, subtipo, valor, ativo) VALUES (@nome, @tipo, @subtipo, @valor, @ativo);", connection);

            command.Parameters.AddWithValue("@nome", model.Nome.ToUpper());
            command.Parameters.AddWithValue("@tipo", model.Tipo);
            command.Parameters.AddWithValue("@subtipo", model.SubTipo);
            command.Parameters.AddWithValue("@valor", Convert.ToDouble(model.Valor));
            command.Parameters.AddWithValue("@ativo", model.Ativo);

            command.ExecuteNonQuery();

            await connection.CloseAsync();
        }

        public async void Alterar(ProdutoModel model)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("UPDATE produto set nome = @nome, tipo = @tipo, subtipo = @subtipo, valor = @valor, ativo = @ativo WHERE id = @id;", connection);
            
            command.Parameters.AddWithValue("@id", model.Id);
            command.Parameters.AddWithValue("@nome", model.Nome.ToUpper());
            command.Parameters.AddWithValue("@tipo", model.Tipo);
            command.Parameters.AddWithValue("@subtipo", model.SubTipo);
            command.Parameters.AddWithValue("@valor", Convert.ToDouble(model.Valor));
            command.Parameters.AddWithValue("@ativo", model.Ativo);

            command.ExecuteNonQuery();

            await connection.CloseAsync();
        }

        public async void Excluir(int id)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("DELETE FROM produto WHERE id = @id;", connection);
            
            command.Parameters.AddWithValue("@id", id);

            command.ExecuteNonQuery();

            await connection.CloseAsync();
        }
    }
}
