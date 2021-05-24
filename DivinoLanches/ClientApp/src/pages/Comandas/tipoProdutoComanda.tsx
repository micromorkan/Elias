import React, { Component } from 'react';
import { Box, Button } from '@material-ui/core';
import ListagemTipoProduto from '../../components/ListagemTipoProduto';

export interface PropsTipoProduto {
    children: React.ReactNode;
    history?: any;
    match?: any;
    location?: any;
}
export interface StateTipoProduto {
}

class TipoProdutoComanda extends Component<PropsTipoProduto, StateTipoProduto> {
    handle = (tipoproduto: string) => {
        if (!!this.props.location.state.idComanda || !!this.props.location.state.nomeCliente) {
            this.props.history.push('/TipoVenda/GerenciarComandas');
        }

        this.props.history.push({ pathname: "/TipoVenda/IncluirProdutoComanda", state: { tipoVenda: tipoproduto, idComanda: this.props.location.state.idComanda, nomeCliente: this.props.location.state.nomeCliente }})
    }

    render() {
        const { history } = this.props;
        return (
            <Box textAlign='center'>
                <h1 style={{ fontSize: '20px' }}>Comanda - {this.props.location.state.nomeCliente}</h1>
                <Button onClick={() => history.push("/TipoVenda/ManterComanda/" + this.props.location.state.idComanda)} style={{ marginTop: '10px' }} variant="outlined" color='default'>Voltar</Button>
                <br />
                <ListagemTipoProduto children={this.props.children} handle={this.handle} />
            </Box>
        );
    }
}

export default TipoProdutoComanda;