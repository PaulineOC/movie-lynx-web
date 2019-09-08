/* eslint-disable */
import React from "react";
import PropTypes from 'prop-types';
import dotenv from 'dotenv';

import "../css/game.css";
import Modal from './modal';
import SearchTable from './searchTable';

dotenv.config();


const anonymousPic = "../../public/anonymous.jpg";

class ActorColumn extends React.Component{

	constructor(props){	
		super(props);

		this.state = {
			input: '',
			showModal: false,
		}
		this.renderOriginTarget = this.renderOriginTarget.bind(this);
		this.renderInputActor = this.renderInputActor.bind(this);
		this.handleInput = this.handleInput.bind(this);

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.submitActor = this.submitActor.bind(this);
	}

	componentWillMount(){
		this.setState({
			showModal: false,
		});
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
	                onChange={this.handleInput}
	                onBlur={this.handleInput}
	                value={this.state.input}
                />
	            <button
	            	className="modalBtn buttons"
	            	onMouseDown={this.openModal}
	            >
	            	Search for Actor/Actress
	            </button>
        	</div>
		);
	}

	handleInput(e){
		const { target : { value } } = e;
		this.setState({
			input: value
		});
	}

	showModal(){
		const {showModal, input} = this.state;
		if(input){
			return(
				<React.Fragment>
					<Modal
						shutModal={this.closeModal}
					>
						<SearchTable
							isActor={true}
							queryString={input}
							selector={this.submitActor}
						/>
					</Modal>
				</React.Fragment>
			);

		}
	}

	async openModal(){
		await this.setState({
				showModal: true,
		});
	}

	async closeModal(){
		this.setState({
			showModal: false,
		});
	}

	async submitActor(imgPath, name, mdbId){
		const {setSubmitData, groupId} = this.props;
		await setSubmitData(groupId, mdbId, name, imgPath );

		await this.setState({input: this.props.name});
		await this.closeModal();
	}

	render(){
		const {isOriginTargetActor, imgPath, name} = this.props;
		if(this.state.showModal){
			return this.showModal();
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
  isOriginTargetActor: PropTypes.bool,
  actorId: PropTypes.number,
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

