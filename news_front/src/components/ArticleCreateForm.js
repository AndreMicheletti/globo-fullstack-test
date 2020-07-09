import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import LinearProgress from '@material-ui/core/LinearProgress';

import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

import { connect } from 'react-redux'

import * as actions from '../actions/articleActions'


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
    titleInput: {
        width: "100%",
        marginBottom: theme.spacing(2)
    },
    saveButton: {
        marginTop: theme.spacing(2)
    },
}));


const ArticleCreateForm = (props) => {
    const classes = useStyles()

    const { loading, error } = props

    const [title, setTitle] = useState("")
    const handleTitle = (event) => {
        setTitle(event.target.value);
    };

    const [markdownValue, setMarkdown] = useState("")
    const [selectedTab, setSelectedTab] = React.useState("write");


    const save = async () => {
        const action = await props.createArticle(title, markdownValue)
        console.log("ACTION FINISHED!!")
        console.log(action)
        setMarkdown("")
        setTitle("")
        props.onSave()
    }


    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField 
                id="title" 
                label="Título" 
                variant="outlined"
                value={title}
                onChange={handleTitle}
                className={classes.titleInput}
                disabled={loading}
            />
            <ReactMde
                value={markdownValue}
                onChange={setMarkdown}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={markdown => Promise.resolve(converter.makeHtml(markdown))}
                maxEditorHeight={350}
                disabled={loading}
            />

            <Button
                variant="contained"
                color="primary"
                className={classes.saveButton}
                endIcon={<SaveIcon />}
                disabled={loading}
                onClick={save}
            >
                Salvar
            </Button>
            {loading && <LinearProgress />}
        </form>
    )
}


const mapStateToProps = (state) => {
    return state.form
}

const mapDispatchToProps = dispatch => ({
    createArticle: (title, content) => dispatch(actions.articlePost(title, content))
})

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCreateForm);
