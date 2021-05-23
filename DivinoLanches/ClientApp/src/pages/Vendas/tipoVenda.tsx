import React, { Component, useState } from 'react'
import { withRouter } from 'react-router';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green, blue, yellow } from '@material-ui/core/colors';
import { Box, Button } from '@material-ui/core';
import { TipoProdutoService } from '../../services/TipoProduto/tipoProdutoService'
import { RetornoModel } from '../../models/RetornoModel'
import { TipoProdutoModel } from '../../models/TipoProdutoModel'

export interface PropsTipoVenda {
    children: React.ReactNode;
    history?: any;
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

  const ButtonBlue = withStyles((theme) => ({
    root: {
        height: '100px',
        width: '80%',
        borderRadius: 10,    
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        '&:hover': {
            backgroundColor: blue[700],
        },
    },
  }))(Button);

  const ButtonGreen = withStyles((theme) => ({
    root: {
        height: '100px',
        width: '80%',
        borderRadius: 10,    
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
  }))(Button);

class TipoVenda extends Component<PropsTipoVenda, StateTipoVenda> {
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
        TipoProdutoService.obterTodos().then((result: RetornoModel) => {
            this.setState({ listaTodos: result.data });
        });
    }

    render() {
        const { history } = this.props;
        let rows = this.state.listaTodos;
        let random: number = 0;
        let first = true;
        return (
            <Box textAlign='center'>
                <h1 style={{ fontSize: '50px' }}>Vendas</h1>
                <Button onClick={history.goBack} style={{ marginTop: '10px' }} variant="outlined" color='default'>Voltar</Button>
                <br />
                {rows.map((row) => {
                    if (random === 0) {
                        first = false;
                        random++;
                        return (<ButtonGreen onClick={() => history.push({ pathname: "/TipoVenda/Venda", state: { tipoVenda: row.nome } })} size="large" variant="contained" color="primary" style={{ marginTop: first ? '60px' : '30px' }}>
                            {row.nome}
                        </ButtonGreen>)
                    } else if (random === 1) {
                        random++;
                        return (<ButtonYellow onClick={() => history.push({ pathname: "/TipoVenda/Venda", state: { tipoVenda: row.nome } })} size="large" variant="contained" color="primary" style={{ marginTop: first ? '60px' : '30px' }}>
                            {row.nome}
                        </ButtonYellow>)
                    } else if (random === 1) {
                        random = 0;
                        return (<ButtonBlue onClick={() => history.push({ pathname: "/TipoVenda/Venda", state: { tipoVenda: row.nome } })} size="large" variant="contained" color="primary" style={{ marginTop: first ? '60px' : '30px' }}>
                            {row.nome}
                        </ButtonBlue>)
                    }
                })
                }
            </Box>
        );
    }
}

export default TipoVenda;