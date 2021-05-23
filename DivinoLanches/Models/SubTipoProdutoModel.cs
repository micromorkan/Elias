using System;

namespace DivinoLanches.Models
{
    public class SubTipoProdutoModel
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string TipoProduto { get; set; }
        public bool? Ativo { get; set; }
    }
}
