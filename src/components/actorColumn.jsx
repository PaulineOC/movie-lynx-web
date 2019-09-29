/* eslint-disable */
import React from "react";
import PropTypes from 'prop-types';
import dotenv from 'dotenv';

import "../css/game.css";
import '../css/actorColumn.css';
import {searchActors} from '../services/helpers';
import SearchTable from './searchTable';
import {Card, Button, Container, Row, Col, InputGroup, FormControl, Modal} from 'react-bootstrap';
import anonymous from '../images/anonymous.png'

dotenv.config();

const baseProfileUrl = "https://image.tmdb.org/t/p/original";

class ActorColumn extends React.Component{

	constructor(props){	
		super(props);

		this.state = {
			input: '',
			show: false,
			searchResults: [],
			invalidQuery: false,
		}
		this.renderOriginTarget = this.renderOriginTarget.bind(this);
		this.renderInputActor = this.renderInputActor.bind(this);
		this.renderPostGameData = this.renderPostGameData.bind(this);
		this.handleInput = this.handleInput.bind(this);

		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.submitActor = this.submitActor.bind(this);
		this.searchActorsHandler = this.searchActorsHandler.bind(this); 
		this.validateInput = this.validateInput.bind(this);
	}

	async validateInput() {
		const {input} = this.state;
		const invalidQuery = input ? false : true;
		await this.setState({invalidQuery: invalidQuery})
		return invalidQuery;
	}

	async searchActorsHandler() {
		const {input} = this.state;
		const results = await searchActors(input);
		this.setState({searchResults : results});
	}

	componentWillMount(){
		this.setState({
			showModal: false,
		});
	}

	renderOriginTarget(imgPath, name, isSolution){
		return(
			<Card bg={isSolution ? "secondary" : "light"}>
				<Card.Img variant="top" src={`${baseProfileUrl}${imgPath}`}/>
				<Card.Body>
					<Card.Title>{name}</Card.Title>
				</Card.Body>
			</Card>
		);
	}

	renderInputActor(imgPath, name){
		const {input, invalidQuery} = this.state;
		const {alert} = this.props;
		return(
			<Card bg="light" border={alert ? "danger" : "secondary"}>
				<Card.Img variant="top" src={imgPath ? `${baseProfileUrl}${imgPath}` : anonymous} />
				<Card.Body className="text-center">
					<b>{name}</b>
					<InputGroup className="mb-3">
						<FormControl 
							type="text" 
							placeholder="Name" 
							onChange={this.handleInput}
							value={this.state.input}
							size="sm"
							isInvalid={invalidQuery}
						/>
						<InputGroup.Append>
					     	<Button onMouseDown={this.showModal} variant="outline-secondary" size="sm">	            	
				            	<i className="fa fa-search"/>
			            	</Button>
						</InputGroup.Append>
					</InputGroup>
				</Card.Body>
			</Card>
		);
	}

	renderPostGameData(isSolution, imgPath, name, isCorrect, explanation){
		return(
			<Card bg={isSolution ? "secondary" : (isCorrect ? "success" : "danger")}>
				<Card.Img variant="top" src={`${baseProfileUrl}${imgPath}`}/>
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


	handleInput(e){
		const { target : { value } } = e;
		this.setState({
			input: value
		});
	}

	renderModal() {
		const {input, show, searchResults} = this.state;
		return (
			<Modal show={show} size='lg' centered onHide={this.hideModal} onEntering={this.searchActorsHandler} scrollable>
				<Modal.Header closeButton>
					<Modal.Title>{input}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<SearchTable searchResults={searchResults} isActor selector={this.submitActor} hideModal={this.hideModal}>
					</SearchTable>
				</Modal.Body>
			</Modal>
		);
	}

	async showModal(){
		let invalidQuery = await this.validateInput();
		if (invalidQuery) {
			return;
		}
		await this.setState({
			show: true,
		});
	}

	async hideModal(){
		this.setState({
			show: false,
		});
	}

	async getActors(actorQuery) {
		return await searchActors(actorQuery);
	}

	async submitActor(imgPath, name, mdbId){
		const {setSubmitData, groupId} = this.props;
		await setSubmitData(groupId, mdbId, name, imgPath);
	}

	render(){
		const {isOriginTargetActor, picturePath, name, isFeedback, isSolution, isCorrect, explanation} = this.props;
		
		if(isOriginTargetActor){
			return (
				<React.Fragment>
					{this.renderOriginTarget(picturePath, name, isSolution)}
				</React.Fragment>
			);
		}
		else if(isFeedback){
			return (
				<React.Fragment>
					{this.renderPostGameData(isSolution, picturePath, name, isCorrect, explanation)}
				</React.Fragment>
			);
		}
		else {
			return (
				<React.Fragment>
					{this.renderInputActor(picturePath, name)}
					{this.renderModal()}
				</React.Fragment>
			);
		}
	}

}

ActorColumn.propTypes = {
	groupId: PropTypes.number.isRequired,
	isOriginTargetActor: PropTypes.bool,
	actorId: PropTypes.number,
	picturePath: PropTypes.string,
	name: PropTypes.string,
	setSubmitData: PropTypes.func,
	isFeedback: PropTypes.bool,
	isSolution: PropTypes.bool,
	correct: PropTypes.bool,
	explanation: PropTypes.string,
};

ActorColumn.defaultProps = {
	picturePath: null,
	name: 'Select an Actor/Actress',
	setSubmitData: ()=>{},
	isFeedback: false,
	isSolution: null,
	correct: null,
	explanation: '',

};

export default ActorColumn;