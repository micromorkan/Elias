using System;
using System.Collections.Generic;

namespace DivinoLanches.Models
{
    public class ProdutoComandaModel
    {
        public int Id { get; set; }
        public int IdComanda { get; set; }
        public int Quantidade { get; set; }
        public string NomeProduto { get; set; }
        public string TipoProduto { get; set; }
        public string SubTipoProduto { get; set; }
        public double Valor { get; set; }
    }
}
