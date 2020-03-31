import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import './ColorBox.css';
export default function ColorBox(props) {
	const [copied, setCopied] = useState(false);
	const { name, background, colorId, paletteId } = props;
	let more = paletteId &&
		<Link to={`/palette/${paletteId}/${colorId}`} style={{ textDecoration: 'none' }}>
			<span className="see-more">More</span>
		</Link>



	return (
		<div style={{ background }} className="ColorBox">
			<div className="box-container">
				<span>{name}</span>
			</div>
			<CopyToClipboard
				text={background}
				onCopy={() => {
					setCopied(true);
					setTimeout(() => setCopied(false), 1500);
				}}
			>
				<button className={`copy-button ${paletteId||"copy-button-single"}`}> Copy</button>
			</CopyToClipboard>
			{more}
			<div style={{ background }} className={`${!copied ? 'copy-overley' : 'copy-overley-true'}`} />

			<div className={`${!copied ? 'copy-msg' : 'copy-msg-true'}`}>
				<h1>Copied!</h1>
				<p>{background}</p>
			</div>
		</div>
	);
}
