import React from 'react'
import { withStyles } from '@material-ui/core/styles';

const styles ={
    main:{
        backgroundColor:"purple",
        border:"3px solid black",

        
    }
}


 function MiniPalette(props) {
    return (
        <div>
            <h1>mini palete</h1>
        </div>
    )
}


export default withStyles(styles)(MiniPalette);

