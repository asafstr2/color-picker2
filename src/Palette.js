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


  handleChange=e=>{
    console.log(e)
  }

  render() {
    const { level } = this.state;
    const { colors } = this.props.palette;
    const colorBox = colors[level].map(color => (
      <ColorBox key={color.hex} background={color.hex} name={color.name} />
    ));
    return (
      <div className="Palette">
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.handleChange}
        ></Navbar>
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
