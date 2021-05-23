import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { green, blue, yellow } from '@material-ui/core/colors';
import { Box, Button } from '@material-ui/core';

export interface PropsHome {
    children: React.ReactNode;
    history?: any;
}
export interface StateHome {
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

  class HomePage extends Component<PropsHome, StateHome> {
    render() {
        const { history } = this.props;
        return (
            <Box textAlign='center'>
                <h1 style={{fontSize: '50px'}}>Divino Lanches</h1>
                <ButtonYellow onClick={()=> history.push("/TipoVenda")} size="large" variant="contained" color="primary" style={{marginTop: '60px'}}>
                    Registrar Venda
                </ButtonYellow>
                <ButtonBlue onClick={()=> history.push("/Configuracoes")} size="large" variant="contained" color="primary" style={{marginTop: '30px'}}>
                    Configurações
                </ButtonBlue>
                <ButtonGreen onClick={() => history.push("/Financeiro")} size="large" variant="contained" color="primary" style={{marginTop: '30px'}}>
                    Financeiro
                </ButtonGreen>
            </Box>
        );
    }
}

export default HomePage;