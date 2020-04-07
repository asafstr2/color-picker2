import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from "chroma-js"
import './ColorBox.css';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    ColorBox: {
        width: "20%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between"
    },
    copy_button: {
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
        opacity: "0",
        cursor: "pointer"
    },
	copy_button_single: { marginBottom: "50%" },
	
	ColorBox_hover__copy_button: { opacity: "1", transition: "0.5s" },
	
	
    copy_button_hover: {
        background: "rgba(255, 255, 255, 0.712)",
        transition: "0.2s"
    },
    box_container: {
        fontSize: "1.05rem",
        textTransform: "uppercase",
        letterSpacing: "1px"
    },
    light_text: { color: "White" },
    ColorBox__dark_text: { color: "rgba(0,0,0,0.5)" },
    see_more: {
        alignSelf: "flex-end",
        width: "5rem",
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
        opacity: "0"
    },
    ColorBox_hover__see_more: { opacity: "1", transition: "1s" },
    flexbox_fix: { display: "flex", flexDirection: "row-reverse", width: "100%" },
    see_more_hover: {
        background: "rgba(255, 255, 255, 0.712)",
        transition: "0.2s"
    },
    copy_overley: {
        position: "fixed",
        visibility: "hidden",
        zIndex: "0",
        overflow: "hidden"
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
        overflow: "hidden"
    },
    copy_msg: {
        position: "fixed",
        visibility: "hidden",
        transform: "scale(0.1)",
        overflow: "hidden"
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
        overflow: "hidden"
    },
    copy_msg_true_h1: {
        width: "100vw",
        background: "rgba(255, 255, 255, 0.212)",
        textAlign: "center",
        color: "white",
        fontSize: "5rem",
        letterSpacing: "1px",
        lineHeight: "150px",
        textTransform: "uppercase",
        textShadow: "1px 2px 2px black"
    },
    copy_msg_true_p: {
        width: "100vw",
        textAlign: "center",
        color: "white",
        fontSize: "2rem",
        letterSpacing: "1px",
        lineHeight: "150px",
        fontWeight: "100"
    }
};


function ColorBox(props) {
	const [copied, setCopied] = useState(false);
	const { name, background, colorId, paletteId ,classes} = props;
	const isDarkColor = (chroma(background).luminance()) <= 0.08;
	const isLightColor = (chroma(background).luminance()) >= 0.6;

	let more = paletteId &&
		<Link to={`/palette/${paletteId}/${colorId}`} style={{ textDecoration: 'none' }}>
			<span className={`see-more ${isLightColor && "dark-text"}`}>More </span>
		</Link>



	return (
		<div style={{ background }} className="ColorBox">
			<div className="box-container">
				<span className={isDarkColor && "light-text"} >{name}</span>
			</div>
			<CopyToClipboard
				text={background}
				onCopy={() => {
					setCopied(true);
					setTimeout(() => setCopied(false), 1500);
				}}
			>
				<button className={`copy-button ${paletteId || "copy-button-single"} ${isLightColor && "dark-text"}`}> Copy</button>
			</CopyToClipboard>
			{more}

			<div style={{ background }} className={`${!copied ? 'copy-overley' : 'copy-overley-true'}`} />

			<div className={`${!copied ? 'copy-msg' : 'copy-msg-true'}`}>
				<h1 className={isLightColor && "dark-text"}>Copied!</h1>
				<p className={isLightColor && "dark-text"} >{background}</p>
			</div>
		</div>
	);
}

export default withStyles(styles)(ColorBox);