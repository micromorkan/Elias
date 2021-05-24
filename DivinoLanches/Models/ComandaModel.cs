using System;
using System.Collections.Generic;

namespace DivinoLanches.Models
{
    public class ComandaModel
    {
        public int Id { get; set; }
        public string NomeCliente { get; set; }
        public List<ProdutoComandaModel> ListaProdutos { get; set; }
        public string ValorTotal { get; set; }
        public bool? Ativo { get; set; }
        public string FormaPagamento { get; set; }
    }
}
