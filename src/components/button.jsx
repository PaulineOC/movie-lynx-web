import React from 'react';
import '../css/button.css'

require('bootstrap');

const button = props => (
   <button className="our_button" onClick={props.onClick}>
      {props.label}
   </button>
);

export default button;