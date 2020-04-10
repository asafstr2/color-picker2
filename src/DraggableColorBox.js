import React from "react";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import {SortableElement } from "react-sortable-hoc";


const styles = {
  ColorBox: {
    width: "20%",
    height: "25%",
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "flex-start",
    justifyContent: "space-between",
    "& svg": {
      opacity: "0.8",
      color: "#353432",
      "&:hover": {
        color: "black",
        opacity: "1",
        transition: "all 0.3s ease-in-out",
        cursor: "pointer",
        transform:"scale(1.2)"
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

const  DraggableColorBox=SortableElement((props)=> {
  const { color, classes,name } = props;
  return (
    <div className={classes.ColorBox} style={{ backgroundColor: color }}>
      <div className={classes.ColorBox_text}>
        <span>{name}</span>{" "}
        
          <DeleteIcon
            className={classes.icon}
            onClick={() => props.delete(props.name)}
          />
        
      </div>
    </div>
  );
})

export default withStyles(styles)(DraggableColorBox);
