import { SubTipoProdutoModel } from '../../models/SubTipoProdutoModel'
import { RetornoModel } from '../../models/RetornoModel'

export const SubTipoProdutoService = {
    obterTodos,
    obterFiltrado,
    obterPorId,
    incluir,
    alterar,
    excluir
};

async function obterTodos() {
    const response = await fetch('subtipoproduto/ObterTodos');
    if (response.status === 200) {
        const result = await response.json();
        return Promise.resolve(result);
    } else {
        return Promise.reject(new RetornoModel({ Error: true, Mensagem: 'Ocorreu uma falha na conexão. Tente novamente.' }));
    }
}

async function obterFiltrado(filtro: SubTipoProdutoModel) {
    const response = await fetch('subtipoproduto/obterFiltrado', {
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
    const response = await fetch('subtipoproduto/obterPorId/' + id);
    if (response.status === 200) {
        const result = await response.json();
        return Promise.resolve(result);
    } else {
        return Promise.reject(new RetornoModel({ Error: true, Mensagem: 'Ocorreu uma falha na conexão. Tente novamente.' }));
    }
}

async function incluir(obj: SubTipoProdutoModel) {
    const response = await fetch('subtipoproduto/incluir', {
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

async function alterar(obj: SubTipoProdutoModel) {    
    const response = await fetch('subtipoproduto/alterar', {
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
    const response = await fetch('subtipoproduto/excluir/' + id);
    if (response.status === 200) {
        const result = await response.json();
        return Promise.resolve(result);
    } else {
        return Promise.reject(new RetornoModel({ Error: true, Mensagem: 'Ocorreu uma falha na conexão. Tente novamente.' }));
    }
}