import React, { Component } from 'react'
import { Box, Button, Grid, TextField } from '@material-ui/core';
import { TipoProdutoService } from '../../services/TipoProduto/tipoProdutoService'
import { TipoProdutoModel } from '../../models/TipoProdutoModel'
import { RetornoModel } from '../../models/RetornoModel'

export interface PropsTipoProduto {
    children: React.ReactNode;
    history?: any;
    location?: any;
    match?: any;
}
export interface StateTipoProduto {
    id: number;
    nome: string;
    ativo: boolean;
    habilitarIncluir: boolean;
}

class TipoProduto extends Component<PropsTipoProduto, StateTipoProduto> {
    constructor(props: PropsTipoProduto) {    
        super(props);    
        this.state = {
            id: 0,
            nome: '',
            ativo: true,
            habilitarIncluir: true,
        }
    }

    componentDidMount() {            
        if (!!this.props.match.params.id) {
            TipoProdutoService.obterPorId(this.props.match.params.id).then((result: RetornoModel) => {                
                this.setState({
                    id: result.data.id,
                    nome: result.data.nome,
                    ativo: result.data.ativo
                });
            });
        }
    }

    limparCampos = () => {
        this.setState({
            id: 0,
            nome: '',
            ativo: true
        });
    }

    handleSubmit = () => {
        if (this.state.nome.trim() === '') {
            alert('Informe o Nome do Tipo do Produto');
        } else {

            let object = {
                id: this.state.id,
                nome: this.state.nome,
                ativo: this.state.ativo
            }

            let model = new TipoProdutoModel(object);

            this.setState({ habilitarIncluir: false }, () => {
                if (!!this.props.match.params.id) {
                    TipoProdutoService.alterar(model).then((result: RetornoModel) => {
                        this.setState({ habilitarIncluir: true });
                        alert(result.mensagem);
                    }).catch((result: RetornoModel) => {
                        this.setState({ habilitarIncluir: true });
                        alert(result.mensagem);
                    });
                } else {
                    TipoProdutoService.incluir(model).then((result: RetornoModel) => {
                        if (!result.error) {
                            this.limparCampos();
                        }
                        this.setState({ habilitarIncluir: true });
                        alert(result.mensagem);
                    }).catch((result: RetornoModel) => {
                        this.setState({ habilitarIncluir: true });
                        alert(result.mensagem);
                    });
                }
            });
        }
    }

    handleAtivo = (ativo: any) => {
        this.setState({
            ativo: ativo === 'true'
        });
    }

    handleChange = (name: keyof StateTipoProduto, value: any) => {
        let newState: any;
        newState = { [name]: value } as Pick<StateTipoProduto, keyof StateTipoProduto>;
        this.setState(newState);    
    };

    render() {
        const { history } = this.props;
        return (
            <div>
                <Box textAlign='center'>
                    <h1 style={{fontSize: '30px'}}>Tipo Produto</h1>
                    <Button onClick={() => history.push('/Configuracoes/GerenciarTipoProduto')} style={{marginTop: '10px'}} variant="outlined" color='default'>Voltar</Button>
                    <br />
                    <br />
                    <span style={{fontSize: '20px'}}>Informe os itens abaixo</span>
                </Box>
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <Grid container spacing={3} style={{marginTop: '20px'}}>
                        <Grid item xs={12} spacing={1} style={{textAlign: 'center'}}>                    
                            <TextField required id="nome" style={{width: '80%'}} value={this.state.nome} onChange={e => {this.handleChange("nome", e.target.value); }} label="Nome Tipo Produto" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} spacing={1} style={{textAlign: 'center'}}>
                            <TextField required select style={{width: '80%'}} id="ativo" value={this.state.ativo} onChange={e => this.handleAtivo(e.target.value)} label="Ativo" variant="outlined">
                                <option key={1} value={'true'}>Sim</option>
                                <option key={2} value={'false'}>N??o</option>
                            </TextField>
                        </Grid>
                    </Grid>
                </form>
                <Box textAlign='center'>
                    <Button disabled={!this.state.habilitarIncluir} onClick={() => this.handleSubmit()} style={{marginTop: '20px'}} variant="contained" color='primary'>Salvar</Button>
                </Box>
            </div>
        );
    }
}

export default TipoProduto;