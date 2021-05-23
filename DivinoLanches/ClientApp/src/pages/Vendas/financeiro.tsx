import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Box, Button, TextField, createStyles, Paper, Table, Grid, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { SubTipoProdutoService } from '../../services/SubTipoProduto/subTipoProdutoService';
import { TipoProdutoService } from '../../services/TipoProduto/tipoProdutoService';
import { ProdutoService } from '../../services/Produto/produtoService';
import { VendaService } from '../../services/Venda/vendaService';
import { SubTipoProdutoModel } from '../../models/SubTipoProdutoModel';
import { TipoProdutoModel } from '../../models/TipoProdutoModel';
import { ProdutoModel } from '../../models/ProdutoModel';
import { VendaModel } from '../../models/VendaModel';
import { RetornoModel } from '../../models/RetornoModel';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import TransformIcon from '@material-ui/icons/Transform';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';

export interface PropsFinanceiro {
    children: React.ReactNode;
    history?: any;
}
export interface StateFinanceiro {
    listaVenda: VendaModel[];
    listaTodosProduto: ProdutoModel[];
    listaTodosTipoProduto: TipoProdutoModel[];
    listaTodosSubTipoProduto: SubTipoProdutoModel[];

    nomeProduto: string;
    tipoProduto: string;
    subTipoProduto: string;
    dataDe: string;
    dataAte: string;

    formaPagamento: string;
    selecaoData: string;
}

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const StyledToggleButton = withStyles({
    root: {
        fontFamily: 'Arial',
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0.25px',
        color: 'rgba(0, 0, 0, 0.87)',
        padding: '15px 20px',
        textTransform: 'none',
        width: '100%',
        '&$selected': {
            backgroundColor: 'rgba(33, 137, 214, 0.20)',
            color: 'rgb(26, 88, 159)',
            '&:hover': {
                backgroundColor: 'rgba(33, 137, 214, 0.20)',
                color: 'rgb(26, 88, 159)',
            },
        },
    },
    selected: {},
})(ToggleButton);

class Financeiro extends Component<PropsFinanceiro, StateFinanceiro> {
    constructor(props: PropsFinanceiro) {    
        super(props);    
        this.state = {
            listaVenda: [],
            listaTodosProduto: [],
            listaTodosTipoProduto: [],
            listaTodosSubTipoProduto: [],

            nomeProduto: '',
            tipoProduto: '',
            subTipoProduto: '',
            dataDe: new Date().toLocaleDateString(),
            dataAte: new Date().toLocaleDateString(),

            formaPagamento: '',
            selecaoData: 'HOJE'
        }
    }

    componentDidMount() {
        this.carregarDados();

        ProdutoService.obterFiltrado(new ProdutoModel({ ativo: true })).then((result: RetornoModel) => {
            this.setState({
                listaTodosProduto: result.data
            });
        });

        TipoProdutoService.obterFiltrado(new TipoProdutoModel({ ativo: true })).then((result: RetornoModel) => {
            this.setState({
                listaTodosTipoProduto: result.data
            });
        });

        SubTipoProdutoService.obterFiltrado(new SubTipoProdutoModel({ ativo: true })).then((result: RetornoModel) => {
            this.setState({
                listaTodosSubTipoProduto: result.data
            });
        });
    }

    carregarDados = () => {
        VendaService.obterFiltrado(this.obterFiltro()).then((result: RetornoModel) => {
            this.setState({ listaVenda: result.data });
        });
    }

    obterFiltro = () => {

        let dataDe: string = '';
        let dataAte: string = '';
        
        if (this.state.selecaoData === 'HOJE') {
            dataDe = new Date().toLocaleDateString();
            dataAte = this.state.dataAte;
        } else if (this.state.selecaoData === 'SEMANA') {            
            dataDe = new Date(new Date().getTime() - (60 * 60 * 24 * 7 * 1000)).toLocaleDateString();
            dataAte = this.state.dataAte;
        } else if (this.state.selecaoData === 'MES') {
            dataDe = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toLocaleDateString();
            dataAte = this.state.dataAte;
        } else if (this.state.selecaoData === null) {
            dataDe = '';
            dataAte = '';
        } else {
            dataDe = this.state.dataDe;
            dataAte = this.state.dataAte;
        }        

        let filtro = {
            dataDe: dataDe,
            dataAte: dataAte,
            nomeProduto: this.state.nomeProduto,
            tipoProduto: this.state.tipoProduto,
            subTipoProduto: this.state.subTipoProduto,
            formaPagamento: this.state.formaPagamento,
        }

        return new VendaModel(filtro);
    }

    handleSelecaoData = (event: React.MouseEvent<HTMLElement>, value: any) => {        
        const carregarDados = this.carregarDados;
        this.setState({ selecaoData: value }, function () {
            if (value === 'HOJE' || value === 'SEMANA' || value === 'MES' || value === null) {
                carregarDados();
            }
        });
    };

