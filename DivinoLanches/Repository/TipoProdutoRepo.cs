using DivinoLanches.Models;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DivinoLanches.Repository
{
    public class TipoProdutoRepo
    {
        public async Task<List<TipoProdutoModel>> ObterTodos()
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("SELECT * FROM tipoproduto;", connection);
            using var reader = await command.ExecuteReaderAsync();

            List<TipoProdutoModel> lista = new List<TipoProdutoModel>();

            while (await reader.ReadAsync())
            {
                lista.Add(new TipoProdutoModel()
                {
                    Id = Convert.ToInt32(reader.GetValue(0)),
                    Nome = reader.GetValue(1).ToString(),
                    Ativo = Convert.ToBoolean(reader.GetValue(2))
                });
            }

            await connection.CloseAsync();

            return lista;
        }

        public async Task<List<TipoProdutoModel>> ObterFiltrado(TipoProdutoModel model)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("SELECT * FROM tipoproduto WHERE (nome = @nome or @nome is null) and (ativo = @ativo or @ativo is null);", connection);

            command.Parameters.AddWithValue("@nome", model.Nome);
            command.Parameters.AddWithValue("@ativo", model.Ativo);
            
            using var reader = await command.ExecuteReaderAsync();

            List<TipoProdutoModel> lista = new List<TipoProdutoModel>();

            while (await reader.ReadAsync())
            {
                lista.Add(new TipoProdutoModel()
                {
                    Id = Convert.ToInt32(reader.GetValue(0)),
                    Nome = reader.GetValue(1).ToString(),
                    Ativo = Convert.ToBoolean(reader.GetValue(2))
                });
            }

            await connection.CloseAsync();

            return lista;
        }

        public async Task<TipoProdutoModel> ObterPorId(int id)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("SELECT * FROM tipoproduto WHERE id = @id;", connection);

            command.Parameters.AddWithValue("@id", id);

            using var reader = await command.ExecuteReaderAsync();

            TipoProdutoModel obj = new TipoProdutoModel();

            while (await reader.ReadAsync())
            {
                obj.Id = Convert.ToInt32(reader.GetValue(0));
                obj.Nome = reader.GetValue(1).ToString();
                obj.Ativo = Convert.ToBoolean(reader.GetValue(2));
            }

            await connection.CloseAsync();

            return obj;
        }

        public async void Incluir(TipoProdutoModel model)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("INSERT INTO tipoproduto (nome, ativo) VALUES (@nome, @ativo);", connection);

            command.Parameters.AddWithValue("@nome", model.Nome.ToUpper());
            command.Parameters.AddWithValue("@ativo", model.Ativo);

            command.ExecuteNonQuery();

            await connection.CloseAsync();
        }

        public async void Alterar(TipoProdutoModel model)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("UPDATE tipoproduto set nome = @nome, ativo = @ativo WHERE id = @id;", connection);
            
            command.Parameters.AddWithValue("@id", model.Id);
            command.Parameters.AddWithValue("@nome", model.Nome);
            command.Parameters.AddWithValue("@ativo", model.Ativo);

            command.ExecuteNonQuery();

            await connection.CloseAsync();
        }

        public async void Excluir(int id)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("DELETE FROM tipoproduto WHERE id = @id;", connection);
            
            command.Parameters.AddWithValue("@id", id);

            command.ExecuteNonQuery();

            await connection.CloseAsync();
        }
    }
}
