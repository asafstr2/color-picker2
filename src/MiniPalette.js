import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    border: "1px solid black",
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "Hidden",
    "&:hover div": {
      position: "relative",
      transition: "3s",
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
    opacity: "0",
    marginLeft: "auto",
    transition: "0.5s",
    "&:hover": {
      cursor: "pointer",
    },
    "& span": {
      opacity: "1",
    },
  },
  deleteDiv: {
    position: "absolute",
    display: "flex",
    width: "100%",
    transition: "0.5s",

    "&:hover span": {
      opacity: "1",
      transition: "0.5s",
    },
  },
};

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
      <div className={classes.deleteDiv}>
        <span className={classes.delete} onClick={props.handleDelete}>
          x
        </span>
      </div>
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
