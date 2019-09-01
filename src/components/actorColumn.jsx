/* eslint-disable */


import React from "react";
import PropTypes from 'prop-types';

import "../css/game.css";

const anonymousPic = "../../public/anonymous.jpg";

class ActorColumn extends React.Component{

	constructor(props){	
		super(props);
		this.renderOriginTarget = this.renderOriginTarget.bind(this);
		this.renderInputActor = this.renderInputActor.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(){
		event.preventDefault();
    	const form = event.target;
    	const data = new FormData(form);
    	console.log(data);
	}

	renderOriginTarget(imgPath, name){
		let imgStyle = {
			'backgroundImage': `url('https://image.tmdb.org/t/p/w1280/${imgPath})`};
		return(
			<div className="actor-container">
	          <div className="img-container">
	            <div
	              className="img-inner-container actor-profile"
	              style={imgStyle}>
	            </div>
	          </div>
	          	<hr />
		         <label className="actor-names">
		         	{name}
		         </label>
        	</div>
		);
	}

	renderInputActor(imgPath, name){
		let imgStyle = {
			'backgroundImage': `url(${imgPath})`};
		return(
			<div className="actor-container">
	          <div className="img-container">
	            <div
	              className="img-inner-container actor-profile"
	              style={imgStyle}>
	            </div>
	          </div>
	          	<hr />

	          	<form onSubmit={this.onSubmit}>
		          	<input
		          		type="text"
		                className="actor-name"
		                placeholder="Actor/Actress name"
		                size="20"
		                id="actor-{{this.target.idx}}"
		                data-actor-name="{{this.target.name}}"
	                />
		            <button
		            	className="modalBtn buttons" 
		            >
		            	Search for Actor/Actress
		            </button>
	          	</form>
	          	
        	</div>
		);
	}

	render(){
		const {isOriginTargetActor, imgPath, name} = this.props;
		if(isOriginTargetActor){
			return (
				<React.Fragment>
					{this.renderOriginTarget()}
				</React.Fragment>
			);
		}
		return (
			<React.Fragment>
				{this.renderInputActor(imgPath, name)}
			</React.Fragment>
		);
	}

}


ActorColumn.propTypes = {
  groupId: PropTypes.number.isRequired,
  isOriginTargetActor: PropTypes.bool.isRequired,
  actorId: PropTypes.number.isRequired,
  picturePath: PropTypes.string,
  name: PropTypes.string,
  setSubmitData: PropTypes.func,
};

ActorColumn.defaultProps = {
	picturePath: anonymousPic,
	name: 'Select an Actor/Actress',
	setSubmitData: ()=>{},
};

export default ActorColumn;

/**


Thumbnail 
HR element 
Input 

*/

