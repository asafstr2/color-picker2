import React from 'react';
import './App.css';
import Palette from './Palette';
import seedColor from './seedColors';
import { Route, Switch, Link, NavLink } from 'react-router-dom';
import { generatePalette } from './ColorHelper';

function findPalette(id){
  return seedColor.find(palette=>palette.id===id)
}


function App() {
	console.log(generatePalette(seedColor[4]));
	return (
		<div>
			<Switch>
				<Route exact path="/"  />
        <Route exact path="/palette/:id"  
        
        render={routeProps=>(<Palette palette={generatePalette(findPalette(routeProps.match.params.id))} />)}
        
        />
			</Switch>
		</div>
	);
}

export default App;
