import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';

export default class Palettelist extends Component {
	render() {
		const { palette } = this.props;

		return (
			<div>
                <MiniPalette></MiniPalette>
				<h1>react color</h1>
				{palette.map((palette) => <Link key={palette.id} to={`/palette/${palette.id}`}>{palette.paletteName}</Link>)}
			</div>
		);
	}
}
