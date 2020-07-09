import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import CssBaseline from '@material-ui/core/CssBaseline';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { Provider } from 'react-redux'
import store from './store'

import ArticleDashboard from './containers/ArticleDashboard'
import ArticleCreateForm from './containers/ArticleCreateForm'


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  tabs: {
    flexGrow: 1,
  }
}));


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


function App() {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  const [alertOpen, setAlert] = useState(false);
  const [alertMessage, setMessage] = useState({})

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert(false);
  };

  const showMessage = (text, severity = "success") => {
      setMessage({ severity, text })
      setAlert(true)
  }

  const onSave = async () => {
    showMessage("Artigo inserido com sucesso!")
  }

  return (
    <Provider store={store}>

      <div className={classes.root}>
        <AppBar position="static">
          <CssBaseline />
          <Toolbar>

            <Typography variant="h6" className={classes.title}>
              Artigos - Editora Globo
            </Typography>

            <Tabs className={classes.tabs} value={tab} onChange={handleChange} aria-label="tabs-toolbar">
              <Tab label="Listar" id="list" aria-controls="simple-tabpanel-0"/>
              <Tab label="Criar" id="create" aria-controls="simple-tabpanel-1"/>
            </Tabs>

            <Button color="inherit">Login</Button>
          </Toolbar>

        </AppBar>

        <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alertMessage.severity}>
            {alertMessage.text}
          </Alert>
        </Snackbar>

        <TabPanel value={tab} index={0}>
          <ArticleDashboard showMessage={showMessage} />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <ArticleCreateForm onSave={onSave} showMessage={showMessage} />
        </TabPanel>

      </div>
      
    </Provider>
  );
}

export default App;
