import React from 'react';
import './ColorBox.css';
export default function ColorBox(props) {
	const { name, background } = props;
	return (
		<div style={{ background }} className="ColorBox">
				<div className="box-container">
					<span>{name}</span>
				</div>
                <button className="copy-button"> Copy</button>
            <span className="see-more">More</span>
		</div>
	);
}
