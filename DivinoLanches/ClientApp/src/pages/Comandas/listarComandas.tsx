import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import { Box, Button, Fade, Modal, Grid, TextField } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Backdrop from '@material-ui/core/Backdrop';
import { ComandaService } from '../../services/Comanda/comandaService';
import { ComandaModel } from '../../models/ComandaModel';
import { RetornoModel } from '../../models/RetornoModel';
import CachedIcon from '@material-ui/icons/Cached';

export interface PropsComanda {
    children: React.ReactNode;
    history?: any;
}
export interface StateComanda {
    listaTodosComanda: ComandaModel[];
    nomeCliente: string;
    open: boolean;
    update: string;
    reload: boolean;
}

const ButtonOrange = withStyles((theme) => ({
    root: {
        height: '100px',
        width: '100%',
        borderRadius: 10,
        color: theme.palette.getContrastText(orange[500]),
        backgroundColor: orange[500],
        '&:hover': {
            backgroundColor: orange[700],
        },
    },
}))(Button);

const StyledToggleButton = withStyles({
    root: {
        marginLeft: '10px',
        fontFamily: 'Arial',
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0.25px',
        color: 'rgba(0, 0, 0, 0.87)',
        padding: '8px 8px',
        textTransform: 'none',
        width: '100%',
        '&$selected': {
            backgroundColor: 'rgba(1, 255, 20, 0.20)',
            color: 'rgb(26, 88, 159)',
            '&:hover': {
                backgroundColor: 'rgba(1, 255, 20, 0.20)',
                color: 'rgb(26, 88, 159)',
            },
        },
    },
    selected: {},
})(ToggleButton);

class ListarComanda extends Component<PropsComanda, StateComanda> {
    constructor(props: PropsComanda) {    
        super(props);    
        this.state = {
            listaTodosComanda: [],
            nomeCliente: '',
            open: false,
            update: '1',
            reload: true
        }
    }

    componentDidMount() {
        this.carregarDados();
        setInterval(this.reloadComanda, 10000);
    }

    carregarDados = () => {
        ComandaService.obterFiltrado(new ComandaModel({ ativo: true })).then((result: RetornoModel) => {
            this.setState({ listaTodosComanda: result.data, reload: true });
        });
    }

    alterarComanda = (id: any) => {
        this.props.history.push({ pathname: "/TipoVenda/ManterComanda/" + id });
    }

    incluirComanda = () => {
        if (this.state.nomeCliente === '') {
            alert('Informe o Nome do Cliente');
        } else {

            let venda = {
                nomeCliente: this.state.nomeCliente
            }
            
            let model = new ComandaModel(venda);
            
            ComandaService.incluir(model).then((result: RetornoModel) => {
                this.closeModal();
                console.log(result)
                this.props.history.push({ pathname: "/TipoVenda/ManterComanda/" + result.data });
            }).catch(error => {
                alert('Ocorreu um erro ao salvar: ' + error);
            });
        }
    };

    handleChange = (name: keyof StateComanda, value: any) => {
        let newState: any;
        newState = { [name]: value } as Pick<StateComanda, keyof StateComanda>;
        this.setState(newState);
    };

    handleUpdate = (event: React.MouseEvent<HTMLElement>, value: any) => {
        this.setState({ update: value === null ? '0' : value });
    };

    reloadComanda = () => {
        if (this.state.update === '1' && this.state.reload) {
            this.setState({ reload: false });
            this.carregarDados();
        }
    }

    openModal = () => {
        this.setState({ open: true });

    };

    closeModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { history } = this.props;
        const rows = this.state.listaTodosComanda;
        
        return (
            <div>
                <Box textAlign='center'>
                    <h1 style={{fontSize: '30px'}}>Comandas</h1>
                    <Button onClick={() => history.push("/TipoVenda")} style={{ marginTop: '-10px' }} variant="outlined" color='default'>Voltar</Button>
                    <ToggleButtonGroup exclusive value={this.state.update} onChange={(event, newAlignment) => this.handleUpdate(event, newAlignment)}>
                        <StyledToggleButton value="1">
                            <CachedIcon/>
                        </StyledToggleButton>
                    </ToggleButtonGroup>
                    <Button onClick={() => this.openModal()} style={{marginTop: '-10px', marginLeft: '10px'}} variant="contained" color='primary'>Incluir</Button>
                </Box>
                <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    {rows.map(row => (
                        <Grid item xs={6} style={{ textAlign: 'center' }}>
                            <ButtonOrange onClick={() => history.push({ pathname: "/TipoVenda/ManterComanda/" + row.id })} size="large" variant="contained" color="primary" style={{ marginTop: '30px' }}>
                                {row.nomeCliente}
                            </ButtonOrange>
                        </Grid>
                    ))}
                </Grid>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    open={this.state.open}
                    onClose={this.closeModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.open}>
                        <div style={{ backgroundColor: '#FFF', border: '2px solid #000', padding: '2em 4em 3em', textAlign: 'center' }}>
                            <h2>Informe o Nome do Cliente</h2>
                            <Grid container spacing={3} style={{ marginTop: '20px' }}>
                                <Grid item xs={12} style={{ textAlign: 'center' }}>
                                    <TextField required id="nome" style={{ width: '80%' }} value={this.state.nomeCliente} onChange={e => { this.handleChange("nomeCliente", e.target.value); }} label="Nome Cliente" variant="outlined" />
                                </Grid>
                            </Grid>
                            <br /><br />
                            <Button variant="contained" color='primary' onClick={() => this.incluirComanda()}>Salvar</Button>
                        </div>
                    </Fade>
                </Modal>
            </div>
        );
    }
}

export default ListarComanda;