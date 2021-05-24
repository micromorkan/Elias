import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import { TipoProdutoService } from '../services/TipoProduto/tipoProdutoService'
import { RetornoModel } from '../models/RetornoModel'
import { TipoProdutoModel } from '../models/TipoProdutoModel'

export interface PropsTipoVenda {
    children: React.ReactNode;
    history?: any;
    handle?: any;
}
export interface StateTipoVenda {
    listaTodos: TipoProdutoModel[]
}

const ButtonYellow = withStyles((theme) => ({
    root: {
        height: '100px',
        width: '80%',
        borderRadius: 10,
        color: theme.palette.getContrastText(yellow[500]),
        backgroundColor: yellow[500],
        '&:hover': {
            backgroundColor: yellow[700],
        },
    },
}))(Button);

class ListagemTipoProduto extends Component<PropsTipoVenda, StateTipoVenda> {
    constructor(props: PropsTipoVenda) {
        super(props);
        this.state = {
            listaTodos: []
        }
    }

    componentDidMount() {
        this.carregarDados();
    }

    carregarDados = () => {
        TipoProdutoService.obterFiltrado(new TipoProdutoModel({ ativo: true })).then((result: RetornoModel) => {
            this.setState({ listaTodos: result.data });
        });
    }

    prosseguir = (tipoProduto: string) => {
        this.props.handle(tipoProduto);
    }

    render() {
        let rows = this.state.listaTodos;
        return (
            <div>
                {rows.map((row) => (
                    <ButtonYellow onClick={() => this.prosseguir(row.nome)} size="large" variant="contained" color="primary" style={{ marginTop: '30px' }}>
                        {row.nome}
                    </ButtonYellow>
                ))}
            </div>
        );
    }
}

export default ListagemTipoProduto;