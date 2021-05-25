using DivinoLanches.Models;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DivinoLanches.Repository
{
    public class ComandaRepo
    {
        public async Task<List<ComandaModel>> ObterTodos()
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("SELECT * FROM comanda;", connection);
            using var reader = await command.ExecuteReaderAsync();

            List<ComandaModel> lista = new List<ComandaModel>();

            while (await reader.ReadAsync())
            {
                lista.Add(new ComandaModel()
                {
                    Id = Convert.ToInt32(reader.GetValue(0)),
                    NomeCliente = reader.GetValue(1).ToString(),
                    ValorTotal = reader.GetValue(2).ToString(),
                    Ativo = Convert.ToBoolean(reader.GetValue(3))
                });
            }

            await connection.CloseAsync();

            return lista;
        }

        public async Task<List<ComandaModel>> ObterFiltrado(ComandaModel model)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("SELECT * FROM comanda WHERE (ativo = @ativo or @ativo is null) and (nomecliente = @nomecliente or @nomecliente is null);", connection);

            command.Parameters.AddWithValue("@ativo", model.Ativo);
            command.Parameters.AddWithValue("@nomecliente", model.NomeCliente);
            
            using var reader = await command.ExecuteReaderAsync();

            List<ComandaModel> lista = new List<ComandaModel>();

            while (await reader.ReadAsync())
            {
                lista.Add(new ComandaModel()
                {
                    Id = Convert.ToInt32(reader.GetValue(0)),
                    NomeCliente = reader.GetValue(1).ToString(),
                    ValorTotal = reader.GetValue(2).ToString(),
                    Ativo = Convert.ToBoolean(reader.GetValue(3))                    
                });
            }

            await connection.CloseAsync();

            return lista;
        }

        public async Task<List<ProdutoComandaModel>> ObterFiltradoProdutoComanda(ProdutoComandaModel model)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("SELECT * FROM produtocomanda WHERE idcomanda = @idcomanda AND nomeproduto = @nomeproduto;", connection);

            command.Parameters.AddWithValue("@idcomanda", model.IdComanda);
            command.Parameters.AddWithValue("@nomeproduto", model.NomeProduto);

            using var reader = await command.ExecuteReaderAsync();

            List<ProdutoComandaModel> lista = new List<ProdutoComandaModel>();

            while (await reader.ReadAsync())
            {
                lista.Add(new ProdutoComandaModel()
                {
                    Id = Convert.ToInt32(reader.GetValue(0)),
                    IdComanda = Convert.ToInt32(reader.GetValue(1)),
                    NomeProduto = reader.GetValue(2).ToString(),
                    TipoProduto = reader.GetValue(3).ToString(),
                    SubTipoProduto = reader.GetValue(4).ToString(),
                    Quantidade = Convert.ToInt32(reader.GetValue(5)),
                    Valor = Convert.ToDouble(reader.GetValue(6)),
                });
            }

            await connection.CloseAsync();

            return lista;
        }

        public async Task<List<ProdutoComandaModel>> ObterProdutosComandaPorId(int idComanda)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("SELECT * FROM produtocomanda WHERE idcomanda = @idComanda;", connection);

            command.Parameters.AddWithValue("@idComanda", idComanda);

            using var reader = await command.ExecuteReaderAsync();

            List<ProdutoComandaModel> lista = new List<ProdutoComandaModel>();

            while (await reader.ReadAsync())
            {
                lista.Add(new ProdutoComandaModel()
                {
                    Id = Convert.ToInt32(reader.GetValue(0)),
                    IdComanda = Convert.ToInt32(reader.GetValue(1)),
                    NomeProduto = reader.GetValue(2).ToString(),
                    TipoProduto = reader.GetValue(3).ToString(),
                    SubTipoProduto = reader.GetValue(4).ToString(),
                    Quantidade = Convert.ToInt32(reader.GetValue(5)),
                    Valor = Convert.ToDouble(reader.GetValue(6)),
                });
            }

            await connection.CloseAsync();

            return lista;
        }

        public async Task<ComandaModel> ObterPorId(int id)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("SELECT * FROM comanda WHERE id = @id;", connection);

            command.Parameters.AddWithValue("@id", id);

            using var reader = await command.ExecuteReaderAsync();

            ComandaModel obj = new ComandaModel();

            while (await reader.ReadAsync())
            {
                obj.Id = Convert.ToInt32(reader.GetValue(0));
                obj.NomeCliente = reader.GetValue(1).ToString();
                obj.ValorTotal = reader.GetValue(2).ToString();
                obj.Ativo = Convert.ToBoolean(reader.GetValue(3));                
            }

            await connection.CloseAsync();

            return obj;
        }

        public async Task<ComandaModel> Incluir(ComandaModel model)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("INSERT INTO comanda (nomecliente, valortotal, ativo) VALUES (@nomecliente, @valortotal, @ativo);", connection);

            command.Parameters.AddWithValue("@nomecliente", model.NomeCliente.ToUpper());
            command.Parameters.AddWithValue("@valortotal", 0);
            command.Parameters.AddWithValue("@ativo", true);

            ComandaModel obj = new ComandaModel();

            command.ExecuteNonQuery();

            await connection.CloseAsync();

            return obj;
        }

        public async void IncluirProdutoComanda(ProdutoComandaModel model)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("INSERT INTO produtocomanda (idcomanda, quantidade, nomeproduto, tipoproduto, subtipoproduto, Valor) VALUES " +
                "                                                           (@idcomanda, @quantidade, @nomeproduto, @tipoproduto, @subtipoproduto, @Valor);", connection);

            command.Parameters.AddWithValue("@idcomanda", model.IdComanda);
            command.Parameters.AddWithValue("@quantidade", model.Quantidade);
            command.Parameters.AddWithValue("@nomeproduto", model.NomeProduto);
            command.Parameters.AddWithValue("@tipoproduto", model.TipoProduto);
            command.Parameters.AddWithValue("@subtipoproduto", model.SubTipoProduto);
            command.Parameters.AddWithValue("@Valor", Convert.ToDouble(model.Valor));

            command.ExecuteNonQuery();

            await connection.CloseAsync();
        }

        public async void FinalizarComanda(ComandaModel model)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("UPDATE comanda set nomecliente = @nomecliente, " +
                "                                                   valortotal = @valortotal, " +
                "                                                   ativo = @ativo, " +
                "                                                   formapagamento = @formapagamento " +
                "                                               WHERE id = @id;", connection);

            command.Parameters.AddWithValue("@id", model.Id);
            command.Parameters.AddWithValue("@nomecliente", model.NomeCliente.ToUpper());
            command.Parameters.AddWithValue("@valortotal", Convert.ToDouble(model.ValorTotal));
            command.Parameters.AddWithValue("@ativo", false);
            command.Parameters.AddWithValue("@formapagamento", model.FormaPagamento);

            command.ExecuteNonQuery();

            await connection.CloseAsync();
        }

        public async void Alterar(ComandaModel model)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("UPDATE comanda set nomecliente = @nomecliente, ativo = @ativo, valortotal = @valortotal, formapagamento = @formapagamento WHERE id = @id;", connection);

            command.Parameters.AddWithValue("@id", model.Id);
            command.Parameters.AddWithValue("@nomecliente", model.NomeCliente.ToUpper());
            command.Parameters.AddWithValue("@valortotal", Convert.ToDouble(model.ValorTotal));
            command.Parameters.AddWithValue("@ativo", model.Ativo);
            command.Parameters.AddWithValue("@formapagamento", model.FormaPagamento);

            command.ExecuteNonQuery();

            await connection.CloseAsync();
        }

        public async void AlterarProdutoComanda(ProdutoComandaModel model)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("UPDATE produtocomanda set quantidade = @quantidade WHERE id = @id AND idcomanda = @idcomanda;", connection);

            command.Parameters.AddWithValue("@id", model.Id);
            command.Parameters.AddWithValue("@idcomanda", model.IdComanda);
            command.Parameters.AddWithValue("@quantidade", model.Quantidade);

            command.ExecuteNonQuery();

            await connection.CloseAsync();
        }

        public async void Excluir(int id)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("DELETE FROM comanda WHERE id = @id;", connection);

            command.Parameters.AddWithValue("@id", id);

            command.ExecuteNonQuery();

            await connection.CloseAsync();
        }

        public async void ExcluirProdutoComanda(int idProduto, int qtdAtual, int qtdRemover)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            if (qtdRemover == qtdAtual)
            {
                using var command = new MySqlCommand("DELETE FROM produtocomanda WHERE id = @idProduto;", connection);

                command.Parameters.AddWithValue("@idProduto", idProduto);

                command.ExecuteNonQuery();
            }
            else
            {                
                using var command = new MySqlCommand("UPDATE produtocomanda SET quantidade = (quantidade - @qtdremover)  WHERE id = @idProduto;", connection);

                command.Parameters.AddWithValue("@idProduto", idProduto);
                command.Parameters.AddWithValue("@qtdRemover", qtdRemover);

                command.ExecuteNonQuery();
            }
          
            await connection.CloseAsync();
        }
    }
}
