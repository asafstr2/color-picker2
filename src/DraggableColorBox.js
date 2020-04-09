import React from 'react'
import { withStyles } from "@material-ui/core/styles";
const styles = {
    ColorBox: {
        width: "20%",
        height:"25%",
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "flex-start",
        justifyContent: "space-between",
        "&:hover button": {
            opacity: "1",
            transition: "0.5s",
        },
    },
    ColorBox_text:{
    width:"100%",
    display:"flex",
    justifyContent: "space-between",
    padding:"5px"
    }

}

function DraggableColorBox(props) {
    const {color,classes}=props
    return (
        <div className={classes.ColorBox} style={{ backgroundColor: color}}>
            <div className={classes.ColorBox_text}><span>{color}</span> <span>trash</span></div>
           
        </div>
    )
}


export default withStyles(styles)(DraggableColorBox);