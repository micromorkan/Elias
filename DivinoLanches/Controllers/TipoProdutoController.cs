using DivinoLanches.Models;
using DivinoLanches.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DivinoLanches.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TipoProdutoController : ControllerBase
    {
        private readonly ILogger<TipoProdutoController> _logger;

        public TipoProdutoController(ILogger<TipoProdutoController> logger)
        {
            _logger = logger;
        }

        [HttpGet("ObterTodos")]
        public RetornoModel ObterTodos()
        {
            try
            {
                return new RetornoModel()
                {
                    Data = new TipoProdutoRepo().ObterTodos().Result,
                    Error = false
                };
            }
            catch (Exception ex)
            {
                return new RetornoModel()
                {
                    Error = true,
                    Mensagem = ex.Message
                };
            }
        }

        [HttpPost("ObterFiltrado")]
        public RetornoModel ObterFiltrado([FromBody] TipoProdutoModel model)
        {
            try
            {
                return new RetornoModel()
                {
                    Data = new TipoProdutoRepo().ObterFiltrado(model).Result,
                    Error = false
                };
            }
            catch (Exception ex)
            {
                return new RetornoModel()
                {
                    Error = true,
                    Mensagem = ex.Message
                };
            }
        }

        [HttpGet("ObterPorId/{id}")]
        public RetornoModel ObterPorId([FromRoute] int id)
        {
            try
            {
                return new RetornoModel()
                {
                    Data = new TipoProdutoRepo().ObterPorId(id).Result,
                    Error = false
                };
            }
            catch (Exception ex)
            {
                return new RetornoModel()
                {
                    Error = true,
                    Mensagem = ex.Message
                };
            }
        }

        [HttpPost("Incluir")]
        public RetornoModel Incluir([FromBody] TipoProdutoModel model)
        {
            try
            {
                if (((List< TipoProdutoModel>)ObterFiltrado(new TipoProdutoModel() { Nome = model.Nome }).Data).Count > 0)
                {
                    return new RetornoModel()
                    {
                        Error = true,
                        Mensagem = "Nome do Tipo Produto informado já existe!"
                    };
                }

                new TipoProdutoRepo().Incluir(model);

                return new RetornoModel()
                {
                    Error = false,
                    Mensagem = "Incluído com sucesso!"
                };
            }
            catch (Exception ex)
            {
                return new RetornoModel()
                {
                    Error = true,
                    Mensagem = ex.Message
                };
            }
        }

        [HttpPost("Alterar")]
        public RetornoModel Alterar([FromBody] TipoProdutoModel model)
        {
            try
            {
                if (((List<TipoProdutoModel>)ObterTodos().Data).Where(x => x.Nome == model.Nome && x.Id != model.Id).ToList().Count > 0)
                {
                    return new RetornoModel()
                    {
                        Error = true,
                        Mensagem = "Nome do Tipo Produto informado já existe!"
                    };
                }

                new TipoProdutoRepo().Alterar(model);

                return new RetornoModel()
                {
                    Error = false,
                    Mensagem = "Alterado com sucesso!"
                };
            }
            catch (Exception ex)
            {
                return new RetornoModel()
                {
                    Error = true,
                    Mensagem = ex.Message
                };
            }
        }

        [HttpGet("Excluir/{id}")]
        public RetornoModel Excluir([FromRoute] int id)
        {
            try
            {
                //TipoProdutoRepo repo = new TipoProdutoRepo();

                //TipoProdutoModel model = repo.ObterPorId(id).Result;

                //VERIFICAR SE EXISTE SUBPRODUTO/PRODUTO SENDO UTILIZADO. CASO SIM, REALIZAR UPDATE NO STATUS

                new TipoProdutoRepo().Excluir(id);

                return new RetornoModel()
                {
                    Error = false,
                    Mensagem = "Excluído com sucesso!"
                };
            }
            catch (Exception ex)
            {
                return new RetornoModel()
                {
                    Error = true,
                    Mensagem = ex.Message
                };
            }
        }
    }
}
