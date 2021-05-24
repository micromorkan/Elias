import React, { Component } from 'react';
import { Box, Button } from '@material-ui/core';
import ListagemTipoProduto from '../../components/ListagemTipoProduto';

export interface PropsTipoVenda {
    children: React.ReactNode;
    history?: any;
}
export interface StateTipoVenda {
}

class TipoVendaAvulsa extends Component<PropsTipoVenda, StateTipoVenda> {
    handle = (tipoproduto: string) => {
        this.props.history.push({ pathname: "/TipoVenda/Venda", state: { tipoVenda: tipoproduto } })
    }

    render() {
        const { history } = this.props;
        return (
            <Box textAlign='center'>
                <h1 style={{ fontSize: '50px' }}>Venda Avulsa</h1>
                <Button onClick={history.goBack} style={{ marginTop: '10px' }} variant="outlined" color='default'>Voltar</Button>
                <br />
                <ListagemTipoProduto children={this.props.children} handle={this.handle} />
            </Box>
        );
    }
}

export default TipoVendaAvulsa;