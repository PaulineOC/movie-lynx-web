import React from "react";
import PropTypes from 'prop-types';
import dotenv from 'dotenv';

import "../css/game.css";
import SearchTable from './searchTable';
import {Card, InputGroup, FormControl, Button, Modal} from 'react-bootstrap';
import poster from '../images/poster.png';
import {searchMovies} from '../services/helpers'

dotenv.config();
const basePosterUrl = 'https://image.tmdb.org/t/p/original';

class MovieColumn extends React.Component{

	constructor(props){	
		super(props);
		this.state = {
			input: '',
			show: false,
			searchResults: []
		}

		this.renderModal = this.renderModal.bind(this);
		this.renderInputMovie = this.renderInputMovie.bind(this);
		this.renderPostGameData = this.renderPostGameData.bind(this);
		this.handleInput = this.handleInput.bind(this);

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.submitMovie = this.submitMovie.bind(this);
		this.searchMoviesHandler = this.searchMoviesHandler.bind(this);
		this.renderMovieColumn = this.renderMovieColumn.bind(this);
	}

	async searchMoviesHandler() {
		const {input} = this.state;
		const results = await searchMovies(input);
		this.setState({searchResults : results});
	}

	renderInputMovie(imgPath, name){
		return(
			<Card border="light" bg="light">
				<Card.Img src={imgPath ? `${basePosterUrl}${imgPath}` : poster}/>
				<Card.Body className="text-center">
					<b>{name}</b>
					<InputGroup className="mb-3">
						<FormControl 
							type="text" 
							placeholder="Name" 
							onChange={this.handleInput}
							value={this.state.input}
							size="sm"
						/>
						<InputGroup.Append>
					     	<Button onMouseDown={this.openModal} variant="outline-secondary" size="sm">	            	
				            	<i className="fa fa-search"/>
			            	</Button>
						</InputGroup.Append>
					</InputGroup>
				</Card.Body>
			</Card>
		);
	}

	renderPostGameData(isSolution = false, imgPath, name, isCorrect, explanation){
		return(
			<Card bg={isSolution ? "secondary" : (isCorrect ? "success" : "danger")}>
				<Card.Img src={imgPath ? `${basePosterUrl}${imgPath}` : poster}/>
				<Card.Body>
					<Card.Title>{name}</Card.Title>
					{
						!isSolution && 
						<Card.Text>{explanation}</Card.Text>
					}
				</Card.Body>
			</Card>
		);
	}

	renderModal() {
		const {input, show, searchResults} = this.state;
		return (
			<Modal show={show} size='lg' centered onHide={this.closeModal} onEntering={this.searchMoviesHandler} scrollable>
				<Modal.Header closeButton>
					<Modal.Title>{input}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<SearchTable searchResults={searchResults} isActor={false} selector={this.submitMovie} hideModal={this.closeModal}>
					</SearchTable>
				</Modal.Body>
			</Modal>
		);
	}

	handleInput(e){
		const { target : { value } } = e;
		this.setState({
			input: value
		});
	}

	async openModal(){
		await this.setState({
			show: true,
		});
	}

	async closeModal(){
		this.setState({
			show: false,
		});
	}

	async submitMovie(imgPath, name, mdbId){
		const {setSubmitData, groupId} = this.props;
		await setSubmitData(groupId, mdbId, name, imgPath );
		await this.closeModal();
	}

	renderMovieColumn() {
		const {picturePath, name, isFeedback, isSolution, isCorrect, explanation} = this.props;

		if(isFeedback){
			return (
				<React.Fragment>
					{this.renderPostGameData(isSolution, picturePath, name, isCorrect, explanation)}
				</React.Fragment>
			);
		}
		
		return (
			<React.Fragment>
				{this.renderInputMovie(picturePath, name)}
				{this.renderModal()}
			</React.Fragment>
		);
	}

	render(){
		return this.renderMovieColumn();
	}

}

MovieColumn.propTypes = {
	groupId: PropTypes.number.isRequired,
	movieId: PropTypes.number,
	name: PropTypes.string,
	setSubmitData: PropTypes.func,
	isFeedback: PropTypes.bool,
	isSolution: PropTypes.bool,
	isCorrect: PropTypes.bool,
	explanation: PropTypes.string,
};

MovieColumn.defaultProps = {
	name: 'Select a Movie',
	setSubmitData: () => {},
	isFeedback: false,
	isSolution: false,
	isCorrect: null,
	explanation: '',

};

export default MovieColumn;