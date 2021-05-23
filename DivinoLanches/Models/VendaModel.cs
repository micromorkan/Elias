using System;

namespace DivinoLanches.Models
{
    public class VendaModel
    {
        public int Id { get; set; }
        public string NomeProduto { get; set; }
        public string TipoProduto { get; set; }
        public string SubTipoProduto { get; set; }
        public string FormaPagamento { get; set; }
        public int Quantidade { get; set; }
        public double ValorTotal { get; set; }
        public string DataVenda { get; set; }
        public string DataDe { get; set; }
        public string DataAte { get; set; }
    }
}
