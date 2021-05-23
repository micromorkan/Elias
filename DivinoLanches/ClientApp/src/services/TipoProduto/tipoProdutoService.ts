import { TipoProdutoModel } from '../../models/TipoProdutoModel'
import { RetornoModel } from '../../models/RetornoModel'

export const TipoProdutoService = {
    obterTodos,
    obterFiltrado,
    obterPorId,
    incluir,
    alterar,
    excluir
};

async function obterTodos() {
    const response = await fetch('tipoproduto/ObterTodos');
    if (response.status === 200) {
        const result = await response.json();
        return Promise.resolve(result);
    } else {
        return Promise.reject(new RetornoModel({Error: true, Mensagem: 'Ocorreu uma falha na conexão. Tente novamente.'}));
    }
}

async function obterFiltrado(filtro: TipoProdutoModel) {
    const response = await fetch('tipoproduto/obterFiltrado', {
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
    const response = await fetch('tipoproduto/obterPorId/' + id);
    if (response.status === 200) {
        const result = await response.json();
        return Promise.resolve(result);
    } else {
        return Promise.reject(new RetornoModel({ Error: true, Mensagem: 'Ocorreu uma falha na conexão. Tente novamente.' }));
    }
}

async function incluir(obj: TipoProdutoModel) {    
    const response = await fetch('tipoproduto/incluir', {
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

async function alterar(obj: TipoProdutoModel) {
    const response = await fetch('tipoproduto/alterar', {
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
    const response = await fetch('tipoproduto/excluir/' + id);
    if (response.status === 200) {
        const result = await response.json();
        return Promise.resolve(result);
    } else {
        return Promise.reject(new RetornoModel({ Error: true, Mensagem: 'Ocorreu uma falha na conexão. Tente novamente.' }));
    }
}