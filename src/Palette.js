import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./palette.css";
import Navbar from "./Navbar"

class Palette extends Component {
  state = {
    level: 500,
    format:"hex"
  };

  changeLevel = level => {
    this.setState({ level });
  };


  handleChange=format=>{
    this.setState({format})
  }

  render() {
    const { level, format } = this.state;
    const { colors } = this.props.palette;
    const colorBox = colors[level].map(color => (
      <ColorBox key={color[format]} background={color[format]} name={color.name} />
    ));
    return (
      <div className="Palette">
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.handleChange}
        ></Navbar>

        <div className="palette-color">
          {colorBox}
          {/* footer */}
        </div>
      </div>
    );
  }
}

export default Palette;
