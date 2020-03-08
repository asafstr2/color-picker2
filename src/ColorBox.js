import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ColorBox.css';
export default function ColorBox(props) {
	const [ copied, setCopied ] = useState(false);

	const { name, background } = props;
	return (
        
		<div style={{ background }} className="ColorBox">
			
				<div className="box-container">
					<span>{name}</span>
				</div>
				<CopyToClipboard text={background} onCopy={() => setCopied(true)}>
					<button className="copy-button"> Copy</button>
				</CopyToClipboard>
                <div className="flexbox-fix">
				<span className="see-more">More</span>
                <div  style={{ background }} className={`${!copied?"copy-overley":"copy-overley-true"}`}><span>Copied</span></div>
                </div>
		</div>
	);
}
