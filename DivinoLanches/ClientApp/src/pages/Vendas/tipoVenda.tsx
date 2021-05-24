import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { green, blue } from '@material-ui/core/colors';
import { Box, Button } from '@material-ui/core';

export interface PropsTipoVenda {
    children: React.ReactNode;
    history?: any;
}
export interface StateTipoVenda {    
}

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

class TipoVenda extends Component<PropsTipoVenda, StateTipoVenda> {
    render() {
        const { history } = this.props;
        return (
            <Box textAlign='center'>
                <h1 style={{ fontSize: '50px' }}>Vendas</h1>
                <Button onClick={history.goBack} style={{ marginTop: '10px' }} variant="outlined" color='default'>Voltar</Button>
                <br />
                <ButtonGreen onClick={() => history.push({ pathname: "/TipoVenda/VendaAvulsa"})} size="large" variant="contained" color="primary" style={{ marginTop: '30px' }}>
                    Avulso
                </ButtonGreen>
                <ButtonBlue onClick={() => history.push({ pathname: "/TipoVenda/GerenciarComandas"})} size="large" variant="contained" color="primary" style={{ marginTop: '30px' }}>
                    Comandas
                </ButtonBlue>
            </Box>
        );
    }
}

export default TipoVenda;