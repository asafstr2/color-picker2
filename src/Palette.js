import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './palette.css';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";


class Palette extends Component {
state={
	level:500,
}

changeLevel=(level)=>{
this.setState({level})
}

	render() {
		const { level } = this.state;
		const { colors } = this.props.palette;
		const colorBox =colors[level].map((color) => <ColorBox background={color.hex} name={color.name} />);
		return (
      <div className="Palette">
        <Slider defaultValue={level} min={100} max={900} step={100} onAfterChange={this.changeLevel}/>
        {/* navbar goes here */}

        <div className="palette-color">
          {colorBox}
          {/* footer */}
        </div>
      </div>
    );
	}
}

export default Palette;
