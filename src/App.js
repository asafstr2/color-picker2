import React from "react";
import "./App.css";
import Palette from "./Palette";
import seedColor from "./seedColors";
import { Route, Switch } from "react-router-dom";
import { generatePalette } from "./ColorHelper";
import Palettelist from "./Palettelist";
import NewPalette from "./NewPalette";
import SingleColorPalette from "./SingleColorPalette";


function App() {
  
  const savePalettes=JSON.parse(window.localStorage.getItem("palettes"))
  const [palettes, setPalette] = React.useState(savePalettes || seedColor );

  function findPalette(id) {
    return generatePalette(palettes.find((palette) => palette.id === id));
  }

  React.useEffect(() => {
    syncLocalStorage() 
  },[palettes])

  const savePalette =  (NewPalette) => {
    setPalette([...palettes,NewPalette])  
};

const syncLocalStorage=()=>{
  window.localStorage.setItem("palettes",JSON.stringify(palettes));
}

  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <Palettelist palette={palettes} {...routeProps} />
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

export default App;
