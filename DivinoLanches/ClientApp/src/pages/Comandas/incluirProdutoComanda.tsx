import React, { Component } from 'react';
import { Box, Button } from '@material-ui/core';
import ListagemProduto from '../../components/ListagemProduto';
import { ProdutoComandaModel } from '../../models/ProdutoComandaModel'
import { VendaModel } from '../../models/VendaModel'
import { ComandaService } from '../../services/Comanda/comandaService'

export interface PropsProdutoComanda {
    children: React.ReactNode;
    history?: any;
    match?: any;
    location?: any;
}

export interface StateProdutoComanda {
}

class IncluirProdutoComanda extends Component<PropsProdutoComanda, StateProdutoComanda> {
    incluirProdutoComanda = (model: VendaModel) => {
        if (!!this.props.location.state.idComanda) {
            this.props.history.push('/TipoVenda/GerenciarComandas');
        }
        
        let produtoComandaModel = new ProdutoComandaModel({
            idComanda: this.props.location.state.idComanda,
            quantidade: model.quantidade,
            nomeProduto: model.nomeProduto,
            tipoProduto: model.tipoProduto,
            subTipoProduto: model.subTipoProduto,
            valor: (model.valorTotal / model.quantidade),
        });

        ComandaService.incluirProdutoComanda(produtoComandaModel).then(() => {
            this.props.history.push('/TipoVenda/ManterComanda/' + this.props.location.state.idComanda);
            //alert("Produto incluido com sucesso!")            
        }).catch(error => {
            alert('Ocorreu um erro ao salvar: ' + error);       
        });       
    }

    render() {
        const { history } = this.props;
        return (
            <div style={{ flexGrow: 1 }}>
                <Box textAlign='center'>
                    <h1 style={{ fontSize: '20px' }}>Comanda - {this.props.location.state.nomeCliente}</h1>
                    <h1 style={{ fontSize: '20px' }}>{this.props.location.state.tipoVenda}</h1>
                    <Button onClick={() => history.push({ pathname: "/TipoVenda/TipoVendaComanda", state: { idComanda: this.props.location.state.idComanda, nomeCliente: this.props.location.state.nomeCliente } })} style={{marginTop: '10px'}} variant="outlined" color='default'>Voltar</Button>
                </Box>
                <ListagemProduto children={this.props.children} handle={this.incluirProdutoComanda} tipoVenda={this.props.location.state.tipoVenda} hideFormaPagamento={true} />
            </div>
        );
    }
}

export default IncluirProdutoComanda;