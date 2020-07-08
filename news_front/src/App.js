import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import CssBaseline from '@material-ui/core/CssBaseline';

import { Provider } from 'react-redux'
import store from './store'


import ArticleDashboard from './containers/ArticleDashboard'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));


function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>

      <div className={classes.root}>
        <AppBar position="static">
          <CssBaseline />
          <Toolbar>

            <Typography variant="h6" className={classes.title}>
              Artigos - Editora Globo
            </Typography>

            <Button color="inherit">Login</Button>

          </Toolbar>
        </AppBar>

        <ArticleDashboard />

      </div>
      
    </Provider>
  );
}

export default App;
