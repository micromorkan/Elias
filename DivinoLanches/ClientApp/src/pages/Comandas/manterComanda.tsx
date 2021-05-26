import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { Box, Button, Modal, createStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, Theme, TableRow, Tooltip, IconButton, Fade } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import Backdrop from '@material-ui/core/Backdrop';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { ComandaService } from '../../services/Comanda/comandaService'
import { RetornoModel } from '../../models/RetornoModel'
import { ProdutoComandaModel } from '../../models/ProdutoComandaModel'
import { ComandaModel } from '../../models/ComandaModel';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import TransformIcon from '@material-ui/icons/Transform';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import CachedIcon from '@material-ui/icons/Cached';

export interface PropsProduto {
    children: React.ReactNode;
    history?: any;
    location?: any;
    match?: any;
}
export interface StateProduto {
    id: number;
    nomeCliente: string;
    formaPagamento: string;
    listaProdutosComanda: ProdutoComandaModel[];

    idProdutoComanda: number;
    nomeProduto: string;
    qtdEmUso: number;
    qtdRemover: number;
    valorTotal: number;
    open: boolean;
    openExclusao: boolean;

    habilitarAcoes: boolean;

    update: string;
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

const StyledToggleReload = withStyles({
    root: {
        marginLeft: '10px',
        fontFamily: 'Arial',
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0.25px',
        color: 'rgba(0, 0, 0, 0.87)',
        padding: '8px 8px',
        textTransform: 'none',
        width: '100%',
        '&$selected': {
            backgroundColor: 'rgba(1, 255, 20, 0.20)',
            color: 'rgb(26, 88, 159)',
            '&:hover': {
                backgroundColor: 'rgba(1, 255, 20, 0.20)',
                color: 'rgb(26, 88, 159)',
            },
        },
    },
    selected: {},
})(ToggleButton);

const { clearInterval, setInterval } = window;
let reload = true;
let interval = 0;

class ManterComanda extends Component<PropsProduto, StateProduto> {
    constructor(props: PropsProduto) {    
        super(props);    
        this.state = {
            id: 0,
            nomeCliente: '',
            formaPagamento: '',
            listaProdutosComanda: [],

            idProdutoComanda: 0,
            nomeProduto: '',
            qtdEmUso: 0,
            qtdRemover: 0,
            valorTotal: 0,
            open: false,
            openExclusao: false,

            habilitarAcoes: false,

            update: '1',
        }
    }

    componentDidMount() {        
        this.carregarDados();
        interval = setInterval(this.reloadItensComanda, 10000);
    }

    componentWillUnmount() {
        reload = false;
        clearInterval(interval);
    }

    carregarDados = () => {
        ComandaService.obterPorId(this.props.match.params.id).then((result: RetornoModel) => {   
            if (!result.data.ativo) {
                this.props.history.push("/TipoVenda/GerenciarComandas");
            }
            this.setState({
                id: result.data.id,
                nomeCliente: result.data.nomeCliente,
                listaProdutosComanda: result.data.listaProdutos,
                valorTotal: result.data.listaProdutos.reduce((accum: number, item: any) => accum + (item.valor * item.quantidade), 0),
                habilitarAcoes: true,
            });
            reload = true;
        });
    }

    reloadItensComanda = () => {
        if (reload) {
            reload = false;
            this.carregarDados();
        }
    }

    excluirProduto = () => {
        if (this.state.idProdutoComanda === 0) {

        } else if (this.state.qtdRemover === 0) {
            alert('Informe a quantidade a ser removida');
        } else {
            ComandaService.excluirProdutoComanda(this.state.idProdutoComanda, this.state.qtdEmUso, this.state.qtdRemover).then((result: RetornoModel) => {
                if (!result.error) {
                    this.setState({ qtdRemover: 0 });
                    this.closeModalExclusao();
                    this.carregarDados();
                }
            }).catch((result: RetornoModel) => {
                alert(result.mensagem);
            });
        }
    }

