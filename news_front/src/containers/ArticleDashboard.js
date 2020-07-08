import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

import ArticlePaper from '../components/ArticlePaper';

import { connect } from 'react-redux'


const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});


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
    }
}));


const renderArticles = (articleList, classes) => {
    return articleList.map((article) => {
        return (
            <Grid item xs={3}>
                <div className={classes.paper}>
                    <ArticlePaper key={article.id} article={article} />
                </div>
            </Grid>
        )
    })
}

  
const ArticleDashboard = (props) => {
    const classes = useStyles()
    const { articles } = props

    const [title, setTitle] = useState("")
    const handleTitle = (event) => {
        setTitle(event.target.value);
    };

    const [markdownValue, setMarkdown] = useState("")
    const [selectedTab, setSelectedTab] = React.useState("write");

    return (
        <div className={classes.root}>

            <div className={classes.addForm}>
                <Accordion>
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
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField 
                                id="title" 
                                label="Título" 
                                variant="outlined"
                                value={title}
                                onChange={handleTitle}
                                className={classes.titleInput}
                            />
                            <ReactMde
                                value={markdownValue}
                                onChange={setMarkdown}
                                selectedTab={selectedTab}
                                onTabChange={setSelectedTab}
                                generateMarkdownPreview={markdown => Promise.resolve(converter.makeHtml(markdown))}
                                maxEditorHeight={350}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.saveButton}
                                endIcon={<SaveIcon />}
                            >
                                Salvar
                            </Button>
                        </form>
                    </AccordionDetails>
                </Accordion>
            </div>            

            <Grid container spacing={3}>
                {renderArticles(articles, classes)}
            </Grid>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        articles: state.articles
    }
}


export default connect(mapStateToProps)(ArticleDashboard);
