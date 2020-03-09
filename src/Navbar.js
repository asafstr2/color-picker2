import React, { Component } from "react";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import "rc-slider/assets/index.css";
import { Route, Switch, Link, NavLink } from "react-router-dom";

import "./Navbar.css";
class Navbar extends Component {

state={
  format:"hex"
}


  handleChange = e => {
    this.setState({format:e.target.value})
    this.props.handleChange(e.target.value);
  };

  render() {
    const { level, changeLevel } = this.props;
    const { format } = this.state;
    return (
      <header className="Navbar">
        <div className="logo">
          <NavLink to="/">
            <i className="fas fa-palette"></i>
          </NavLink>
        </div>
        <div className="slider">
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onAfterChange={changeLevel}
          />
        </div>
        <div className="select-container">
          <Select value={format} onChange={this.handleChange}>
           
            <MenuItem value="hex">hex</MenuItem>
            <MenuItem value="rgb">rgb</MenuItem>
            <MenuItem value="rgba">rgba</MenuItem>
          </Select>
        </div>
      </header>
    );
  }
}
export default Navbar;
