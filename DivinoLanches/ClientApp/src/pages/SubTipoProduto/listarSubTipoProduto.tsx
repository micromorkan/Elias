import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Box, Button, createStyles, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Tooltip } from '@material-ui/core';
import { SubTipoProdutoService } from '../../services/SubTipoProduto/subTipoProdutoService';
import { SubTipoProdutoModel } from '../../models/SubTipoProdutoModel';
import { RetornoModel } from '../../models/RetornoModel';
import { Delete } from '@material-ui/icons';
import EditIcon from "@material-ui/icons/Edit";

export interface PropsSubTipoProduto {
    children: React.ReactNode;
    history?: any;
}
export interface StateSubTipoProduto {
    listaTodos: SubTipoProdutoModel[]
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

class ListarSubTipoProduto extends Component<PropsSubTipoProduto, StateSubTipoProduto> {
    constructor(props: PropsSubTipoProduto) {    
        super(props);    
        this.state = {
            listaTodos: []
        }
    }

    componentDidMount() {
        this.carregarDados();
    }

    carregarDados = () => {
        SubTipoProdutoService.obterTodos().then((result: RetornoModel) => {
            this.setState({ listaTodos: result.data });
        });
    }

    excluirSubTipoProduto = (id: any) => {
        SubTipoProdutoService.excluir(id).then((result: RetornoModel) => {
            if (!result.error) {
                this.carregarDados();
            }
            alert(result.mensagem);
        });
    }

    alterarSubTipoProduto = (id: any) => {
        this.props.history.push({ pathname: "/Configuracoes/ManterSubTipoProduto/" + id });
    }


    render() {
        const { history } = this.props;
        const rows = this.state.listaTodos;
        return (
            <div>
                <Box textAlign='center'>
                    <h1 style={{fontSize: '50px'}}>Tipo Produto</h1>
                    <Button onClick={history.goBack} style={{marginTop: '10px'}} variant="outlined" color='default'>Voltar</Button>
                    <Button onClick={()=> history.push({pathname: "/Configuracoes/ManterSubTipoProduto"})} style={{marginTop: '10px', marginLeft: '20px'}} variant="contained" color='primary'>Incluir Novo</Button>
                </Box>
                <TableContainer component={Paper} style={{marginTop: '20px'}}>
                    <Table aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Id</StyledTableCell>
                            <StyledTableCell align="center">Nome</StyledTableCell>
                            <StyledTableCell align="center">Tipo</StyledTableCell>
                            <StyledTableCell align="center">Ativo</StyledTableCell>
                            <StyledTableCell align="center">Ação</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.id.toString()}>
                                    <StyledTableCell component="th" scope="row">{row.id}</StyledTableCell>
                                    <StyledTableCell align="center">{row.nome}</StyledTableCell>
                                    <StyledTableCell align="center">{row.tipoProduto}</StyledTableCell>
                                    <StyledTableCell align="center">{row.ativo ? 'Sim' : 'Não'}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Tooltip title={"Editar"} onClick={() => this.alterarSubTipoProduto(row.id) } >
                                            <IconButton>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={"Excluir"} onClick={() => { this.excluirSubTipoProduto(row.id); }}>
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

export default ListarSubTipoProduto;