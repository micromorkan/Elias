export class ProdutoComandaModel {

    id: number
    idComanda: number
    quantidade: number
    nomeProduto: string
    tipoProduto: string
    subTipoProduto: string
    valor: number

    constructor(obj: any) {
        this.id = obj.id
        this.idComanda = obj.idComanda
        this.quantidade = obj.quantidade
        this.nomeProduto = obj.nomeProduto
        this.tipoProduto = obj.tipoProduto
        this.subTipoProduto = obj.subTipoProduto
        this.valor = obj.valor
        return this
    }
}