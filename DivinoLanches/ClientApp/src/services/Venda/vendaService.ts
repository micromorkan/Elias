import { VendaModel } from '../../models/VendaModel';
import { RetornoModel } from '../../models/RetornoModel'

export const VendaService = {
    obterTodos,
    obterFiltrado,
    obterPorId,
    incluir,
    alterar,
    excluir
};

async function obterTodos() {
    const response = await fetch('venda/ObterTodos');
    if (response.status === 200) {
        const result = await response.json();
        return Promise.resolve(result);
    } else {
        return Promise.reject(new RetornoModel({ Error: true, Mensagem: 'Ocorreu uma falha na conexão. Tente novamente.' }));
    }
}

async function obterFiltrado(filtro: VendaModel) {
    const response = await fetch('venda/obterFiltrado', {
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
    const response = await fetch('venda/obterPorId/' + id);
    if (response.status === 200) {
        const result = await response.json();
        return Promise.resolve(result);
    } else {
        return Promise.reject(new RetornoModel({ Error: true, Mensagem: 'Ocorreu uma falha na conexão. Tente novamente.' }));
    }
}

async function incluir(obj: VendaModel) {
    const response = await fetch('venda/incluir', {
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

async function alterar(obj: VendaModel) {
    const response = await fetch('venda/alterar', {
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
    const response = await fetch('venda/excluir/' + id);
    if (response.status === 200) {
        const result = await response.json();
        return Promise.resolve(result);
    } else {
        return Promise.reject(new RetornoModel({ Error: true, Mensagem: 'Ocorreu uma falha na conexão. Tente novamente.' }));
    }
}