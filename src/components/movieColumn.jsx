import React from "react";
import PropTypes from 'prop-types';
import dotenv from 'dotenv';

import "../css/game.css";
import SearchTable from './searchTable';
import Modal from './modal';

dotenv.config();


class MovieColumn extends React.Component{

	constructor(props){	
		super(props);
		this.state = {
			input: '',
			showModal: false,
		}

		this.renderInputMovie = this.renderInputMovie.bind(this);
		this.handleInput = this.handleInput.bind(this);

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.submitMovie = this.submitMovie.bind(this);
	}

	componentWillMount(){
		this.setState({
			showModal: false,
		});
	}

	renderInputMovie(imgPath, name){
		let imgStyle = {
			'backgroundImage': `url(${imgPath})`};
		return(
			<React.Fragment>
				<div className="actor-container">
		            <div className="img-container">
		              <div className="img-inner-container chainlink" style={imgStyle}>
		              </div>
		            </div>
	            	<input
	            		type="text"
	            		className="movie-name"
	            		placeholder="Movie name"
	            		size="20"
	            		onChange={this.handleInput}
	            		onBlur={this.handleInput}
	            		value={this.state.input}
		            />
		            <button
	            	className="modalBtn buttons"
	            	onMouseDown={this.openModal}
	            	>
	            		Search for Movie
                	</button>
	          </div>
			</React.Fragment>
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
							isActor={false}
							queryString={input}
							selector={this.submitMovie}
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

	async submitMovie(imgPath, name, mdbId){

		const {setSubmitData, groupId} = this.props;
		await setSubmitData(groupId, mdbId, name, imgPath );

		await this.setState({input: this.props.name});
		await this.closeModal();
	}


	render(){
		const {imgPath, name} = this.props;

		if(this.state.showModal){
			return this.showModal();
		}
		return (
			<React.Fragment>
				{this.renderInputMovie(imgPath, name)}
			</React.Fragment>
		);
	}

}

MovieColumn.propTypes = {
	groupId: PropTypes.number.isRequired,
	movieId: PropTypes.number,
	name: PropTypes.string,
	setSubmitData: PropTypes.func,
};

MovieColumn.defaultProps = {
	name: 'Select a Movie',
	setSubmitData: ()=>{},
};

export default MovieColumn;