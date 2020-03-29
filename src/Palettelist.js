import React, { Component } from 'react';
 import {  Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import MiniPalette from './MiniPalette';
const styles = {

	root: {
		backgroundColor: "blue",
		height: "100vh",
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "center"
	},
	container: {
		width:"50%",
		display:"flex",
		alignItems:"flex-start",
		flexDirection:"column",
		flexWrap:"wrap",

},
	nav: {
		display:"flex",
		width:"100%",
		justifyContent:"space-between",
		collor:"white"
		},
	palette: {
		boxSizing:"border-box",
		width:"100%",
		display:"grid",
		gridTemplateColumns:"repeat(3,30%)",
		gridGap:"5%"
	}

}



class Palettelist extends Component {
	goToPalette(id){
		this.props.history.push(`/palette/${id}`)
	}

	render() {
		const { palette, classes } = this.props;

		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1>react color</h1>
					</nav>
					<div className={classes.palette}>
						{palette.map((palette) => <MiniPalette {...palette}  handleClick={()=>this.goToPalette(palette.id)}/>)}
					</div>
				</div>
			</div>
		);
	}
}


export default withStyles(styles)(Palettelist);