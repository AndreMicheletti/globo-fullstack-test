import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import ArticlePaper from '../components/ArticlePaper';
import ArticleCreateForm from '../components/ArticleCreateForm';

import { connect } from 'react-redux'

import * as actions from '../actions/articleActions'


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    addForm: {
        minWidth: 400,
        width: "50%",
        marginTop: 10,
        marginBottom: 10,
        margin: "0 auto",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    heading: {
        fontSize: theme.typography.pxToRem(20)
    },
    titleInput: {
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    saveButton: {
        marginTop: theme.spacing(2)
    },
    feedback: {
        display: "flex", 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: theme.spacing(3)
    }
}));


const renderArticles = (props, classes, showMessage) => {

    const { articles } = props

    return articles.map((article) => {
        return (
            <Grid item xs={3}>
                <div className={classes.paper}>
                    <ArticlePaper 
                        key={article.id}
                        article={article}
                        onRemove={() => props.fetchAll()}
                        onEdit={() => props.fetchAll()}
                        onError={(text) => {
                            showMessage(text, "error")
                        }}
                    />
                </div>
            </Grid>
        )
    })
}

const renderGrid = (props, classes, showMessage) => {

    const { articles, loading, error } = props

    if (loading) {
        return (
            <div className={classes.feedback}>
                <CircularProgress />
            </div>
        )
    }

    if (error) {
        return (
            <div className={classes.feedback}>
                <Typography variant="h4" color="secondary">
                    Ocorreu um erro...
                </Typography>
            </div>
        )
    }

    if (!articles || articles.length <= 0) {
        return (
            <div className={classes.feedback}>
                <Typography variant="h4">
                    Ainda não há artigos.
                </Typography>
            </div>
        )
    }

    return (
        <Grid container spacing={0}>
            {renderArticles(props, classes, showMessage)}
        </Grid>
    )
}

  
const ArticleDashboard = (props) => {
    const classes = useStyles()
    useEffect(() => {
        // Component did Mount
        props.fetchAll()
    }, [])

    const [alertOpen, setAlert] = useState(false);
    const [alertMessage, setMessage] = useState({})

    const [expanded, setExpanded] = useState(false)

    const showMessage = (text, severity = "success") => {
        setMessage({ severity, text })
        setAlert(true)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert(false);
    };

    const onSave = async () => {
        showMessage("Artigo inserido com sucesso!")
        await props.fetchAll()
        setExpanded(false)
    }

    return (
        <div className={classes.root}>

            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertMessage.severity}>
                    {alertMessage.text}
                </Alert>
            </Snackbar>

            <div className={classes.addForm}>
                <Accordion expanded={expanded} onClick={() => setExpanded(true)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>
                            Adicionar artigo
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <ArticleCreateForm onSave={onSave} />
                    </AccordionDetails>
                </Accordion>
            </div>          

            {renderGrid(props, classes, showMessage)}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        articles: state.articles,
        loading: state.dashboard.loading,
        error: state.dashboard.error
    }
}

const mapDispatchToProps = dispatch => ({
    fetchAll: () => dispatch(actions.articleGetAll())
})


export default connect(mapStateToProps, mapDispatchToProps)(ArticleDashboard);
