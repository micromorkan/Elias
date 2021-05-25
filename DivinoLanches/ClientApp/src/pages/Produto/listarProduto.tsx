import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Box, Button, createStyles, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Tooltip } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
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
    ativo: any;
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

class ListarProduto extends Component<PropsProduto, StateProduto> {
    constructor(props: PropsProduto) {    
        super(props);    
        this.state = {
            ativo: null,
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
        ProdutoService.obterFiltrado(new ProdutoModel({ ativo: this.state.ativo === null ? null : this.state.ativo === 'true' })).then((result: RetornoModel) => {
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

    handleSelecaoFiltro = (event: React.MouseEvent<HTMLElement>, value: any) => {
        const carregarDados = this.carregarDados;
        this.setState({ ativo: value }, function () {
            carregarDados();
        });
    };

    render() {
        const { history } = this.props;
        const rows = this.state.listaTodosProduto;
        
        return (
            <div>
                <Box textAlign='center'>
                    <h1 style={{fontSize: '30px'}}>Produtos</h1>
                    <Button onClick={() => history.push('/Configuracoes')} style={{marginTop: '10px'}} variant="outlined" color='default'>Voltar</Button>
                    <Button onClick={()=> history.push({pathname: "/Configuracoes/ManterProduto"})} style={{marginTop: '10px', marginLeft: '20px'}} variant="contained" color='primary'>Incluir Novo</Button>
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
                            <StyledTableCell align="center">Preço</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                            <StyledTableCell align="center">Ação</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>                            
                            {rows.map((row) => (
                                <StyledTableRow key={row.id.toString()}>
                                    <StyledTableCell align="center">{row.nome}</StyledTableCell>
                                    <StyledTableCell align="center">{row.tipo}</StyledTableCell>
                                    <StyledTableCell align="center">R$ {row.valor}</StyledTableCell>
                                    <StyledTableCell align="center">{row.ativo ? 'Ativo' : 'Inativo'}</StyledTableCell>
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
                            {rows.length === 0 && (
                                <StyledTableRow key={'0'}>
                                    <StyledTableCell colSpan={5} align="center">Não há resultados para exibir</StyledTableCell>
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default ListarProduto;