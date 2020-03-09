import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./palette.css";
import Navbar from "./Navbar"

class Palette extends Component {
  state = {
    level: 500
  };

  changeLevel = level => {
    this.setState({ level });
  };

  render() {
    const { level } = this.state;
    const { colors } = this.props.palette;
    const colorBox = colors[level].map(color => (
      <ColorBox background={color.hex} name={color.name} />
    ));
    return (
      <div className="Palette">
        <Navbar level={level} changeLevel={this.changeLevel}></Navbar>
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
