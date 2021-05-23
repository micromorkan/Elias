import React, { Component } from 'react'
import { Box, Button, Grid, TextField } from '@material-ui/core';
import { SubTipoProdutoService } from '../../services/SubTipoProduto/subTipoProdutoService'
import { TipoProdutoService } from '../../services/TipoProduto/tipoProdutoService'
import { ProdutoService } from '../../services/Produto/produtoService'
import { SubTipoProdutoModel } from '../../models/SubTipoProdutoModel';
import { TipoProdutoModel } from '../../models/TipoProdutoModel';
import { ProdutoModel } from '../../models/ProdutoModel';
import { RetornoModel } from '../../models/RetornoModel'

export interface PropsProduto {
    children: React.ReactNode;
    history?: any;
    location?: any;
    match?: any;
}
export interface StateProduto {
    id: number;
    nome: string;
    tipo: string;
    subtipo: string;
    valor: string;
    ativo: boolean;

    listaTipoProduto: TipoProdutoModel[];
    listaSubTipoProduto: SubTipoProdutoModel[];

    habilitarCombo: boolean;
}

class Produto extends Component<PropsProduto, StateProduto> {
    constructor(props: PropsProduto) {    
        super(props);    
        this.state = {
            id: 0,
            nome: '',
            tipo: '',
            subtipo: '',
            valor: '',
            ativo: true,
            listaTipoProduto: [],
            listaSubTipoProduto: [],
            habilitarCombo: false
        }
    }

    componentDidMount() {        
        if (!!this.props.match.params.id) {
            ProdutoService.obterPorId(this.props.match.params.id).then((result: RetornoModel) => {
                this.setState({
                    id: result.data.id,
                    nome: result.data.nome,
                    tipo: result.data.tipo,
                    subtipo: result.data.subtipo,
                    valor: result.data.valor,
                    ativo: result.data.ativo,
                    habilitarCombo: true
                });
            });
        }

        TipoProdutoService.obterFiltrado(new TipoProdutoModel({ ativo: true })).then((result) => {
            this.setState({
                listaTipoProduto: result.data
            });
        });

        SubTipoProdutoService.obterFiltrado(new SubTipoProdutoModel({ ativo: true })).then((result) => {
            this.setState({
                listaSubTipoProduto: result.data
            });
        });
    }

    limparCampos = () => {
        this.setState({
            id: 0,
            nome: '',
            tipo: '',
            subtipo: '',
            valor: '',
            ativo: true,
            habilitarCombo: false
        });
    }

    handleSubmit = () => {
        if (this.state.nome.trim() === '') {
            alert('Informe o Nome do Produto');
        } else if (this.state.tipo.trim() === '') {
            alert('Informe o Tipo do Produto')
        } else if (this.state.subtipo.trim() === '') {
            alert('Informe o SubTipo do Produto')
        } else if (this.state.valor.trim() === '' || parseFloat(this.state.valor) === 0) {
            alert('Informe o Valor do Produto')
        } else {

        let object = {
            id: this.state.id,
            nome: this.state.nome,
            tipo: this.state.tipo,
            subTipo: this.state.subtipo,
            valor: this.state.valor,
            ativo: this.state.ativo
        }

        let model = new ProdutoModel(object);
        
        if (!!this.props.match.params.id) {
            ProdutoService.alterar(model).then((result: any) => {
                alert(result.mensagem)
            }).catch((result: RetornoModel) => {
                alert(result.mensagem)
            });
        } else {        
            ProdutoService.incluir(model).then((result: any) => {
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
            tipo: tipoProduto,
            habilitarCombo: true
        });
    }

    handleSubTipoProduto = (subTipoProduto: any) => {
        this.setState({
            subtipo: subTipoProduto
        });
    }

    handleChange = (name: keyof StateProduto, value: any) => {
        let newState: any;
        newState = { [name]: value } as Pick<StateProduto, keyof StateProduto>;
        this.setState(newState);    
    };

    render() {
        const { history } = this.props;
        return (
            <div>
                <Box textAlign='center'>
                    <h1 style={{fontSize: '50px'}}>Produto</h1>
                    <Button onClick={history.goBack} style={{marginTop: '10px'}} variant="outlined" color='default'>Voltar</Button>
                    <br />
                    <br />
                    <span style={{fontSize: '20px'}}>Informe os itens abaixo</span>
                </Box>
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <Grid container spacing={3} style={{marginTop: '20px'}}>
                        <Grid item xs={12} spacing={1} style={{textAlign: 'center'}}>                    
                            <TextField required id="nome" style={{width: '80%'}} value={this.state.nome} onChange={e => {this.handleChange("nome", e.target.value); }} label="Nome Produto" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} spacing={1} style={{textAlign: 'center'}}>
                            <TextField required select style={{width: '80%'}} id="ativo" value={this.state.tipo} onChange={e => this.handleTipoProduto(e.target.value)} label="Tipo" variant="outlined">
                            {this.state.listaTipoProduto.map(option => (
                                <option key={option.id.toString()} value={option.nome}>{option.nome}</option>
                            ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} spacing={1} style={{textAlign: 'center'}}>
                            <TextField disabled={!this.state.habilitarCombo} required select style={{width: '80%'}} id="ativo" value={this.state.subtipo} onChange={e => this.handleSubTipoProduto(e.target.value)} label="Sub Tipo" variant="outlined">
                            {this.state.listaSubTipoProduto.filter(i => i.tipoProduto === this.state.tipo).map(option => (
                                <option key={option.id.toString()} value={option.nome}>{option.nome}</option>
                            ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} spacing={1} style={{textAlign: 'center'}}>                    
                            <TextField required id="valor" style={{width: '80%'}} value={this.state.valor} onChange={e => {this.handleChange("valor", e.target.value); }} label="Valor" variant="outlined" />
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

export default Produto;