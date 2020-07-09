import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

import ArticlePaper from '../components/ArticlePaper';

import { connect } from 'react-redux'

import * as actions from '../actions/articleActions'
  

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
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


const renderArticles = (props, classes) => {

    const { articles, showMessage } = props

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

  
const ArticleDashboard = (props) => {
    const classes = useStyles()
    useEffect(() => {
        // Component did Mount
        props.fetchAll()
    }, [])

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
        <div className={classes.root}>  
            <Container maxWidth="xl">
                <Grid container spacing={0}>
                    {renderArticles(props, classes)}
                </Grid>
            </Container>
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
