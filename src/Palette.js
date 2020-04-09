import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import { withStyles } from "@material-ui/core/styles";




const styles= {
	Palette:{
    height: "98vh"
},
palette_color:{
    height: "90%",
    display:"flex",
    flexWrap: "wrap",
    flexGrow: "1",
    flexBasis: "1",
},

Palette_footer:{
    width: "100vw",
    background:"white" ,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
},
emoji:{
    fontSize: "1.5rem",
    margin: "0 1rem",
}
}




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
		const{classes}=this.props
		const colorBox = colors[level].map((color) => (
			<ColorBox colorId={color.id} background={color[format]} name={color.name} key={color.id} paletteId={id} />
		));
		return (
      <div className={classes.Palette}>
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.handleChange}
        />

        <div className={classes.palette_color}>{colorBox}</div>
        <div>
          <footer className={classes.Palette_footer}>
            <span>{paletteName}</span>
            <span className={classes.emoji}>{emoji}</span>
          </footer>
        </div>
      </div>
    );
	}
}

export default withStyles(styles)(Palette);

