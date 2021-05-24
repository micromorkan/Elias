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
    public class ProdutoController : ControllerBase
    {
        private readonly ILogger<ProdutoController> _logger;

        public ProdutoController(ILogger<ProdutoController> logger)
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
                    Data = new ProdutoRepo().ObterTodos().Result.OrderBy(x => x.Tipo).ThenBy(x => x.SubTipo).ToList(),
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
        public RetornoModel ObterFiltrado([FromBody] ProdutoModel model)
        {
            try
            {
                return new RetornoModel()
                {
                    Data = new ProdutoRepo().ObterFiltrado(model).Result.OrderBy(x => x.Tipo).ThenBy(x => x.SubTipo).ToList(),
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
                    Data = new ProdutoRepo().ObterPorId(id).Result,
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
        public RetornoModel Incluir([FromBody] ProdutoModel model)
        {
            try
            {
                if (!Double.TryParse(model.Valor.Trim(), out double value))
                {
                    return new RetornoModel()
                    {
                        Error = true,
                        Mensagem = "Valor do Produto informado é inválido!"
                    };
                } 
                else if (((List<ProdutoModel>)ObterFiltrado(new ProdutoModel() { Nome = model.Nome }).Data).Count > 0)
                {
                    return new RetornoModel()
                    {
                        Error = true,
                        Mensagem = "Nome do Produto informado já existe!"
                    };
                }

                new ProdutoRepo().Incluir(model);

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
        public RetornoModel Alterar([FromBody] ProdutoModel model)
        {
            try
            {
                if (!Double.TryParse(model.Valor.Trim(), out double value))
                {
                    return new RetornoModel()
                    {
                        Error = true,
                        Mensagem = "Valor do Produto informado é inválido!"
                    };
                }
                else if (((List<ProdutoModel>)ObterTodos().Data).Where(x => x.Nome == model.Nome && x.Id != model.Id).ToList().Count > 0)
                {
                    return new RetornoModel()
                    {
                        Error = true,
                        Mensagem = "Nome do Produto informado já existe!"
                    };
                }

                new ProdutoRepo().Alterar(model);

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
                ProdutoRepo repo = new ProdutoRepo();

                ProdutoModel model = repo.ObterPorId(id).Result;

                if (new VendaRepo().ObterFiltrado(new VendaModel { NomeProduto = model.Nome }).Result.Count() > 0)
                {
                    model.Ativo = false;

                    repo.Alterar(model);

                    return new RetornoModel()
                    {
                        Error = false,
                        Mensagem = "Já existe registros de Venda desse Produto. Ao invés de excluir ele foi alterado para o status Inativo!"
                    };
                }

                repo.Excluir(id);

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
