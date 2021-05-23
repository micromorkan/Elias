export class RetornoModel {

    error: number;
    mensagem: string;
    data: any;

    constructor(obj: any) {
        this.error = obj.Error
        this.mensagem = obj.Mensagem
        this.data = obj.Data
        return this
    }
}