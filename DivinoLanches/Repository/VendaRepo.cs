using DivinoLanches.Models;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DivinoLanches.Repository
{
    public class VendaRepo
    {
        public async Task<List<VendaModel>> ObterTodos()
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("SELECT * FROM venda;", connection);
            using var reader = await command.ExecuteReaderAsync();

            List<VendaModel> lista = new List<VendaModel>();

            while (await reader.ReadAsync())
            {
                lista.Add(new VendaModel()
                {
                    Id = Convert.ToInt32(reader.GetValue(0)),
                    NomeProduto = reader.GetValue(1).ToString(),
                    TipoProduto = reader.GetValue(2).ToString(),
                    SubTipoProduto = reader.GetValue(3).ToString(),
                    FormaPagamento = reader.GetValue(4).ToString(),
                    Quantidade = Convert.ToInt32(reader.GetValue(5)),
                    ValorTotal = Convert.ToDouble(reader.GetValue(6)),
                    DataVenda = Convert.ToDateTime(reader.GetValue(7)).ToString()
                });
            }

            await connection.CloseAsync();

            return lista;
        }

        public async Task<List<VendaModel>> ObterFiltrado(VendaModel model)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("SELECT * FROM venda WHERE " +
                "                               (nomeproduto = @nomeproduto or @nomeproduto is null) and " +
                "                               (tipoproduto = @tipoproduto or @tipoproduto is null) and " +
                "                               (subtipoproduto = @subtipoproduto or @subtipoproduto is null) and " +
                "                               (formapagamento = @formapagamento or @formapagamento is null) and " +
                "                               ((datavenda >= @datade and datavenda <= @dataate) or (@datade is null and @dataate is null));", connection);

            command.Parameters.AddWithValue("@nomeproduto", string.IsNullOrWhiteSpace(model.NomeProduto) ? null : model.NomeProduto);
            command.Parameters.AddWithValue("@tipoproduto", string.IsNullOrWhiteSpace(model.TipoProduto) ? null : model.TipoProduto);
            command.Parameters.AddWithValue("@subtipoproduto", string.IsNullOrWhiteSpace(model.SubTipoProduto) ? null : model.SubTipoProduto);
            command.Parameters.AddWithValue("@formapagamento", string.IsNullOrWhiteSpace(model.FormaPagamento) ? null : model.FormaPagamento);
            command.Parameters.AddWithValue("@datade", string.IsNullOrWhiteSpace(model.DataDe) ? null : Convert.ToDateTime(model.DataDe).ToString("yyyy-MM-dd"));
            command.Parameters.AddWithValue("@dataate", string.IsNullOrWhiteSpace(model.DataAte) ? null : Convert.ToDateTime(model.DataAte).AddDays(1).ToString("yyyy-MM-dd"));

            using var reader = await command.ExecuteReaderAsync();

            List<VendaModel> lista = new List<VendaModel>();

            while (await reader.ReadAsync())
            {
                lista.Add(new VendaModel()
                {
                    Id = Convert.ToInt32(reader.GetValue(0)),
                    NomeProduto = reader.GetValue(1).ToString(),
                    TipoProduto = reader.GetValue(2).ToString(),
                    SubTipoProduto = reader.GetValue(3).ToString(),
                    FormaPagamento = reader.GetValue(4).ToString(),
                    Quantidade = Convert.ToInt32(reader.GetValue(5)),
                    ValorTotal = Convert.ToDouble(reader.GetValue(6)),
                    DataVenda = Convert.ToDateTime(reader.GetValue(7)).ToString()
                });
            }

            await connection.CloseAsync();

            return lista;
        }

        public async Task<VendaModel> ObterPorId(int id)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("SELECT * FROM venda WHERE id = @id;", connection);

            command.Parameters.AddWithValue("@id", id);

            using var reader = await command.ExecuteReaderAsync();

            VendaModel obj = new VendaModel();

            while (await reader.ReadAsync())
            {
                obj.Id = Convert.ToInt32(reader.GetValue(0));
                obj.NomeProduto = reader.GetValue(1).ToString();
                obj.TipoProduto = reader.GetValue(2).ToString();
                obj.SubTipoProduto = reader.GetValue(3).ToString();
                obj.FormaPagamento = reader.GetValue(4).ToString();
                obj.Quantidade = Convert.ToInt32(reader.GetValue(5));
                obj.ValorTotal = Convert.ToDouble(reader.GetValue(6));
                obj.DataVenda = Convert.ToDateTime(reader.GetValue(7)).ToString();
            }

            await connection.CloseAsync();

            return obj;
        }

        public async void Incluir(VendaModel model)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("INSERT INTO venda (nomeproduto, tipoproduto, subtipoproduto, formapagamento, quantidade, valortotal, datavenda) VALUES " +
                "                                                   (@nomeproduto, @tipoproduto, @subtipoproduto, @formapagamento, @quantidade, @valortotal, @datavenda);", connection);

            command.Parameters.AddWithValue("@nomeproduto", model.NomeProduto);
            command.Parameters.AddWithValue("@tipoproduto", model.TipoProduto);
            command.Parameters.AddWithValue("@subtipoproduto", model.SubTipoProduto);
            command.Parameters.AddWithValue("@formapagamento", model.FormaPagamento);
            command.Parameters.AddWithValue("@quantidade", model.Quantidade);
            command.Parameters.AddWithValue("@valortotal", Convert.ToDouble(model.ValorTotal));
            command.Parameters.AddWithValue("@datavenda", DateTime.Now);

            command.ExecuteNonQuery();

            await connection.CloseAsync();
        }

        public async void Alterar(VendaModel model)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("UPDATE venda set nomeproduto = @nomeproduto, " +
                "                                                   tipoproduto = @tipoproduto, " +
                "                                                   subtipoproduto = @subtipoproduto, " +
                "                                                   formapagamento = @formapagamento, " +
                "                                                   quantidade = @quantidade, " +
                "                                                   valortotal = @valortotal " +
                "                                                   WHERE id = @id;", connection);
            
            command.Parameters.AddWithValue("@id", model.Id);
            command.Parameters.AddWithValue("@nomeproduto", model.NomeProduto);
            command.Parameters.AddWithValue("@tipoproduto", model.TipoProduto);
            command.Parameters.AddWithValue("@subtipoproduto", model.SubTipoProduto);
            command.Parameters.AddWithValue("@formapagamento", model.FormaPagamento);
            command.Parameters.AddWithValue("@quantidade", model.Quantidade);
            command.Parameters.AddWithValue("@valortotal", Convert.ToDouble(model.ValorTotal));

            command.ExecuteNonQuery();

            await connection.CloseAsync();
        }

        public async void Excluir(int id)
        {
            using var connection = new MySqlConnection(Constantes.ConnetionString);

            await connection.OpenAsync();

            using var command = new MySqlCommand("DELETE FROM venda WHERE id = @id;", connection);
            
            command.Parameters.AddWithValue("@id", id);

            command.ExecuteNonQuery();

            await connection.CloseAsync();
        }
    }
}
