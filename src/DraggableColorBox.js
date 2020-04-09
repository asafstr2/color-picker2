import React from "react";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  ColorBox: {
    width: "20%",
    height: "25%",
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "flex-start",
    justifyContent: "space-between",
    "& a": {
      opacity: "0.8",
      color: "#353432",
      "&:hover": {
        color: "black",
        opacity: "1",
        transition: "0.5s",
        cursor: "pointer",
      },
    },
  },
  ColorBox_text: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: "5px",
  },
};

function DraggableColorBox(props) {
  const { color, classes,name } = props;
  return (
    <div className={classes.ColorBox} style={{ backgroundColor: color }}>
      <div className={classes.ColorBox_text}>
        <span>{name}</span>{" "}
        <a onClick={() => props.delete(props.id)}>
          <DeleteIcon className={classes.icon} />
        </a>
      </div>
    </div>
  );
}

export default withStyles(styles)(DraggableColorBox);
