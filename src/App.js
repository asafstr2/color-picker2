import React from 'react';
import './App.css';
import Palette from './Palette';
import seedColor from './seedColors';
import { Route, Switch, Link, NavLink } from 'react-router-dom';
import { generatePalette } from './ColorHelper';
import Palettelist from './Palettelist';

function findPalette(id) {
	return generatePalette(seedColor.find((palette) => palette.id === id));
}

function App() {
	console.log(generatePalette(seedColor[4]));
	return (
		<div>
			<Switch>
				<Route exact path="/" render={() => <Palettelist />} />
				<Route
					exact
					path="/palette/:id"
					render={(routeProps) => <Palette palette={findPalette(routeProps.match.params.id)} />}
				/>
			</Switch>
		</div>
	);
}

export default App;
