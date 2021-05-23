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
    public class SubTipoProdutoController : ControllerBase
    {
        private readonly ILogger<SubTipoProdutoController> _logger;

        public SubTipoProdutoController(ILogger<SubTipoProdutoController> logger)
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
                    Data = new SubTipoProdutoRepo().ObterTodos().Result,
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
        public RetornoModel ObterFiltrado([FromBody] SubTipoProdutoModel model)
        {
            try
            {
                return new RetornoModel()
                {
                    Data = new SubTipoProdutoRepo().ObterFiltrado(model).Result,
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
                    Data = new SubTipoProdutoRepo().ObterPorId(id).Result,
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
        public RetornoModel Incluir([FromBody] SubTipoProdutoModel model)
        {
            try
            {
                if (((List<SubTipoProdutoModel>)ObterFiltrado(new SubTipoProdutoModel() { Nome = model.Nome }).Data).Count > 0)
                {
                    return new RetornoModel()
                    {
                        Error = true,
                        Mensagem = "Nome do Sub Tipo Produto informado já existe!"
                    };
                }

                new SubTipoProdutoRepo().Incluir(model);

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
        public RetornoModel Alterar([FromBody] SubTipoProdutoModel model)
        {
            try
            {
                if (((List<SubTipoProdutoModel>)ObterTodos().Data).Where(x => x.Nome == model.Nome && x.Id != model.Id).ToList().Count > 0)
                {
                    return new RetornoModel()
                    {
                        Error = true,
                        Mensagem = "Nome do Sub Tipo Produto informado já existe!"
                    };
                }

                new SubTipoProdutoRepo().Alterar(model);

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
                SubTipoProdutoRepo repo = new SubTipoProdutoRepo();

                SubTipoProdutoModel model = repo.ObterPorId(id).Result;

                if (new ProdutoRepo().ObterFiltrado(new ProdutoModel { SubTipo = model.Nome }).Result.Count() > 0)
                {
                    model.Ativo = false;

                    repo.Alterar(model);

                    return new RetornoModel()
                    {
                        Error = false,
                        Mensagem = "O Sub Tipo Produto se encontra em uso. Ao invés de excluir ele foi alterado para o status Inativo!"
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
