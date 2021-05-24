using DivinoLanches.Models;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DivinoLanches.Repository
{
    public class SubTipoProdutoRepo
    {
        public async Task<List<SubTipoProdutoModel>> ObterTodos()
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("SELECT * FROM subtipoproduto;", connection);
            using var reader = await command.ExecuteReaderAsync();

            List<SubTipoProdutoModel> lista = new List<SubTipoProdutoModel>();

            while (await reader.ReadAsync())
            {
                lista.Add(new SubTipoProdutoModel()
                {
                    Id = Convert.ToInt32(reader.GetValue(0)),
                    Nome = reader.GetValue(1).ToString(),
                    TipoProduto = reader.GetValue(2).ToString(),
                    Ativo = Convert.ToBoolean(reader.GetValue(3))
                });
            }

            await connection.CloseAsync();

            return lista;
        }

        public async Task<List<SubTipoProdutoModel>> ObterFiltrado(SubTipoProdutoModel model)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("SELECT * FROM subtipoproduto WHERE (nome = @nome or @nome is null) and (tipoproduto = @tipoproduto or @tipoproduto is null) and (ativo = @ativo or @ativo is null);", connection);

            command.Parameters.AddWithValue("@nome", model.Nome);
            command.Parameters.AddWithValue("@tipoproduto", model.TipoProduto);
            command.Parameters.AddWithValue("@ativo", model.Ativo);
            
            using var reader = await command.ExecuteReaderAsync();

            List<SubTipoProdutoModel> lista = new List<SubTipoProdutoModel>();

            while (await reader.ReadAsync())
            {
                lista.Add(new SubTipoProdutoModel()
                {
                    Id = Convert.ToInt32(reader.GetValue(0)),
                    Nome = reader.GetValue(1).ToString(),
                    TipoProduto = reader.GetValue(2).ToString(),
                    Ativo = Convert.ToBoolean(reader.GetValue(3))
                });
            }

            await connection.CloseAsync();

            return lista;
        }

        public async Task<SubTipoProdutoModel> ObterPorId(int id)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("SELECT * FROM subtipoproduto WHERE id = @id;", connection);

            command.Parameters.AddWithValue("@id", id);

            using var reader = await command.ExecuteReaderAsync();

            SubTipoProdutoModel obj = new SubTipoProdutoModel();

            while (await reader.ReadAsync())
            {
                obj.Id = Convert.ToInt32(reader.GetValue(0));
                obj.Nome = reader.GetValue(1).ToString();
                obj.TipoProduto = reader.GetValue(2).ToString();
                obj.Ativo = Convert.ToBoolean(reader.GetValue(3));
            }

            await connection.CloseAsync();

            return obj;
        }

        public async void Incluir(SubTipoProdutoModel model)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("INSERT INTO subtipoproduto (nome, tipoproduto, ativo) VALUES (@nome, @tipoproduto, @ativo);", connection);

            command.Parameters.AddWithValue("@nome", model.Nome.ToUpper());
            command.Parameters.AddWithValue("@tipoproduto", model.TipoProduto.ToUpper());
            command.Parameters.AddWithValue("@ativo", model.Ativo);

            command.ExecuteNonQuery();

            await connection.CloseAsync();
        }

        public async void Alterar(SubTipoProdutoModel model)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("UPDATE subtipoproduto set nome = @nome, tipoproduto = @tipoproduto, ativo = @ativo WHERE id = @id;", connection);
            
            command.Parameters.AddWithValue("@id", model.Id);
            command.Parameters.AddWithValue("@nome", model.Nome.ToUpper());
            command.Parameters.AddWithValue("@tipoproduto", model.TipoProduto);
            command.Parameters.AddWithValue("@ativo", model.Ativo);

            command.ExecuteNonQuery();

            await connection.CloseAsync();
        }

        public async void Excluir(int id)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("DELETE FROM subtipoproduto WHERE id = @id;", connection);
            
            command.Parameters.AddWithValue("@id", id);

            command.ExecuteNonQuery();

            await connection.CloseAsync();
        }
    }
}
