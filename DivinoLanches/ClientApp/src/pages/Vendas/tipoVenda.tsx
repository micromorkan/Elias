import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors';
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
        TipoProdutoService.obterFiltrado(new TipoProdutoModel({ ativo: true })).then((result: RetornoModel) => {
            this.setState({ listaTodos: result.data });
        });
    }

    render() {
        const { history } = this.props;
        let rows = this.state.listaTodos;        
        return (
            <Box textAlign='center'>
                <h1 style={{ fontSize: '50px' }}>Vendas</h1>
                <Button onClick={history.goBack} style={{ marginTop: '10px' }} variant="outlined" color='default'>Voltar</Button>
                <br />
                {rows.map((row) => (
                        <ButtonYellow onClick={() => history.push({ pathname: "/TipoVenda/Venda", state: { tipoVenda: row.nome } })} size="large" variant="contained" color="primary" style={{ marginTop: '30px' }}>
                            {row.nome}
                        </ButtonYellow>
                    )
                )}
            </Box>
        );
    }
}

export default TipoVenda;