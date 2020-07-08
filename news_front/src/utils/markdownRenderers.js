import React, { createElement } from 'react'

import Typography from '@material-ui/core/Typography';


const headingReduce = 3;


function MaterialHeading(props) {
    const level = (props.level + headingReduce) > 6 ? 6 : props.level + headingReduce
    return (
        <Typography variant={`h${level}`}>
            {props.children}
        </Typography>
    )
}


const renderers = {
    heading: MaterialHeading,
}

export default renderers;
