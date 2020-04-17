import React from "react";
import "./App.css";
import Palette from "./Palette";
import seedColor from "./seedColors";
import { Route, Switch } from "react-router-dom";
import { generatePalette } from "./ColorHelper";
import PaletteList from "./Palettelist";
import NewPalette from "./NewPalette";
import SingleColorPalette from "./SingleColorPalette";
import { withStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";

const styles = {
  backdrop: {
    zIndex: "8",
    color: "#fff",
  },
  popup: {
    backgroundColor: "rgba(248,249,252,0.85)",
    borderRadius: "5px",
    position: "fixed",
    bottom: "50%",
    right: "45%",
    border: "3px solid #f1f1f1",
    zIndex: "9",
    width: "15%",
    height: "15%",
    "& h4":{
     textAlign:"center",
     marginBottom:"1rem"
    }
  },
  buttons:{
    display:"flex",
    width:"100%",
    justifyContent:"space-around"
  }
  ,
  button: {
    borderRadius: "50%",
    width: "3rem",
    height: "3rem",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    color:"white",
    opacity:"0.9",
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.1)",
      cursor: "pointer",
      opacity:"1"
    },
  },

};

function App(props) {
  const { classes } = props;

  const savePalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [palettes, setPalette] = React.useState(savePalettes || seedColor);
  const [palettesToDelete, setpalettesToDelete] = React.useState(false);

  function findPalette(id) {
    return generatePalette(palettes.find((palette) => palette.id === id));
  }
  React.useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);

  const savePalette = (NewPalette) => {
    setPalette([...palettes, NewPalette]);
  };

  const handlePopup = (id) => {
    setpalettesToDelete(id);
  };

  const deletePalette = () => {
    let mid = palettes.filter((pallete) => pallete.id !== palettesToDelete);
    setPalette(mid);
    setpalettesToDelete(false);
  };

  const popup = (
    <div className={classes.popup}>
      <h4>Delete Palette ?</h4>
      <div className={classes.buttons}>
      
        <div className={classes.button}onClick={() => setpalettesToDelete(false)}    style={{ backgroundColor: "#0a5084" }}>
            <span>no</span>
        </div>
        <div className={classes.button} onClick={deletePalette}  style={{ backgroundColor: "#9f002d" }}>
          <span>yes</span>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {palettesToDelete && popup}
      <Backdrop
        className={classes.backdrop}
        open={palettesToDelete}
        onClick={() => setpalettesToDelete(false)}
      />
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <PaletteList
              deletePalette={handlePopup}
              palette={palettes}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path="/palette/new"
          render={(routeProps) => (
            <NewPalette
              {...routeProps}
              savePalette={savePalette}
              palettes={palettes}
            />
          )}
        />

        <Route
          exact
          path="/palette/:id"
          render={(routeProps) => (
            <Palette palette={findPalette(routeProps.match.params.id)} />
          )}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={(routeProps) => (
            <SingleColorPalette
              palette={findPalette(routeProps.match.params.paletteId)}
              colorId={routeProps.match.params.colorId}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default withStyles(styles)(App);
