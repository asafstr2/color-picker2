import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './palette.css';
import Navbar from './Navbar';

class Palette extends Component {
	state = {
		level: 500,
		format: 'hex'
	};

	changeLevel = (level) => {
		this.setState({ level });
	};

	handleChange = (format) => {
		this.setState({ format });
	};

	render() {
		const { level, format } = this.state;
		const { colors, paletteName, emoji,id } = this.props.palette;
		const colorBox = colors[level].map((color) => (
			<ColorBox colorId={color.id} background={color[format]} name={color.name} key={color.id} paletteId={id} />
		));
		return (
			<div className="Palette">
				<Navbar level={level} changeLevel={this.changeLevel} handleChange={this.handleChange} />

				<div className="palette-color">
					{colorBox}
					</div>
                <div>
					<footer className="Palette-footer">
						<span>{paletteName}</span>
						<span className="emoji">{emoji}</span>
					</footer>
				</div>
			</div>
		);
	}
}

export default Palette;
