import React, { Component } from "react";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from '@material-ui/core/Snackbar';


import "rc-slider/assets/index.css";
import { Route, Switch, Link, NavLink } from "react-router-dom";

import "./Navbar.css";
class Navbar extends Component {

state={
  format:"hex",
  open:false
}

  handleChange = e => {
    this.setState({format:e.target.value,open:true})
    this.props.handleChange(e.target.value);
    setTimeout(()=>this.setState({open:false}),1000)
  };

  render() {
    const { level, changeLevel } = this.props;
    const { format,open ,handleClose} = this.state;
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
           
            <MenuItem value="hex">HEX</MenuItem>
            <MenuItem value="rgb">RGB</MenuItem>
            <MenuItem value="rgba">RGBA</MenuItem>
          </Select>
          <Snackbar open={open} anchorOrigin={ {vertical: 'bottom', horizontal: 'left'}} onClose={handleClose}
      
         message= {`DONE- ${format.toUpperCase()}`}
    >
      </Snackbar>
        </div>
      </header>
    );
  }
}
export default Navbar;
