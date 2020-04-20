import React from 'react'
import { withStyles } from "@material-ui/core/styles";
const styles = {
    "@global":{
        " .item-enter": {
           opacity: "0",
         },
        " .item-enter-active": {
           opacity: "1",
         },
        " .item-exit": {
           opacity: "1",
         },
         ".item-exit-active" :{
           opacity: "0",
         },
       },
    page:{
        height:"100vh",
        position:"fixed",
        width:"100%",
        transition:"opacity 0.5s ease-in-out",
    }
}
 function Page( {children,classes}) {


    return (
        <section className={classes.page}>
            {children}
        </section>
    )
}

export default withStyles(styles)(Page)