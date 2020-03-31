import React, { Component } from 'react'
import ColorBox from "./ColorBox"
import Navbar from "./Navbar"
import { withStyles } from '@material-ui/core/styles';
import {  Link } from 'react-router-dom';



const styles = {
    Palette: {
        height: "98vh"

    },
    paletteColor: {
        height: "90%",
        display: "flex",
        flexWrap: "wrap",
        flexGrow: "1",
        flexBasis: "2"
    },

    PaletteFooter: {
        width: "100vw",
        background: "white",
        // height: "5vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold"
    },
    emoji: {
        fontSize: "1.5rem",
        margin: "0 1rem"
    },
    goBack:{
            background: "black",
            width: "20%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flexStart",
            justifyContent: "spaceBetween",
    },
    copyButton:{
        width: "5rem",
        alignSelf: "center",
        textAlign: "center",
        outline: "none",
        background: "rgba(255, 255, 255, 0.3)",
        border: "none",
        fontSize: "1rem",
        lineHeight: "30px",
        color: "white",
        textTransform: "uppercase",
        borderRadius: "3px",
        cursor: "pointer",
        margin:"auto",
        "&:hover":{
            background: "rgba(255, 255, 255, 0.712)",
            transition: "0.2s",
            color:"white"
           
        }
    }
  

}




class SingleColorPalette extends Component {
    constructor(props) {
        super(props)
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        console.log(this._shades)
    }
    state = {
        format: 'hex'
    };


    handleChange = (format) => {
        this.setState({ format });
    };

    gatherShades(palette, colorToFilterBy) {
        const allColors = palette.colors;
        let shades = [];

        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            )
        }
        return shades.slice(1)

    }

    render() {
        const { classes } = this.props
        const { paletteName, emoji,id } = this.props.palette;
        const { format } = this.state;
        const colorBox = this._shades.map(color =>
            <ColorBox colorId={color.id} background={color[format]} name={color.name} key={color.id} />
        )
        return (
            <div className={classes.Palette}>
                <Navbar handleChange={this.handleChange} />
                <div className={classes.paletteColor}>
                    {colorBox}
                    <div className={classes.goBack}><Link to={`/palette/${id}`} className={classes.copyButton} style={{ textDecoration: 'none' }}> go back</Link> </div>
                </div>
                <div>

                    <footer className={classes.PaletteFooter}>
                        <span>{paletteName}</span>
                        <span className="emoji">{emoji}</span>
                    </footer>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);

