import React, { Component, useState } from 'react'
import { withRouter } from 'react-router';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green, blue, yellow } from '@material-ui/core/colors';
import { Box, Button } from '@material-ui/core';

export interface PropsConfiguracoes {
    children: React.ReactNode;
    history?: any;
}
export interface StateConfiguracoes {
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

  class Configuracoes extends Component<PropsConfiguracoes, StateConfiguracoes> {
    constructor(props: PropsConfiguracoes) {    
        super(props);    
    }

    render() {
        const { history } = this.props;
        return (
            <div>
                <Box textAlign='center'>
                    <h1 style={{fontSize: '50px'}}>Configurações</h1>
                    <Button onClick={history.goBack} style={{marginTop: '10px'}} variant="outlined" color='default'>Voltar</Button>
                    <br />
                    <ButtonGreen onClick={()=> history.push("/Configuracoes/GerenciarProdutos")} size="large" variant="contained" color="primary" style={{marginTop: '60px'}}>
                        Gerenciar Produtos
                    </ButtonGreen>
                    <ButtonYellow onClick={()=> history.push("/Configuracoes/GerenciarTipoProduto")} size="large" variant="contained" color="primary" style={{marginTop: '30px'}}>
                        Gerenciar Tipo Produto
                    </ButtonYellow>
                    <ButtonBlue onClick={()=> history.push("/Configuracoes/GerenciarSubTipoProduto")} size="large" variant="contained" color="primary" style={{marginTop: '30px'}}>
                        Gerenciar Sub Tipo Produto
                    </ButtonBlue>
                </Box>
            </div>
        );
    }
}

export default Configuracoes;