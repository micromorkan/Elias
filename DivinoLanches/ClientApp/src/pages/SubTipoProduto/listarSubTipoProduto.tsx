import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Box, Button, createStyles, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Tooltip } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
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
    listaTodos: SubTipoProdutoModel[];
    ativo: any;
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

class ListarSubTipoProduto extends Component<PropsSubTipoProduto, StateSubTipoProduto> {
    constructor(props: PropsSubTipoProduto) {    
        super(props);    
        this.state = {
            listaTodos: [],
            ativo: null
        }
    }

    componentDidMount() {
        this.carregarDados();
    }

    carregarDados = () => {
        SubTipoProdutoService.obterFiltrado(new SubTipoProdutoModel({ ativo: this.state.ativo === null ? null : this.state.ativo === 'true' })).then((result: RetornoModel) => {
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

    handleSelecaoFiltro = (event: React.MouseEvent<HTMLElement>, value: any) => {
        const carregarDados = this.carregarDados;
        this.setState({ ativo: value }, function () {
            carregarDados();
        });
    };

    render() {
        const { history } = this.props;
        const rows = this.state.listaTodos;
        return (
            <div>
                <Box textAlign='center'>
                    <h1 style={{fontSize: '30px'}}>Sub Tipo Produto</h1>
                    <Button onClick={history.goBack} style={{marginTop: '10px'}} variant="outlined" color='default'>Voltar</Button>
                    <Button onClick={()=> history.push({pathname: "/Configuracoes/ManterSubTipoProduto"})} style={{marginTop: '10px', marginLeft: '20px'}} variant="contained" color='primary'>Incluir Novo</Button>
                </Box>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                    <ToggleButtonGroup exclusive value={this.state.ativo} onChange={(event, data) => this.handleSelecaoFiltro(event, data)}>
                        <StyledToggleButton value="true">
                            Ativos
                        </StyledToggleButton>
                        <StyledToggleButton value="false">
                            Inativos
                        </StyledToggleButton>
                    </ToggleButtonGroup>
                </div>
                <TableContainer component={Paper} style={{marginTop: '20px'}}>
                    <Table aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Nome</StyledTableCell>
                            <StyledTableCell align="center">Tipo</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                            <StyledTableCell align="center">Ação</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.id.toString()}>
                                    <StyledTableCell align="center">{row.nome}</StyledTableCell>
                                    <StyledTableCell align="center">{row.tipoProduto}</StyledTableCell>
                                    <StyledTableCell align="center">{row.ativo ? 'Ativo' : 'Inativo'}</StyledTableCell>
                                    <StyledTableCell align="center">
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
                            {rows.length === 0 && (
                                <StyledTableRow key={'0'}>
                                    <StyledTableCell colSpan={4} align="center">Não há resultados para exibir</StyledTableCell>
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default ListarSubTipoProduto;