import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import MiniPalette from "./MiniPalette";
const styles = {
  root: {
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  nav: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    color: "white",
    alignItems: "center",
    "& a": {
      color: "white",
    },
  },
  palette: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3,30%)",
    gridGap: "5%",
  },
  backdrop: {
    zIndex: "8",
    color: "#fff",
  },
  popup: {
	  backgroundColor:"white",
	borderRadius: "5px",
	position: "fixed",
	bottom: "40%",
	right: "40%",
	border: "3px solid #f1f1f1",
	zIndex: "9",
	width: "20%",
	height: "32%",
  },
};

class Palettelist extends Component {


  goToPalette(id) {
    this.props.history.push(`/palette/${id}`);
  }



  render() {
    const { palette, classes ,deletePalette } = this.props;



    return (
      <div className={classes.root}>
	
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>react color</h1>
            <Link to="/palette/new">new palette</Link>
          </nav>
          <div className={classes.palette}>
            {palette.map((palette) => (
              <MiniPalette
                key={palette.id}
                {...palette}
                handleClick={() => this.goToPalette(palette.id)}
                handleDelete={() => deletePalette(palette.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Palettelist);
