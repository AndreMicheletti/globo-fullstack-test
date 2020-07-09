import React, { useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

import { connect } from 'react-redux'

import * as actions from '../actions/authActions'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  feedback: {
    margin: theme.spacing(3),
  }
}));


function SignIn (props) {
  const classes = useStyles();

  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")

  const { loading, error, authToken, loginAction } = props;

  const onSubmit = () => {
    loginAction(user, pass)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Autenticação
        </Typography>

        <form className={classes.form} noValidate>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Usuário"
            name="username"
            autoComplete="username"
            disabled={loading}
            autoFocus
            onChange={(event) => setUser(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            disabled={loading}
            autoComplete="current-password"
            onChange={(event) => setPass(event.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            className={classes.submit}
            onClick={async () => {
                await onSubmit()
            }}
          >
            Entrar
          </Button>

        </form>

        {!!error && (
            <Typography component="h1" variant="h5" color="secondary">
                {error}
            </Typography>
        )}
        
      </div>
      
      {loading && <LinearProgress className={classes.feedback} />}

    </Container>
  );
}

const mapStateToProps = state => {
    return state.auth
}

const mapDispatchToProps = dispatch => ({
    loginAction: (username, password) => dispatch(actions.submitLogin(username, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
