import React, { Component } from 'react'
import { VendaModel } from '../../models/VendaModel'
import { VendaService } from '../../services/Venda/vendaService'
import { Box, Button } from '@material-ui/core';
import ListagemProduto from '../../components/ListagemProduto'

export interface PropsVenda {
    children: React.ReactNode;
    history?: any;
    location?: any;    
}

export interface StateVenda {
}

class Venda extends Component<PropsVenda, StateVenda> {
    incluirVenda = (model: VendaModel) => {
        VendaService.incluir(model).then(() => {
            alert("Venda Incluida com sucesso!")
        }).catch(error => {
            alert('Ocorreu um erro ao salvar: ' + error);
        });
    }

render() {
    const { history } = this.props;
        
    return (
        <div style={{flexGrow: 1}}>
            <Box textAlign='center'>
                <h1 style={{ fontSize: '30px' }}>Venda Avulsa</h1>
                <h1 style={{ fontSize: '30px' }}>{this.props.location.state.tipoVenda}</h1>
                <Button onClick={history.goBack} style={{marginTop: '10px'}} variant="outlined" color='default'>Voltar</Button>
            </Box>
            <ListagemProduto children={this.props.children} tipoVenda={this.props.location.state.tipoVenda} handle={this.incluirVenda} hideFormaPagamento={false} />
        </div>
        );
    }
}

export default Venda;