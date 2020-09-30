import React, { useState, useEffect, useContext } from 'react';
import {
  CssBaseline,
  Paper,
  TextField,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Backdrop,
  CircularProgress
} from "@material-ui/core"
import api from '../../services/api';

import { useParams } from 'react-router';
import { useStyles } from './atualizacaoEquipamentoStyle'
import { DataContext } from '../../context/DataContext';

function AtualizacaoEquipamento() {
  const { id } = useParams();
  const { equipmentsList } = useContext(DataContext);

  const [updating, setUpdating] = useState(false);
  const [equipment, setEquipment] = useState({});
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    (async () => {
      await api.get(`equipment/${id}`)
        .then((selected) => {
          setEquipment(selected.data.equipment)
        })
        .catch(err => {
          console.error("Backend is not working properly", err);
        });
      setLoading(false)
    })();
  }, [id])

  const classes = useStyles({ updating });

  if (!equipment) {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <h1 className={classes.title}>
            Detalhes do Equipamento
          </h1>
          <Paper className={classes.containerForm} elevation={0}>
            <Typography variant="h5">Dados inválidos!</Typography>
          </Paper>
        </div>
      </React.Fragment>
    );
  }

  function handleChangeInput(event) {
    const { name, value } = event.target;
    setEquipment({ ...equipment, [name]: value });
  }

  function handleSubmit() {
    if (!updating) setUpdating(true)
    else {
      console.log(equipment)
      alert("Salvando no banco de dados...")
      setUpdating(false)
    }
  }

  function handleDelete(confirmation) {
    if (updating) setUpdating(false) //cancelar
    else if (confirmation === true) { // excuir de verdade
      setDeleting(false);
      alert("Excluindo usuário do banco de dados...")
    }
    else { // confirmar exclusão
      setDeleting(true);
    }
  }

  const AreYouSure = () => (
    <Dialog
      open={deleting}
      onClose={() => setDeleting(false)}
    >
      <DialogTitle>Excluir equipamento?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Você tem certeza que deseja excluir este equipamento?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => setDeleting(false)}>
          Cancelar
          </Button>
        <Button color="secondary" onClick={() => handleDelete(true)}>
          Excluir
          </Button>
      </DialogActions>
    </Dialog>
  );

  if (loading) {
    return (
      <React.Fragment>
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>

        <h1 className={classes.title}>
          Detalhes do Equipamento
        </h1>

        <AreYouSure />

        <Paper className={classes.containerForm} elevation={0}>
          <Grid container >
            <Grid item xs={12} md={6} className={classes.grid}>
              <TextField
                className={classes.input}
                value={equipment.equipment_model}
                name="model_equipment"
                label="Modelo"
                variant="filled"
                disabled={!updating}
                onChange={handleChangeInput}
              />
              <TextField
                className={classes.input}
                value={equipment.cpf_client}
                name="cpf_client"
                label="CPF" //Trocar depois:  empresa tem cnpj e pessoa cpf massó vem cpf banco
                variant="filled"
                disabled //cpf não deve alterar
                onChange={handleChangeInput}
              />
              <TextField
                className={classes.input}
                name="id_equipment"
                value={equipment.id}
                label="Número de série"
                variant="filled"
                disabled={!updating}
                onChange={handleChangeInput}
              />
              <TextField
                className={classes.input}
                value={equipment.instalation_date}
                name="instalation_date"
                label="Data instalação"
                type="date"
                variant="filled"
                disabled={!updating}
                onChange={handleChangeInput}
                defaultValue="2020-11-10"
              />
            </Grid>


            <Grid className={classes.centralizar} item xs={12}>
              <Button variant="contained" color="primary" className={classes.btn}
                onClick={handleSubmit}
              >
                {updating ? "Salvar" : "Editar"}
              </Button>

              <Button variant="contained" color="secondary" className={classes.btn}
                onClick={handleDelete}>
                {updating ? "Cancelar" : "Excluir"}
              </Button>

            </Grid>

          </Grid>
        </Paper>

      </div>
    </React.Fragment >
  );
}


export default AtualizacaoEquipamento;
