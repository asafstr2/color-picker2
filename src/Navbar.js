import React, { Component } from "react";
import Slider from "rc-slider";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import Snackbar from '@material-ui/core/Snackbar';
import "rc-slider/assets/index.css";
import { NavLink } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import sizes from "./styles/sizes";
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import NativeSelect from '@material-ui/core/NativeSelect';

const styles={
  Navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "6vh",
  },
  
  logo: {
    padding: "0 13px",
    backgroundColor: "#eceff1",
    fontFamily: "Roboto",
    fontSize: "22px",
    height:" 100%",
    display: "flex",
    alignItems: "center",
  
   "& i ":{
      fontSize: "3rem",
    },
  },
  
  slider :{
    width: "15%",
    margin: "0 10px",
    display: "inline-block",
    [sizes.down("sm")]:{
      width: "50%",
    },
  },
  
  select_container :{
    marginLeft: "auto",
    marginRight: "1.2rem",

    "& .MuiInputBase-root":{
      fontSize:"0.7rem"
    },
    "& .MuiInputLabel-root":{
      fontSize:"0.9rem",
      margin:"0",
    }




    
  },
  
  
  MuiInput_underline :{
    width: "8rem",
    textAlign: "center",
    boxShadow: "1px 2px 3px black",
  },
  
  div: {
    "& rc-slider-track": {
      backgroundColor: "transparent",
    },
  
  " & rc-slider-rail": {
      height: "15px",
    },
  
   "& rc-slider-handle" :{
      backgroundColor: "green",
      outline: "none",
      border: "2px solid green",
      boxShadow: "none",
      marginTop:" 0.1px",
  
      "&:active, &:hover, &:focus": {
        backgroundColor: "green",
        outline: "none",
        border: "2px solid green",
        boxShadow: "none",
        marginTop: "0.1px",
      },
    }
  }
}








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
    const { level, changeLevel,classes } = this.props;
    const { format,open ,handleClose} = this.state;
    const slider =level?  <div className= {classes.slider}>
    <Slider
      defaultValue={level}
      min={100}
      max={900}
      step={100}
      onAfterChange={changeLevel}
    />
  </div>
  :""
    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <NavLink to="/">
            < InvertColorsIcon/>
          </NavLink>
        </div>
      {slider}
        <div className={classes.select_container}>
        <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-select-native"> base</InputLabel>
          <NativeSelect  value={format} onChange={this.handleChange}>
            <option  value="hex">HEX</option >
            <option  value="rgb">RGB</option >
            <option  value="rgba">RGBA</option >
          </NativeSelect >
          </FormControl>
        </div>
        <Snackbar open={open} anchorOrigin={ {vertical: 'bottom', horizontal: 'left'}} onClose={handleClose}
         message= {`DONE- ${format.toUpperCase()}`}>
      </Snackbar>
      </header>
    );
  }
}
export default withStyles(styles)(Navbar);

