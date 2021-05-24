export class ProdutoModel {

    id: Number
    nome: string
    tipo: string
    subTipo: string
    valor: string
    ativo: string

    constructor(obj: any) {
        this.id = obj.id
        this.nome = obj.nome
        this.tipo = obj.tipo
        this.subTipo = obj.subTipo
        this.valor = obj.valor       
        this.ativo = obj.ativo       
        return this
    }
}