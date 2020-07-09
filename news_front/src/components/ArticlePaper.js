import React, { useState } from 'react';
import axios from 'axios'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';

import ReactMarkdown from 'react-markdown/with-html'
import renderers from '../utils/markdownRenderers'

import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

import { BACKEND_URL } from '../const'


const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 275,
    },
    cardContent: {
        maxHeight: 390
    },
    title: {
        marginBottom: 12,
    },
    actions: {
        justifyContent: 'center'
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    textContent: {
        height: 200,
        overflow: 'auto'
    },
    date: {
        marginTop: theme.spacing(8)
    }
}));


const renderContent = (article, classes) => {
    const published = moment(article.published_at).format("d/M/YYYY, HH:mm:ss")
    console.log(published)
    return (
        <React.Fragment>
            <Typography variant="h5" className={classes.title} component="h2">
                {article.title}
            </Typography>
            <Divider />
            <Typography
                className={classes.textContent}
                variant="body2"
                component="p"
            >
                <ReactMarkdown
                    source={article.content}
                    renderers={renderers}
                    escapeHtml={false}
                />            
            </Typography>
            <Divider />
            <Typography className={classes.date} variant="caption">
                Publicado em {published}
            </Typography>
        </React.Fragment>
    )
}


const ArticlePaper = ({ article, onRemove, onEdit, onError }) => {
    const classes = useStyles();

    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false)

    const [title, setTitle] = useState(article.title)
    const handleTitle = (event) => {
        setTitle(event.target.value);
    };

    const [markdownValue, setMarkdown] = useState(article.content)

    const deleteArticle = async () => {

        const url = BACKEND_URL + "/article/" + article.id
        setLoading(true)
    
        try {
            const response = await axios.delete(url)
        } catch (e) {
            console.warn("DELETE FAILED!!")
            console.warn(e)
            onError(`Não foi possível remover o artigo "${article.title}"`)
        } finally {
            setLoading(false)
        }
    }

    const editArticle = async () => {

        setLoading(true)
        const url = BACKEND_URL + "/article/" + article.id

        try {
            const response = await axios.put(url, { title, content: markdownValue })
        } catch (e) {
            console.warn("UPDATE FAILED!!")
            console.warn(e)
            onError(`Não foi possível alterar o artigo "${article.title}"`)
        } finally {
            setEditing(false)
            setLoading(false)
        }
    }

    return (
        <Card className={classes.root}>
            {loading && <LinearProgress />}
            <CardContent className={classes.cardContent}>
                {!editing && renderContent(article, classes)}
                {editing && (
                    <form noValidate autoComplete="off">
                        <TextField 
                            id="title" 
                            label="Título" 
                            variant="outlined"
                            value={title}
                            onChange={handleTitle}
                            className={classes}
                            disabled={loading}
                        />
                        <Divider className={classes.divider} />
                        <ReactMde
                            value={markdownValue}
                            onChange={setMarkdown}
                            disablePreview
                            maxEditorHeight={350}
                            disabled={loading}
                        />
                    </form>
                )}
            </CardContent>

            <CardActions disableSpacing className={classes.actions}>
                <Button
                    size="small"
                    color="primary"
                    disabled={loading}
                    endIcon={editing ? <SaveIcon /> : undefined}
                    onClick={async () => {
                        if (!editing) {
                            setEditing(true)
                        } else {
                            await editArticle()
                            onEdit()
                        }
                    }}
                >
                    {editing ? "Salvar" : "Editar"}
                    </Button>
                <Button
                    size="small"
                    color="secondary"
                    disabled={loading}
                    onClick={async () => {
                        if (!editing) {
                            await deleteArticle()
                            onRemove()
                        } else {
                            setEditing(false)
                        }
                    }}
                >
                    {editing ? "Cancelar" : "Remover"}
                </Button>
            </CardActions>
        </Card>
    )
}


export default ArticlePaper;