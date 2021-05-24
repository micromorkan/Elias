import { ProdutoComandaModel } from '../models/ProdutoComandaModel';

export class ComandaModel {

    id: Number
    nomeCliente: string
    produtos: ProdutoComandaModel[]
    valorTotal: string
    ativo: string
    formaPagamento: string

    constructor(obj: any) {
        this.id = obj.id
        this.nomeCliente = obj.nomeCliente
        this.produtos = obj.produtos
        this.valorTotal = obj.valorTotal
        this.ativo = obj.ativo
        this.formaPagamento = obj.formaPagamento
        return this
    }
}