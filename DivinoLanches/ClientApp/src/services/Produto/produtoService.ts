import { RetornoModel } from '../../models/RetornoModel'
import { ProdutoModel } from '../../models/ProdutoModel'

export const ProdutoService = {
    obterTodos,
    obterFiltrado,
    obterPorId,
    incluir,
    alterar,
    excluir
};

async function obterTodos() {
    const response = await fetch('produto/ObterTodos');
    if (response.status === 200) {
        const result = await response.json();
        return Promise.resolve(result);
    } else {
        return Promise.reject(new RetornoModel({ Error: true, Mensagem: 'Ocorreu uma falha na conexão. Tente novamente.' }));
    }
}

async function obterFiltrado(filtro: ProdutoModel) {
    const response = await fetch('produto/obterFiltrado', {
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
    const response = await fetch('produto/obterPorId/' + id);
    if (response.status === 200) {
        const result = await response.json();
        return Promise.resolve(result);
    } else {
        return Promise.reject(new RetornoModel({ Error: true, Mensagem: 'Ocorreu uma falha na conexão. Tente novamente.' }));
    }
}

async function incluir(obj: ProdutoModel) {
    const response = await fetch('produto/incluir', {
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

async function alterar(obj: ProdutoModel) {
    const response = await fetch('produto/alterar', {
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
    const response = await fetch('produto/excluir/' + id);
    if (response.status === 200) {
        const result = await response.json();
        return Promise.resolve(result);
    } else {
        return Promise.reject(new RetornoModel({ Error: true, Mensagem: 'Ocorreu uma falha na conexão. Tente novamente.' }));
    }
}