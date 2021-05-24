import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './pages/Principal/home'
import TipoVenda from './pages/Vendas/tipoVenda'
import TipoVendaAvulsa from './pages/Vendas/tipoVendaAvulsa'
import ListarComanda from './pages/Comandas/listarComandas'
import ManterComanda from './pages/Comandas/manterComanda'
import TipoProdutoComanda from './pages/Comandas/tipoProdutoComanda'
import IncluirProdutoComanda from './pages/Comandas/incluirProdutoComanda'
import Venda from './pages/Vendas/venda'
import Financeiro from './pages/Vendas/financeiro'
import Configuracoes from './pages/Principal/configuracoes'
import ListarProduto from './pages/Produto/listarProduto'
import ManterProduto from './pages/Produto/manterProduto'
import ListarTipoProduto from './pages/TipoProduto/listarTipoProduto'
import ManterTipoProduto from './pages/TipoProduto/manterTipoProduto'
import ListarSubTipoProduto from './pages/SubTipoProduto/listarSubTipoProduto'
import ManterSubTipoProduto from './pages/SubTipoProduto/manterSubTipoProduto'

const rootElement = document.getElementById('root');

const RoutedApp = () => (
    <BrowserRouter >
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/TipoVenda" component={TipoVenda} />
            <Route path="/TipoVenda/Venda" component={Venda} />
            <Route path="/TipoVenda/VendaAvulsa" component={TipoVendaAvulsa} />
            <Route path="/TipoVenda/GerenciarComandas" component={ListarComanda} />
            <Route path="/TipoVenda/ManterComanda/:id" component={ManterComanda} />
            <Route path="/TipoVenda/TipoVendaComanda" component={TipoProdutoComanda} />
            <Route path="/TipoVenda/IncluirProdutoComanda" component={IncluirProdutoComanda} />

            <Route exact path="/Configuracoes" component={Configuracoes} />

            <Route path="/Configuracoes/GerenciarProdutos" component={ListarProduto} />
            <Route path="/Configuracoes/ManterProduto/:id?" component={ManterProduto} />

            <Route path="/Configuracoes/GerenciarTipoProduto" component={ListarTipoProduto} />
            <Route path="/Configuracoes/ManterTipoProduto/:id?" component={ManterTipoProduto} />

            <Route path="/Configuracoes/GerenciarSubTipoProduto" component={ListarSubTipoProduto} />
            <Route path="/Configuracoes/ManterSubTipoProduto/:id?" component={ManterSubTipoProduto} />

            <Route exact path="/Financeiro" component={Financeiro} />
        </Switch>
    </BrowserRouter>
);

ReactDOM.render(<RoutedApp />, rootElement);