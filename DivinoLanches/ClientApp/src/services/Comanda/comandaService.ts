import { RetornoModel } from '../../models/RetornoModel'
import { ComandaModel } from '../../models/ComandaModel'
import { ProdutoComandaModel } from '../../models/ProdutoComandaModel'

export const ComandaService = {
    obterTodos,
    obterFiltrado,
    obterPorId,
    incluir,
    incluirProdutoComanda,
    alterar,
    finalizarComanda,
    excluir,
    excluirProdutoComanda
};

async function obterTodos() {
    const response = await fetch('comanda/ObterTodos');
    if (response.status === 200) {
        const result = await response.json();
        return Promise.resolve(result);
    } else {
        return Promise.reject(new RetornoModel({ Error: true, Mensagem: 'Ocorreu uma falha na conexão. Tente novamente.' }));
    }
}

async function obterFiltrado(filtro: ComandaModel) {
    const response = await fetch('comanda/obterFiltrado', {
        method: 'POST',
        headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(filtro)
    });
    if (response.status === 200) {
        const result = await response.json();
        return Promise.resolve(result);
    } else {
        return Promise.reject(new RetornoModel({ Error: true, Mensagem: 'Ocorreu uma falha na conexão. Tente novamente.' }));
    }
}

async function obterPorId(id: number) {
    const response = await fetch('comanda/obterPorId/' + id);
    if (response.status === 200) {
        const result = await response.json();
        return Promise.resolve(result);
    } else {
        return Promise.reject(new RetornoModel({ Error: true, Mensagem: 'Ocorreu uma falha na conexão. Tente novamente.' }));
    }
}

async function incluir(obj: ComandaModel) {
    const response = await fetch('comanda/incluir', {
        method: 'POST',
        headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(obj)
    });
    console.log(response)
    if (response.status === 200) {
        const result = await response.json();
        return Promise.resolve(result);
    } else {
        return Promise.reject(new RetornoModel({ Error: true, Mensagem: 'Ocorreu uma falha na conexão. Tente novamente.' }));
    }
}

async function incluirProdutoComanda(obj: ProdutoComandaModel) {
    const response = await fetch('comanda/IncluirProdutoComanda', {
        method: 'POST',
        headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(obj)
    });
    console.log(response)
    if (response.status === 200) {
        const result = await response.json();
        return Promise.resolve(result);
    } else {
        return Promise.reject(new RetornoModel({ Error: true, Mensagem: 'Ocorreu uma falha na conexão. Tente novamente.' }));
    }
}

async function alterar(obj: ComandaModel) {
    const response = await fetch('comanda/alterar', {
        method: 'POST',
        headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(obj)
    });
    if (response.status === 200) {
        const result = await response.json();
        return Promise.resolve(result);
    } else {
        return Promise.reject(new RetornoModel({ Error: true, Mensagem: 'Ocorreu uma falha na conexão. Tente novamente.' }));
    }
}

async function finalizarComanda(obj: ComandaModel) {
    const response = await fetch('comanda/FinalizarComanda', {
        method: 'POST',
        headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(obj)
    });
    if (response.status === 200) {
        const result = await response.json();
        return Promise.resolve(result);
    } else {
        return Promise.reject(new RetornoModel({ Error: true, Mensagem: 'Ocorreu uma falha na conexão. Tente novamente.' }));
    }
}

async function excluir(id: number) {
    const response = await fetch('comanda/Excluir/' + id);
    if (response.status === 200) {
        const result = await response.json();
        return Promise.resolve(result);
    } else {
        return Promise.reject(new RetornoModel({ Error: true, Mensagem: 'Ocorreu uma falha na conexão. Tente novamente.' }));
    }
}

async function excluirProdutoComanda(idProduto: number, qtdAtual: number, qtdRemover: number) {
    const response = await fetch('comanda/ExcluirProdutoComanda?idProduto=' + idProduto + '&qtdAtual=' + qtdAtual + '&qtdRemover=' + qtdRemover);       
    if (response.status === 200) {
        const result = await response.json();
        return Promise.resolve(result);
    } else {
        return Promise.reject(new RetornoModel({ Error: true, Mensagem: 'Ocorreu uma falha na conexão. Tente novamente.' }));
    }
}