    finalizarComanda = () => {
        if (this.state.formaPagamento?.trim() === '' || this.state.formaPagamento === null) {
            alert('Informe a Forma de Pagamento')
        } else {
            ComandaService.finalizarComanda(new ComandaModel({ id: this.state.id, nomeCliente: this.state.nomeCliente, formaPagamento: this.state.formaPagamento })).then((result: RetornoModel) => {
                if (!result.error) {
                    alert('Comanda finalizada com sucesso!')
                    this.props.history.push("/TipoVenda/GerenciarComandas");
                }
            }).catch((result: RetornoModel) => {
                alert(result.mensagem)
            });
        }
    }

    cancelarComanda = () => {
        if (this.state.listaProdutosComanda.length !== 0) {
            alert('Não é possível cancelar uma comanda com produtos!')
        } else {
            ComandaService.excluir(this.state.id).then((result: RetornoModel) => {
                if (!result.error) {
                    alert('Comanda cancelada com sucesso!')
                    this.props.history.push("/TipoVenda/GerenciarComandas");
                } else {
                    alert(result.mensagem)
                }
            }).catch((result: RetornoModel) => {
                alert(result.mensagem)
            });
        }
    }

    handleFormaPagamento = (event: React.MouseEvent<HTMLElement>, value: any) => {        
        this.setState({ formaPagamento: value });
    };

    handleUpdate = (event: React.MouseEvent<HTMLElement>, value: any) => {
        this.setState({ update: value === null ? '0' : value });
        reload = value === null ? false : true;
    };

    openModal = () => {
        this.setState({
            open: true,
        });
    };

    closeModal = () => {
        this.setState({ open: false });
    };

    openModalExclusao = (idProdutoComanda: number, nomeProduto: string, qtdEmUso: number) => {
        this.setState({
            openExclusao: true,
            idProdutoComanda: idProdutoComanda,
            nomeProduto: nomeProduto,
            qtdEmUso: qtdEmUso
        });
    };

    closeModalExclusao = () => {
        this.setState({
            openExclusao: false,
            idProdutoComanda: 0,
            nomeProduto: '',
            qtdEmUso: 0
        });
    };

    handleQtd = (event: React.MouseEvent<HTMLElement>, value: any) => {       
        this.setState({ qtdRemover: value === null ? 0 : value });
    };

    formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    render() {
        const { history } = this.props;
        const rows = this.state.listaProdutosComanda;        
        return (
            <div>
                <Box textAlign='center'>
                    <h1 style={{ fontSize: '20px' }}>Comanda - {this.state.nomeCliente}</h1>
                    <Button onClick={() => history.push("/TipoVenda/GerenciarComandas")} style={{ marginTop: '-10px' }} variant="outlined" color='default'>Voltar</Button>
                    <ToggleButtonGroup exclusive value={this.state.update} onChange={(event, newAlignment) => this.handleUpdate(event, newAlignment)}>
                        <StyledToggleReload value="1">
                            <CachedIcon />
                        </StyledToggleReload>
                    </ToggleButtonGroup>
                    <Button disabled={!this.state.habilitarAcoes} style={{ marginTop: '-10px', marginLeft: '10px' }} onClick={() => history.push({ pathname: "/TipoVenda/TipoVendaComanda", state: { idComanda: this.state.id, nomeCliente: this.state.nomeCliente } })} variant="contained" color='primary'>Incluir</Button>
                    <br />
                </Box>
                <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Nome</StyledTableCell>
                                <StyledTableCell align="center">Quantidade</StyledTableCell>
                                <StyledTableCell align="center">Preço</StyledTableCell>
                                <StyledTableCell align="center">Ação</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.id.toString()}>
                                    <StyledTableCell align="center">{row.nomeProduto}</StyledTableCell>
                                    <StyledTableCell align="center">{row.quantidade}</StyledTableCell>
                                    <StyledTableCell align="center">{this.formatter.format(row.valor * row.quantidade)}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Tooltip title={"Excluir"} onClick={() => { this.openModalExclusao(row.id, row.nomeProduto, row.quantidade); }}>
                                            <IconButton>
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                            {rows.length > 0 && (
                            <StyledTableRow key={'TOTAL'}>
                                    <StyledTableCell colSpan={4} align="center">Valor Total da Comanda: {this.formatter.format(this.state.valorTotal)}</StyledTableCell>
                                </StyledTableRow>
                            )}
                            {rows.length === 0 && (
                                <StyledTableRow key={'0'}>
                                    <StyledTableCell colSpan={4} align="center">Nenhum Produto foi adicionado</StyledTableCell>
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {rows.length > 0 && (
                    <Box textAlign='center'>
                        <Button disabled={!this.state.habilitarAcoes} onClick={() => this.openModal()} style={{ marginTop: '20px' }} variant="contained" color='primary'>Finalizar Comanda</Button>
                    </Box>
                )}
                {rows.length === 0 && (
                    <Box textAlign='center'>
                        <Button disabled={!this.state.habilitarAcoes} onClick={() => this.cancelarComanda()} style={{ marginTop: '20px' }} variant="contained" color='primary'>Cancelar Comanda</Button>
                    </Box>
                )}
                
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    open={this.state.open}
                    onClose={this.closeModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.open}>
                        <div style={{ backgroundColor: '#FFF', border: '2px solid #000', padding: '2em 4em 3em', textAlign: 'center' }}>
                            <h3>{this.state.nomeCliente}</h3>
                            <h2>Total: {this.formatter.format(this.state.valorTotal)}</h2>
                                <div>
                                    <br />
                                    <h4>Forma de Pagamento</h4>
                                    <ToggleButtonGroup exclusive value={this.state.formaPagamento} onChange={(event, newAlignment) => this.handleFormaPagamento(event, newAlignment)}>
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
                            <br /><br />
                            <Button variant="contained" color='primary' onClick={this.finalizarComanda}>Finalizar Comanda</Button>
                        </div>
                    </Fade>
                </Modal>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    open={this.state.openExclusao}
                    onClose={this.closeModalExclusao}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.openExclusao}>
                        <div style={{ backgroundColor: '#FFF', border: '2px solid #000', padding: '2em 4em 3em', textAlign: 'center' }}>
                            <h3>Remover - {this.state.nomeProduto}</h3>
                            <h3>Escolha a quantidade para remover</h3>
                            <div>
                                <br />
                                <ToggleButtonGroup exclusive value={this.state.qtdRemover} onChange={(event, newAlignment) => this.handleQtd(event, newAlignment)}>
                                    <StyledToggleButton value="1">
                                        1
                                    </StyledToggleButton>
                                    {this.state.qtdEmUso >= 2 && (
                                        <StyledToggleButton value="2">
                                            2
                                        </StyledToggleButton>
                                    )}
                                    {this.state.qtdEmUso >= 3 && (
                                        <StyledToggleButton value="3">
                                            3
                                        </StyledToggleButton>
                                    )}
                                </ToggleButtonGroup>
                                <ToggleButtonGroup exclusive value={this.state.qtdRemover} onChange={(event, newAlignment) => this.handleQtd(event, newAlignment)}>
                                    {this.state.qtdEmUso >= 4 && (
                                        <StyledToggleButton value="4">
                                            4
                                        </StyledToggleButton>
                                    )}
                                    {this.state.qtdEmUso >= 5 && (
                                        <StyledToggleButton value="5">
                                            5
                                        </StyledToggleButton>
                                    )}
                                    {this.state.qtdEmUso >= 6 && (
                                        <StyledToggleButton value="6">
                                            6
                                        </StyledToggleButton>
                                    )}
                                </ToggleButtonGroup>
                                <ToggleButtonGroup exclusive value={this.state.qtdRemover} onChange={(event, newAlignment) => this.handleQtd(event, newAlignment)}>
                                    {this.state.qtdEmUso >= 7 && (
                                        <StyledToggleButton value="7">
                                            7
                                        </StyledToggleButton>
                                    )}
                                    {this.state.qtdEmUso >= 8 && (
                                        <StyledToggleButton value="8">
                                            8
                                        </StyledToggleButton>
                                    )}
                                    {this.state.qtdEmUso >= 9 && (
                                        <StyledToggleButton value="9">
                                            9
                                        </StyledToggleButton>
                                    )}
                                </ToggleButtonGroup>
                            </div>
                            <br /><br />
                            <Button variant="contained" color='primary' onClick={() => this.excluirProduto()}>Confirmar</Button>
                        </div>
                    </Fade>
                </Modal>
            </div>
        );
    }
}

export default ManterComanda;