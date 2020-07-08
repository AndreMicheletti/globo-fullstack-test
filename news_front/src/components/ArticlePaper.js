import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


import ReactMarkdown from 'react-markdown/with-html'
import renderers from '../utils/markdownRenderers'


const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    title: {
        marginBottom: 12,
    },
    actions: {
        justifyContent: 'center'
    }
});


const ArticlePaper = ({ article }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" className={classes.title} component="h2">
                    {article.title}
                </Typography>
                <Divider />
                <Typography variant="body2" component="p">
                    <ReactMarkdown
                        source={article.content}
                        renderers={renderers}
                        escapeHtml={false}
                    />
                </Typography>
            </CardContent>

            <CardActions disableSpacing className={classes.actions}>
                <Button size="small" color="primary">Editar</Button>
                <Button size="small" color="secondary">Remover</Button>
            </CardActions>
        </Card>
    )
}


export default ArticlePaper;