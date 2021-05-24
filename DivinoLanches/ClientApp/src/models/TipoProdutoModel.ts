export class TipoProdutoModel {

    id: number;   
    nome: string;    
    ativo: string;
    
    constructor(obj: any) {
        this.id = obj.id
        this.nome = obj.nome
        this.ativo = obj.ativo
        return this
    }
}