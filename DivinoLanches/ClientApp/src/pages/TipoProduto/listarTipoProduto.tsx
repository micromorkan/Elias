import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Box, Button, createStyles, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Tooltip } from '@material-ui/core';
import { TipoProdutoService } from '../../services/TipoProduto/tipoProdutoService'
import { TipoProdutoModel } from '../../models/TipoProdutoModel'
import { RetornoModel } from '../../models/RetornoModel'
import { Delete } from '@material-ui/icons';
import EditIcon from "@material-ui/icons/Edit";

export interface PropsTipoProduto {
    children: React.ReactNode;
    history?: any;
}
export interface StateTipoProduto {
    listaTodos: TipoProdutoModel[]
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

class ListarTipoProduto extends Component<PropsTipoProduto, StateTipoProduto> {
    constructor(props: PropsTipoProduto) {    
        super(props);    
        this.state = {
            listaTodos: []
        }
    }

    componentDidMount() {
        this.carregarDados();
    }

    carregarDados = () => {
        TipoProdutoService.obterTodos().then((result: RetornoModel) => {
            this.setState({ listaTodos: result.data });
        });
    }

    excluirTipoProduto = (id: any) => {
        TipoProdutoService.excluir(id).then((result: RetornoModel) => {
            if (!result.error) {
                this.carregarDados();
            }
            alert(result.mensagem);
        }).catch((result: RetornoModel) => {
            alert(result.mensagem);
        });
    }

    alterarTipoProduto = (id: any) => {
        this.props.history.push({ pathname: "/Configuracoes/ManterTipoProduto/" + id });
    }


    render() {
        const { history } = this.props;
        const rows = this.state.listaTodos;
        return (
            <div>
                <Box textAlign='center'>
                    <h1 style={{fontSize: '50px'}}>Tipo Produto</h1>
                    <Button onClick={history.goBack} style={{marginTop: '10px'}} variant="outlined" color='default'>Voltar</Button>
                    <Button onClick={()=> history.push({pathname: "/Configuracoes/ManterTipoProduto"})} style={{marginTop: '10px', marginLeft: '20px'}} variant="contained" color='primary'>Incluir Novo</Button>
                </Box>
                <TableContainer component={Paper} style={{marginTop: '20px'}}>
                    <Table aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell align="center">Nome</StyledTableCell>
                            <StyledTableCell align="center">Ativo</StyledTableCell>
                            <StyledTableCell align="center">Ação</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.id.toString()}>
                                    <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                                    <StyledTableCell align="center">{row.nome}</StyledTableCell>
                                    <StyledTableCell align="center">{row.ativo ? 'Sim' : 'Não'}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Tooltip title={"Editar"} onClick={() => this.alterarTipoProduto(row.id) } >
                                            <IconButton>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={"Excluir"} onClick={() => { this.excluirTipoProduto(row.id); }}>
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

export default ListarTipoProduto;