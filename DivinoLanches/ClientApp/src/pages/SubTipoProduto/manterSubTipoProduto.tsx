import React, { Component } from 'react'
import { Box, Button, Grid, TextField } from '@material-ui/core';
import { SubTipoProdutoService } from '../../services/SubTipoProduto/subTipoProdutoService'
import { TipoProdutoService } from '../../services/TipoProduto/tipoProdutoService'
import { SubTipoProdutoModel } from '../../models/SubTipoProdutoModel'
import { TipoProdutoModel } from '../../models/TipoProdutoModel'
import { RetornoModel } from '../../models/RetornoModel'

export interface PropsSubTipoProduto {
    children: React.ReactNode;
    history?: any;
    location?: any;
    match?: any;
}
export interface StateSubTipoProduto {
    id: number;
    nome: string;
    tipo: string;
    ativo: boolean;

    listaTipoProduto: any[];
}

class SubTipoProduto extends Component<PropsSubTipoProduto, StateSubTipoProduto> {
    constructor(props: PropsSubTipoProduto) {    
        super(props);    
        this.state = {
            id: 0,
            nome: '',
            tipo: '',
            ativo: true,
            listaTipoProduto: []
        }
    }

    componentDidMount() {        
        if (!!this.props.match.params.id) {
            SubTipoProdutoService.obterPorId(this.props.match.params.id).then((result: RetornoModel) => {
                this.setState({
                    id: result.data.id,
                    nome: result.data.nome,
                    tipo: result.data.tipoProduto,
                    ativo: result.data.ativo
                });
            });
        }

        TipoProdutoService.obterFiltrado(new TipoProdutoModel({ ativo: true })).then((result) => {
            this.setState({
                listaTipoProduto: result.data
            });
        });
    }

    limparCampos = () => {
        this.setState({
            id: 0,
            nome: '',
            tipo: '',
            ativo: true
        });
    }

    handleSubmit = () => {
        if (this.state.nome.trim() === '') {
            alert('Informe o Nome do Sub Tipo Produto');
        } else if (this.state.tipo.trim() === '') {
            alert('Informe o Tipo do Produto')        
        } else {

            let object = {
                id: this.state.id,
                nome: this.state.nome,
                tipoProduto: this.state.tipo,
                ativo: this.state.ativo
            }

            let model = new SubTipoProdutoModel(object);

            if (!!this.props.match.params.id) {
                SubTipoProdutoService.alterar(model).then((result: RetornoModel) => {
                    alert(result.mensagem)
                }).catch((result: RetornoModel) => {
                    alert(result.mensagem)
                });
            } else {
                SubTipoProdutoService.incluir(model).then((result: RetornoModel) => {
                    if (!result.error) {
                        this.limparCampos();
                    }
                    alert(result.mensagem)
                }).catch((result: RetornoModel) => {
                    alert(result.mensagem)
                });
            }
        }
    }

    handleAtivo = (ativo: any) => {
        this.setState({
            ativo: ativo
        });
    }

    handleTipoProduto = (tipoProduto: any) => {
        this.setState({
            tipo: tipoProduto
        });
    }

    handleChange = (name: keyof StateSubTipoProduto, value: any) => {
        let newState: any;
        newState = { [name]: value } as Pick<StateSubTipoProduto, keyof StateSubTipoProduto>;
        this.setState(newState);    
    };

    render() {
        const { history } = this.props;
        return (
            <div>
                <Box textAlign='center'>
                    <h1 style={{fontSize: '50px'}}>Sub Tipo Produto</h1>
                    <Button onClick={history.goBack} style={{marginTop: '10px'}} variant="outlined" color='default'>Voltar</Button>
                    <br />
                    <br />
                    <span style={{fontSize: '20px'}}>Informe os itens abaixo</span>
                </Box>
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <Grid container spacing={3} style={{marginTop: '20px'}}>
                        <Grid item xs={12} spacing={1} style={{textAlign: 'center'}}>                    
                            <TextField required id="nome" style={{width: '80%'}} value={this.state.nome} onChange={e => {this.handleChange("nome", e.target.value); }} label="Nome Sub Tipo Produto" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} spacing={1} style={{textAlign: 'center'}}>
                            <TextField required select style={{width: '80%'}} id="ativo" value={this.state.tipo} onChange={e => this.handleTipoProduto(e.target.value)} label="Tipo" variant="outlined">
                            {this.state.listaTipoProduto.map(option => (
                                <option key={option.id.toString()} value={option.nome}>{option.nome}</option>
                            ))}
                            </TextField>
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

export default SubTipoProduto;