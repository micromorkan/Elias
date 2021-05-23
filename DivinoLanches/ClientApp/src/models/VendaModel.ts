export class VendaModel {

    id: number
    nomeProduto: number
    tipoProduto: number
    subTipoProduto: number
    formaPagamento: string
    quantidade: number
    valorTotal: number
    dataVenda: string

    dataDe: string
    dataAte: string

    constructor(obj: any) {
        this.id = obj.id
        this.nomeProduto = obj.nomeProduto
        this.tipoProduto = obj.tipoProduto
        this.subTipoProduto = obj.subTipoProduto
        this.quantidade = obj.quantidade
        this.valorTotal = obj.valorTotal       
        this.formaPagamento = obj.formaPagamento       
        this.dataVenda = obj.dataVenda
        this.dataDe = obj.dataDe
        this.dataAte = obj.dataAte
        return this
    }
}