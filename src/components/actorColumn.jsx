/* eslint-disable */

import React from "react";
import PropTypes from 'prop-types';
require('bootstrap');

import { postRequest } from "../services/requests";
import "../css/game.css";
import Modal from './modal';

const anonymousPic = "../../public/anonymous.jpg";

class ActorColumn extends React.Component{

	constructor(props){	
		super(props);

		this.state = {
			hasSubmitted: false,
			input: '',
			showModal: false,
		}
		this.renderOriginTarget = this.renderOriginTarget.bind(this);
		this.renderInputActor = this.renderInputActor.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.searchActor = this.searchActor.bind(this);

		this.submitActor = this.submitActor.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	handleInput(e){
		const { target : { value } } = e;
		this.setState({
			input: value
		});
	}

	async closeModal(){
		this.setState({
			showModal: false,
		});
	}

	async searchActor(){
		const {input} = this.state;
		console.log('sending actor input: ',input);

		if(input){
			//make a post request. THEN show the modal 
			let url = 'https://movie-lynx-backend.herokuapp.com/puzzle/searchActor';
			let body = { 
				actor: this.state.input
			}; 
			let config = {
				headers: {
					'Access-Control-Allow-Origin': '*',
					crossdomain: true,
				}
			};
			let results = await postRequest( url, body);
			console.log('here are the results of the search for actor: ');
			console.log(results);

			this.setState({
				showModal: true,
			});
		}
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
	          	<input
	          		type="text"
	                className="actor-name"
	                placeholder="Actor/Actress name"
	                size="20"
	                id="actor-{{this.target.idx}}"
	                data-actor-name="{{this.target.name}}"
	                onChange={this.handleInput}
	                onBlur={this.handleInput}
	                value={this.state.input}
                />
	            <button
	            	className="modalBtn buttons"
	            	onClick={this.searchActor}
	            >
	            	Search for Actor/Actress
	            </button>
        	</div>
		);
	}


	//completed after the user slects an actor

	async submitActor(){
		let findActor = '';
		let obj = {
			actor: this.state.input,
		}


		//result from search? h m m
		let testId = 100;
		let testName = 'Bill Murray';
		let testPath = '/billMurray';

		//changes Game state
		const {setSubmitData, groupId  } = this.props;
		await setSubmitData(groupId, testId, testName, testPath );

		//Changes actor state 
		await this.setState({input: this.props.name});
		await this.closeModal();
	}

	render(){
		let testEle = (
			<button 
			onClick={this.submitActor}>
				Replace with Bill Murray
			</button>

		);
		const {isOriginTargetActor, imgPath, name} = this.props;
		if(this.state.showModal){
			return (
				<Modal
					children={testEle}
					showModal={this.state.showModal}
					shutModal={this.closeModal}
				/>
			);
		}
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

