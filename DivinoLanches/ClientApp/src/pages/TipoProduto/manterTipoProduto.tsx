import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Box, Button, createStyles, Grid, TableCell, TableRow, TextField, Theme } from '@material-ui/core';
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
}

class TipoProduto extends Component<PropsTipoProduto, StateTipoProduto> {
    constructor(props: PropsTipoProduto) {    
        super(props);    
        this.state = {
            id: 0,
            nome: '',
            ativo: true
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
        let object = {
            id: this.state.id,
            nome: this.state.nome,
            ativo: this.state.ativo
        }

        let model = new TipoProdutoModel(object);
        
        if (!!this.props.match.params.id) {
            TipoProdutoService.alterar(model).then((result: RetornoModel) => {
                alert(result.mensagem)
                
            }).catch((result: RetornoModel) => {
                alert(result.mensagem)
            });
        } else {        
            TipoProdutoService.incluir(model).then((result: RetornoModel) => {
                if (!result.error) {
                    this.limparCampos();
                }
                alert(result.mensagem)
            }).catch((result: RetornoModel) => {
                alert(result.mensagem)
            });
        }
    }

    handleAtivo = (ativo: any) => {
        this.setState({
            ativo: ativo
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
                    <h1 style={{fontSize: '50px'}}>Tipo Produto</h1>
                    <Button onClick={history.goBack} style={{marginTop: '10px'}} variant="outlined" color='default'>Voltar</Button>
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
                                <option key={2} value={'false'}>Não</option>
                            </TextField>
                        </Grid>
                    </Grid>
                </form>
                <Box textAlign='center'>
                    <Button onClick={() => this.handleSubmit()} style={{marginTop: '20px'}} variant="contained" color='primary'>Salvar</Button>
                </Box>
            </div>
        );
    }
}

export default TipoProduto;