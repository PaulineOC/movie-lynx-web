import React from 'react';
import '../css/header.css';

const Header = () => (
	<div id="header">
    <h2>
      <div className="flippedChar enlargedEmoji">
        <span role="img" aria-label="Lynx">🐆</span>
      </div>
      <div style={{display:'inline-block'}}>
         &nbsp;Movie Lynx&nbsp;
      </div>
      <div className="enlargedEmoji">
        <span role="img" aria-label="Lynx">🐆</span>
      </div>
    </h2>
  </div>
);

export default Header;