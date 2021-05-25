using DivinoLanches.Models;
using DivinoLanches.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DivinoLanches.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ComandaController : ControllerBase
    {
        private readonly ILogger<ComandaController> _logger;

        public ComandaController(ILogger<ComandaController> logger)
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
                    Data = new ComandaRepo().ObterTodos().Result,
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
        public RetornoModel ObterFiltrado([FromBody] ComandaModel model)
        {
            try
            {
                return new RetornoModel()
                {
                    Data = new ComandaRepo().ObterFiltrado(model).Result,
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
                ComandaRepo repo = new ComandaRepo();

                ComandaModel model = repo.ObterPorId(id).Result;

                model.ListaProdutos = repo.ObterProdutosComandaPorId(model.Id).Result;

                return new RetornoModel()
                {
                    Data = model,
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
        public RetornoModel Incluir([FromBody] ComandaModel model)
        {
            try
            {                

                model.Ativo = true;

                return new RetornoModel()
                {
                    Data = new ComandaRepo().Incluir(model).Result,
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

        [HttpPost("IncluirProdutoComanda")]
        public RetornoModel IncluirProdutoComanda([FromBody] ProdutoComandaModel model)
        {
            try
            {
                ComandaRepo repo = new ComandaRepo();
                List<ProdutoComandaModel> lista = repo.ObterFiltradoProdutoComanda(model).Result;

                if (lista.Count() > 0)
                {
                    ProdutoComandaModel obj = lista.First();
                    model.Id = obj.Id;
                    model.Quantidade = model.Quantidade + obj.Quantidade;

                    new ComandaRepo().AlterarProdutoComanda(model);
                }
                else
                {
                    new ComandaRepo().IncluirProdutoComanda(model);
                }

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
        public RetornoModel Alterar([FromBody] ComandaModel model)
        {
            try
            {
                new ComandaRepo().Alterar(model);

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

        [HttpPost("FinalizarComanda")]
        public RetornoModel FinalizarComanda([FromBody] ComandaModel model)
        {
            try
            {
                //TODO - DIEGO foreach para incluir todos os produtos da comanda na lista de vendas
                ComandaRepo repo = new ComandaRepo();

                List<ProdutoComandaModel> lista = repo.ObterProdutosComandaPorId(model.Id).Result;

                model.ValorTotal = lista.Sum(x => x.Valor * x.Quantidade).ToString();

                new ComandaRepo().FinalizarComanda(model);

                return new RetornoModel()
                {
                    Error = false,
                    Mensagem = "Finalizado com sucesso!"
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
                ComandaRepo repo = new ComandaRepo();
                List<ProdutoComandaModel> lista = repo.ObterProdutosComandaPorId(id).Result;

                if (lista.Count > 0)
                {
                    return new RetornoModel()
                    {
                        Error = true,
                        Mensagem = "Não é possível cancelar uma comanda com produtos!"
                    };
                }

                new ComandaRepo().Excluir(id);

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

        [HttpGet("ExcluirProdutoComanda")]
        public RetornoModel ExcluirProdutoComanda(int idProduto, int qtdAtual, int qtdRemover)
        {
            try
            {
                new ComandaRepo().ExcluirProdutoComanda(idProduto, qtdAtual, qtdRemover);

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
