using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DivinoLanches.Models
{
    public class RetornoModel
    {
        public bool Error { get; set; }
        public string Mensagem { get; set; }
        public object Data { get; set; }
    }
}
