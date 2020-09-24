import React, { useState, useRef } from 'react';
import {
  CssBaseline,
  Typography,
  TextField,
  Button,
  Snackbar
} from "@material-ui/core"
import { Alert, Autocomplete } from '@material-ui/lab'
import { useStyles } from './cadastroEquipamentoStyle';
import nextInput from '../../services/nextInput';

export default function CadastroEquipamento(props) {
  const [openMensage, setOpenMensage] = React.useState(false);

  // Mecanismo do Form
  const [formData, setFormData] = useState({
    modelo: "",
    numeroSerie: "",
    dataInstalacao: "2020-09-22",
    cpf: "",

  });

  function handleSubmit(event) {
    event.preventDefault()
    console.log(formData);
    setOpenMensage(true);
  }

  function handleChangeInput(event, valueA) {
    const { name, value } = event.target;
    if (valueA)
      setFormData({ ...formData, modelo: valueA });
    else
      setFormData({ ...formData, [name]: value });
  }

  const handleCloseMensage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenMensage(false);
  }

  React.useEffect(() => console.log(formData), [formData])

  // Referencias (próximo a declaração de um ponteiro nulo)
  const modeloRef = useRef(null);
  const numeroSerieRef = useRef(null);
  const dataInstalacaoRef = useRef(null);
  const cpfRef = useRef(null);
  const buttonSubmitRef = useRef(null);

  const relacionamentosRef = [ // relacimento entre name e ref citada no App.js
    { name: "modelo", ref: numeroSerieRef },
    { name: "numeroSerie", ref: dataInstalacaoRef },
    { name: "dataInstalacao", ref: cpfRef },
    { name: "cpf", ref: buttonSubmitRef }
  ];

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />

      <Snackbar autoHideDuration={4000} open={openMensage} onClose={handleCloseMensage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert elevation={6} variant="filled" severity="success">
          Cadastrado com sucesso
        </Alert>
      </Snackbar>

      <div className={classes.root}>
        <Typography variant="h3" className={classes.title}>
          Cadastro de um novo equipamento
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>

          <div className={classes.containerForm}>
            <Autocomplete
              className={classes.inputs}
              options={["Bomba submersa", "Bomba centrífuga", "Bomba autoaspirante", "Bomba periférica", "Bomba injetora"]}
              onChange={handleChangeInput}
              value={formData.modelo}
              renderInput={params => (
                <TextField
                  name="modelo"
                  {...params}
                  label="Modelo do equipamento"
                  type="text"
                  helperText="*Obrigatório"
                  variant="filled"
                  autoComplete="off"
                  autoFocus
                  inputRef={modeloRef}
                  onKeyPress={e => nextInput(e, relacionamentosRef)}
                />
              )}
            />

            <TextField
              name="numeroSerie"
              className={classes.inputs}
              value={formData.numeroSerie}
              onChange={handleChangeInput}
              label="Número de série"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              autoComplete="off"
              inputRef={numeroSerieRef} // atribui um elemento a ref criada
              onKeyPress={e => nextInput(e, relacionamentosRef)} // manda a tecla apertada para a função analizar
            />

            <TextField
              name="dataInstalacao"
              className={classes.inputs}
              value={formData.dataInstalacao}
              onChange={handleChangeInput}
              label="Data de Instalação"
              type="date"
              helperText="*Obrigatório"
              variant="filled"
              defaultValue="2020-09-22"
              autoComplete="off"
              inputRef={dataInstalacaoRef}
              onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <TextField
              name="cpf"
              className={classes.inputs}
              value={formData.cpf}
              onChange={handleChangeInput}
              label="CPF"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              inputRef={cpfRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
            />
            <div>
              <Button type="submit"
                ref={buttonSubmitRef} // neste caso o button pode ser acessado 
                // diretamente por isso usamos ref={}
                className={classes.buttonRegister}>Cadastrar</Button>
            </div>

          </div>

        </form>
      </div>

    </React.Fragment>
  )
}
