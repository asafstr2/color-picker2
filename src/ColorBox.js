import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import chroma from "chroma-js";
import { withStyles } from "@material-ui/core/styles";
import sizes from "./styles/sizes";

function colorHue(BgColor) {
                             let BrightenessTreshHold = 0.3; //adjust to get to white faster highr value =more white 
                             let darknessTreshHold = 0.6; //adjust to get to black faster lower value = more black
                             let color = chroma(BgColor).luminance();
                             if (color <= BrightenessTreshHold) return "white";
                             else if (color >= darknessTreshHold)
                               return "rgba(0,0,0,0.5)";
                             else return false;
                           }

const styles = {
  ColorBox: {
    width: "20%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    "&:hover button": {
      opacity: "1",
      transition: "0.5s",
    },

    "& button:nth-child(1)": {
      [sizes.down("sm")]:{
        opacity:"1",      },
    },
    [sizes.down("sm")]:{
      width:"50%",
    
    },
    [sizes.down("xs")]:{
      width:"100%",
      height:props=>(props.paletteId?"default":"20%")
    },

  },
  copy_button: {
    margin: (props) => (props.paletteId ? "0" : "auto"),
    width: "5rem",
    alignSelf: "center",
    textAlign: "center",
    outline: "none",
    background: "rgba(255, 255, 255, 0.3)",
    border: "none",
    fontSize: "1rem",
    lineHeight: "30px",
    color: (props) => colorHue(props.background),
    textTransform: "uppercase",
    borderRadius: "3px",
    opacity: "0",
    cursor: "pointer",

    "&:hover": {
      background: "rgba(255, 255, 255, 0.712)",
      transition: "0.2s",
    },
  },

  box_container: {
    fontSize: "1.05rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },

  see_more: {
    alignSelf: "flex-end",
    width: "5rem",
    textAlign: "center",
    outline: "none",
    background: "rgba(255, 255, 255, 0.3)",
    border: "none",
    fontSize: "1rem",
    lineHeight: "30px",
    color: (props) => colorHue(props.background),
    textTransform: "uppercase",
    borderRadius: "3px",
    cursor: "pointer",
    opacity: "0",

    "&:hover": {
      background: "rgba(255, 255, 255, 0.712)",
      transition: "0.2s",
    },
  },

  flexbox_fix: {
    display: "flex",
    flexDirection: "row-reverse",
    width: "100%",
  },

  copy_overley: {
    position: "fixed",
    visibility: "hidden",
    zIndex: "0",
    overflow: "hidden",
  },
  copy_overley_true: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: "1",
    zIndex: "10",
    width: "100vw",
    height: "100vh",
    transform: "scale(15)",
    transition: "transform 0.6s ease-in-out",
    overflow: "hidden",
  },
  copy_msg: {
    position: "fixed",
    visibility: "hidden",
    transform: "scale(0.1)",
    overflow: "hidden",
  },
  copy_msg_true: {
    position: "fixed",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "11",
    transform: "scale(1)",
    transition: "all 0.4s ease-in-out",
    transitionDelay: "0.3s",
    overflow: "hidden",
  },
  copy_msg_true_h1: {
    width: "100vw",
    background: "rgba(255, 255, 255, 0.212)",
    textAlign: "center",
    color: (props) => colorHue(props.background),
    fontSize: "5rem",
    letterSpacing: "1px",
    lineHeight: "150px",
    textTransform: "uppercase",
    textShadow: "1px 2px 2px black",
  },
  copy_msg_true_p: {
    width: "100vw",
    textAlign: "center",
    color: (props) => colorHue(props.background),
    fontSize: "2rem",
    letterSpacing: "1px",
    lineHeight: "150px",
    fontWeight: "100",
  },
  text: {
    color: (props) => colorHue(props.background),
  },
};

function ColorBox(props) {
  const [copied, setCopied] = useState(false);
  const { name, background, colorId, paletteId, classes } = props;

  let more = paletteId && (
    <Link
      to={`/palette/${paletteId}/${colorId}`}
      style={{ textDecoration: "none" }}
    >
      <button className={`${classes.see_more}`}>More </button>
    </Link>
  );

  return (
    <div style={{ background }} className={classes.ColorBox}>
      <div className={classes.box_container}>
        <span className={classes.text}>{name}</span>
      </div>
      <CopyToClipboard
        text={background}
        onCopy={() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        <button
          className={` ${classes.copy_button} 
            
          `}
        >
          {" "}
          Copy
        </button>
      </CopyToClipboard>
      {more}

      <div
        style={{ background }}
        className={`${
          !copied ? classes.copy_overley : classes.copy_overley_true
        }`}
      />

      <div className={`${!copied ? classes.copy_msg : classes.copy_msg_true}`}>
        <h1 className={classes.copy_msg_true_h1}>Copied!</h1>
        <p className={classes.copy_msg_true_p}>{background}</p>
      </div>
    </div>
  );
}

export default withStyles(styles)(ColorBox);
