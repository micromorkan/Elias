using System;

namespace DivinoLanches.Models
{
    public class ProdutoModel
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Tipo { get; set; }
        public string SubTipo { get; set; }
        public string Valor { get; set; }
        public bool? Ativo { get; set; }
    }
}
