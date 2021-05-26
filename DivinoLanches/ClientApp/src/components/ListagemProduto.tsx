import React, { Component } from 'react'
import { ProdutoModel } from '../models/ProdutoModel'
import { VendaModel } from '../models/VendaModel'
import { RetornoModel } from '../models/RetornoModel'
import { ProdutoService } from '../services/Produto/produtoService'
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Button, Fade, Grid, Modal } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import TransformIcon from '@material-ui/icons/Transform';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';

export interface PropsListagemProduto {
    children: React.ReactNode;
    history?: any;
    location?: any;
    tipoVenda?: any;
    handle?: any;
    hideFormaPagamento?: boolean;
}

export interface StateListagemProduto {
    listaProdutos: ProdutoModel[];
    tipoVenda: string;

    idProduto: number;
    nomeProduto: string;
    tipoProduto: string;
    subTipoProduto: string;
    valorUnitario: number;
    quantidade: number;
    formaPagamento: string;

    habilitarIncluir: boolean;
    open: boolean;
}

const ButtonGreen = withStyles((theme) => ({
    root: {
        height: '100px',
        width: '100%',
        borderRadius: 10,
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(Button);

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

class ListagemProduto extends Component<PropsListagemProduto, StateListagemProduto> {
    constructor(props: PropsListagemProduto) {
        super(props);
        this.state = {
            listaProdutos: [],
            tipoVenda: this.props.tipoVenda,

            idProduto: 0,
            nomeProduto: '',
            tipoProduto: '',
            subTipoProduto: '',
            valorUnitario: 0,
            quantidade: 0,
            formaPagamento: '',

            habilitarIncluir: true,
            open: false
        }
    }

    componentDidMount() {
        let filtro = {
            tipo: this.state.tipoVenda,
            ativo: true
        }

        let model = new ProdutoModel(filtro);
        ProdutoService.obterFiltrado(model).then((result: RetornoModel) => {
            this.setState({ listaProdutos: result.data });
        })
    }

    handleQtd = (event: React.MouseEvent<HTMLElement>, value: any) => {
        this.setState({ quantidade: value });
    };

    handleFormaPagamento = (event: React.MouseEvent<HTMLElement>, value: any) => {
        this.setState({ formaPagamento: value });
    };

    openModal = (id: any, nomeproduto: string, valor: any, tipo: string, subTipo: string) => {
        this.setState({
            open: true,
            idProduto: Number(id),
            nomeProduto: nomeproduto,
            tipoProduto: tipo,
            subTipoProduto: subTipo,
            valorUnitario: valor,            
        });
    };

    closeModal = () => {
        this.setState({ open: false, nomeProduto: '', quantidade: 1, formaPagamento: '', habilitarIncluir: true });
    };

    handleQuantidade = (value: any) => {
        this.setState({ quantidade: Number(value) });
    };

    incluirVenda = () => {
        if (this.state.quantidade === 0 || this.state.quantidade === null) {
            alert('Informe a Quantidade');
        } else if ((this.state.formaPagamento?.trim() === '' || this.state.formaPagamento === null) && !this.props.hideFormaPagamento) {
            alert('Informe a Forma de Pagamento')
        } else {

            let venda = {
                id: 0,
                nomeProduto: this.state.nomeProduto,
                tipoProduto: this.state.tipoProduto,
                subTipoProduto: this.state.subTipoProduto,
                quantidade: parseInt(this.state.quantidade.toString()),
                dataVenda: new Date().toLocaleDateString(),
                valorTotal: parseFloat(this.state.valorUnitario.toString().replace(',', '.')) * this.state.quantidade,
                formaPagamento: this.state.formaPagamento
            }

            let model = new VendaModel(venda);
            this.setState({ habilitarIncluir: false }, () => {
                this.props.handle(model);
                this.closeModal();
            });
        }
    };   

    render() {
        let produtos = this.state.listaProdutos;
        return (
            <div>
                <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    {produtos.map(item => (
                        <Grid item xs={6} style={{ textAlign: 'center' }}><ButtonGreen size="large" variant="contained" onClick={() => this.openModal(item.id, item.nome, item.valor, item.tipo, item.subTipo)}>{item.nome}</ButtonGreen></Grid>
                    )
                    )}
                </Grid>
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
                            <h3>Informe a Quantidade</h3>
                            <h2>{this.state.nomeProduto}</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <ToggleButtonGroup exclusive value={this.state.quantidade} onChange={(event, newAlignment) => this.handleQtd(event, newAlignment)}>
                                    <StyledToggleButton value="1">
                                        1
                                </StyledToggleButton>
                                    <StyledToggleButton value="2">
                                        2
                                </StyledToggleButton>
                                    <StyledToggleButton value="3">
                                        3
                                </StyledToggleButton>
                                </ToggleButtonGroup>
                                <ToggleButtonGroup exclusive value={this.state.quantidade} onChange={(event, newAlignment) => this.handleQtd(event, newAlignment)}>
                                    <StyledToggleButton value="4">
                                        4
                                </StyledToggleButton>
                                    <StyledToggleButton value="5">
                                        5
                                </StyledToggleButton>
                                    <StyledToggleButton value="6">
                                        6
                                </StyledToggleButton>
                                </ToggleButtonGroup>
                                <ToggleButtonGroup exclusive value={this.state.quantidade} onChange={(event, newAlignment) => this.handleQtd(event, newAlignment)}>
                                    <StyledToggleButton value="7">
                                        7
                                </StyledToggleButton>
                                    <StyledToggleButton value="8">
                                        8
                                </StyledToggleButton>
                                    <StyledToggleButton value="9">
                                        9
                                </StyledToggleButton>
                                </ToggleButtonGroup>
                            </div>
                            {!this.props.hideFormaPagamento && (
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
                            )}
                            <br /><br />
                            <Button disabled={!this.state.habilitarIncluir} variant="contained" color='primary' onClick={this.incluirVenda}>Salvar</Button>
                        </div>
                    </Fade>
                </Modal>
            </div>
        );
    }
}

export default ListagemProduto;