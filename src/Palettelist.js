import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import sizes from "./styles/sizes";
// eslint-disable-next-line
import bg from "./svgBG.svg";
import bg2 from "./svgBG2.svg";

import MiniPalette from "./MiniPalette";
const styles = {

  root: {
    // backgroundColor: "#ffffff",
    backgroundColor: "#ff9d00",
    backgroundImage: `url(${bg2})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    overflow: "scroll",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  container: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    [sizes.down("lg")]: {
      width: "80%",
    },
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
    [sizes.down("sm")]: {
      gridTemplateColumns: "repeat(2,50%)",
    },
    [sizes.down("xs")]: {
      gridTemplateColumns: "repeat(1,100%)",
    },
  },
  backdrop: {
    zIndex: "8",
    color: "#fff",
  },
  popup: {
    backgroundColor: "white",
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
    const { palette, classes, deletePalette,editPalette} = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1> Color For designer</h1>

            <Link to="/palette/new" onClick={()=>window.sessionStorage.removeItem("paletteid")}>Create new palette</Link>
          </nav>

          <TransitionGroup className={classes.palette}>
            {palette.map((palette) => (
              <CSSTransition key={palette.id} classNames="item" timeout={500}>
                <MiniPalette
                  key={palette.id}
                  {...palette}
                  handleClick={() => this.goToPalette(palette.id)}
                  handleDelete={() => deletePalette(palette.id)}
                  handleEdit={() => {editPalette(palette.id); this.goToPalette("new")}}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Palettelist);