    handleFormaPgto = (event: React.MouseEvent<HTMLElement>, value: any) => {
        const carregarDados = this.carregarDados;
        this.setState({ formaPagamento: value }, function () {
             carregarDados();
        });
    };

    handleProduto = (nomeProduto: any) => {
        const carregarDados = this.carregarDados;
        this.setState({ nomeProduto: nomeProduto }, function () {
            carregarDados();
        });
    }

    handleTipoProduto = (tipoProduto: any) => {
        const carregarDados = this.carregarDados;
        this.setState({ tipoProduto: tipoProduto }, function () {
            carregarDados();
        });
    }

    handleSubTipoProduto = (subTipoProduto: any) => {
        const carregarDados = this.carregarDados;
        this.setState({ subTipoProduto: subTipoProduto }, function () {
            carregarDados();
        });
    }

    formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    render() {
        const { history } = this.props;
        const rows = this.state.listaVenda;
        
        return (
            <div>
                <Box textAlign='center'>
                    <h1 style={{fontSize: '50px'}}>Financeiro</h1>
                    <Button onClick={history.goBack} style={{marginTop: '10px'}} variant="outlined" color='default'>Voltar</Button>
                </Box>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                    <ToggleButtonGroup exclusive value={this.state.selecaoData} onChange={(event, data) => this.handleSelecaoData(event, data)}>
                        <StyledToggleButton value="HOJE">
                            Hoje
                        </StyledToggleButton>
                        <StyledToggleButton value="SEMANA">
                            7 dias
                        </StyledToggleButton>
                        <StyledToggleButton value="MES">
                            Mês atual
                        </StyledToggleButton>
                        <StyledToggleButton value="OUTRO">
                            Outra
                        </StyledToggleButton>
                    </ToggleButtonGroup>        
                    <br />
                    <ToggleButtonGroup exclusive value={this.state.formaPagamento} onChange={(event, newAlignment) => this.handleFormaPgto(event, newAlignment)}>
                        <StyledToggleButton value="DINHEIRO">
                            <LocalAtmIcon />
                        </StyledToggleButton>
                        <StyledToggleButton value="CARTÃO">
                            <CreditCardIcon />
                        </StyledToggleButton>
                        <StyledToggleButton value="PIX">
                            <TransformIcon />
                        </StyledToggleButton>
                    </ToggleButtonGroup>
                </div>
                <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <TextField required select style={{ width: '80%' }} id="ativo" value={this.state.nomeProduto} onChange={e => this.handleProduto(e.target.value)} label="Produto" variant="outlined">
                            <option key='0' value=''></option>
                            {this.state.listaTodosProduto.map(option => (
                                <option key={option.id.toString()} value={option.nome}>{option.nome}</option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <TextField required select style={{ width: '80%' }} id="ativo" value={this.state.tipoProduto} onChange={e => this.handleTipoProduto(e.target.value)} label="Tipo" variant="outlined">
                            <option key='0' value=''></option>
                            {this.state.listaTodosTipoProduto.map(option => (
                                <option key={option.id.toString()} value={option.nome}>{option.nome}</option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <TextField select style={{ width: '80%' }} id="ativo" value={this.state.subTipoProduto} onChange={e => this.handleSubTipoProduto(e.target.value)} label="Sub Tipo" variant="outlined">
                            <option key='0' value=''></option>
                            {this.state.listaTodosSubTipoProduto.map(option => (
                                <option key={option.id.toString()} value={option.nome}>{option.nome}</option>
                            ))}
                        </TextField>
                    </Grid>                                       
                </Grid>
                <TableContainer component={Paper} style={{marginTop: '20px'}}>
                    <Table aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Produto</StyledTableCell>
                            <StyledTableCell align="center">Tipo</StyledTableCell>
                            <StyledTableCell align="center">SubTipo</StyledTableCell>
                            <StyledTableCell align="center">Qtd</StyledTableCell>
                            <StyledTableCell align="center">Valor</StyledTableCell>
                            <StyledTableCell align="center">F. Pgto</StyledTableCell>
                            <StyledTableCell align="center">Data</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.id.toString()}>
                                    <StyledTableCell align="center">{row.nomeProduto}</StyledTableCell>
                                    <StyledTableCell align="center">{row.tipoProduto}</StyledTableCell>
                                    <StyledTableCell align="center">{row.subTipoProduto}</StyledTableCell>
                                    <StyledTableCell align="center">{row.quantidade}</StyledTableCell>
                                    <StyledTableCell align="center">{this.formatter.format(row.valorTotal)}</StyledTableCell>                                    
                                    <StyledTableCell align="center">{row.formaPagamento}</StyledTableCell>                                    
                                    <StyledTableCell align="center">{row.dataVenda}</StyledTableCell>                                    
                                </StyledTableRow>
                            ))}
                            <StyledTableRow key={'TOTAL'}>
                                <StyledTableCell colSpan={7} align="center">Valor Total da Consulta: {this.formatter.format(rows.reduce((accum, item) => accum + item.valorTotal, 0))}</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default Financeiro;