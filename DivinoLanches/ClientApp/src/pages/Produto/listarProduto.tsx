import React, { Component, useState } from 'react'
import { withRouter } from 'react-router';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green, blue, yellow } from '@material-ui/core/colors';
import { Box, Button, createStyles, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Tooltip } from '@material-ui/core';
import { SubTipoProdutoService } from '../../services/SubTipoProduto/subTipoProdutoService';
import { TipoProdutoService } from '../../services/TipoProduto/tipoProdutoService';
import { ProdutoService } from '../../services/Produto/produtoService';
import { SubTipoProdutoModel } from '../../models/SubTipoProdutoModel';
import { TipoProdutoModel } from '../../models/TipoProdutoModel';
import { ProdutoModel } from '../../models/ProdutoModel';
import { RetornoModel } from '../../models/RetornoModel';
import { Delete } from '@material-ui/icons';
import EditIcon from "@material-ui/icons/Edit";

export interface PropsProduto {
    children: React.ReactNode;
    history?: any;
}
export interface StateProduto {
    listaTodosProduto: ProdutoModel[];
    listaTodosTipoProduto: TipoProdutoModel[];
    listaTodosSubTipoProduto: SubTipoProdutoModel[];
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

class ListarProduto extends Component<PropsProduto, StateProduto> {
    constructor(props: PropsProduto) {    
        super(props);    
        this.state = {
            listaTodosProduto: [],
            listaTodosTipoProduto: [],
            listaTodosSubTipoProduto: []
        }
    }

    componentDidMount() {
        this.carregarDados();
        
        TipoProdutoService.obterTodos().then((result: RetornoModel) => {
            this.setState({
                listaTodosTipoProduto: result.data
            });
        });

        SubTipoProdutoService.obterTodos().then((result: RetornoModel) => {
            this.setState({
                listaTodosSubTipoProduto: result.data
            });
        });
    }

    carregarDados = () => {
        ProdutoService.obterTodos().then((result: RetornoModel) => {
            this.setState({ listaTodosProduto: result.data });
        });
    }

    excluirProduto = (id: any) => {
        SubTipoProdutoService.excluir(id).then((result: RetornoModel) => {
            if (!result.error) {
                this.carregarDados();
            }
            alert(result.mensagem)
        }).catch((result: RetornoModel) => {
            alert(result.mensagem)
        });
    }

    alterarProduto = (id: any) => {
        this.props.history.push({ pathname: "/Configuracoes/ManterProduto/" + id });
    }

    render() {
        const { history } = this.props;
        const rows = this.state.listaTodosProduto;
        
        return (
            <div>
                <Box textAlign='center'>
                    <h1 style={{fontSize: '50px'}}>Produtos</h1>
                    <Button onClick={history.goBack} style={{marginTop: '10px'}} variant="outlined" color='default'>Voltar</Button>
                    <Button onClick={()=> history.push({pathname: "/Configuracoes/ManterProduto"})} style={{marginTop: '10px', marginLeft: '20px'}} variant="contained" color='primary'>Incluir Novo</Button>
                </Box>
                <TableContainer component={Paper} style={{marginTop: '20px'}}>
                    <Table aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell align="center">Nome</StyledTableCell>
                            <StyledTableCell align="center">Tipo</StyledTableCell>
                            <StyledTableCell align="center">Preço</StyledTableCell>
                            <StyledTableCell align="center">Ação</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.id.toString()}>
                                    <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                                    <StyledTableCell align="center">{row.nome}</StyledTableCell>
                                    <StyledTableCell align="center">{row.tipo}</StyledTableCell>
                                    <StyledTableCell align="center">{row.valor}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Tooltip title={"Editar"} onClick={() => this.alterarProduto(row.id) } >
                                            <IconButton>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={"Excluir"} onClick={() => { this.excluirProduto(row.id); }}>
                                            <IconButton>
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default ListarProduto;