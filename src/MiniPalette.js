import React from "react";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  root: {
    border: "1px solid black",
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    "&:hover svg": {
      opacity:"1",
    },
  },
  colors: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "grey",
    width: "100%",
    borderRadius: "5px",
    overflow: "Hidden",
    "&:hover": {
      cursor: "pointer",
    },
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative",
  },
  emoji: {
    fontSize: "1.5rem",
  },
  miniColor: {
    width: "20%",
    height: "1.6rem",
  },
  delete: {
    color:"#a6281d",
    borderRadius:"5rem",
    backgroundColor:"white",
    fontSize:"1.6rem",
    position: "absolute",
    opacity:"0",
    transition: "0.4s ease-in-out",
    "&:hover": {
      backgroundColor: "rgba(248,249,252,0.85)",
      cursor: "pointer",
      color:"#cb5240",
      transform: "scale(1.1)",


    },
  },
}

function MiniPalette(props) {
  const { classes, paletteName, emoji, colors } = props;
  const miniColorBox = colors.map((color) => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    ></div>
  ));

  return (
    <div className={classes.root}>
        
          <DeleteIcon  className={classes.delete} onClick={props.handleDelete} />
      
      <div className={classes.colors} onClick={props.handleClick}>
        {miniColorBox}
      </div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji} </span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
