import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './ColorBox.css';
export default function ColorBox(props) {
	const { name, background } = props;
	return (
		<div style={{ background }} className="ColorBox">
			<div className="box-container">
				<span>{name}</span>
			</div>
            <CopyToClipboard text={background}>
				<button className="copy-button"> Copy</button>
			</CopyToClipboard>
			<span className="see-more">More</span>
		</div>
	);
}
