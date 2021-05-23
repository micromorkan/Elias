export class SubTipoProdutoModel {

    id: number
    tipoProduto: string
    nome: string
    ativo: boolean

    constructor(obj: any) {
        this.id = obj.id
        this.tipoProduto = obj.tipoProduto
        this.nome = obj.nome
        this.ativo = obj.ativo
        return this
    }
}