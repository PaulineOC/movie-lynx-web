import React from 'react';
//import PropTypes from 'prop-types';
import axios from 'axios';
import ActorColumn from '../components/actorColumn.jsx';
import MovieColumn from '../components/movieColumn.jsx';

import { getRequest } from "../services/requests";
import {Container, Row, Button, Col} from 'react-bootstrap';
import link from '../images/link.jpg';

require('bootstrap');

const config = {
	headers: {
		'Access-Control-Allow-Origin': '*',
		crossdomain: true,
	}
};

class Game extends React.Component{

	puzzle = [
		{
			movie: {
				movieId: 0,
				movieMdbId:111,
				name: 'Inception',
				posterPath: `/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg`,
			},
			origin: {
				actorId: 0,
				actorMdbId: 0 ,
				name: `Ken Watanabe`,
				profilePath: `/v8WQ5wCIZsnqVZn7jQveaDqurox.jpg`,
			},
			target: {
				actorId: 1,
				actorMdbId: 1,
				name: 	`Leonardo Di Caprio`,
				profilePath: `/aLUFp0zWpLVyIOgY0scIpuuKZLE.jpg`,
			},
		},
		{
			movie: {
				movieId: 2,
				movieMdbId: 222,
				name: 'Revolutionary Road',
				posterPath: `/bnOK1lmdlqdy2HX6IgKx9TQD7Ax.jpg`,
			},
			origin: {
				actorId: 1,
				actorMdbId: 1,
				name: 	`Leonardo Di Caprio`,
				profilePath: `/aLUFp0zWpLVyIOgY0scIpuuKZLE.jpg`,
			},
			target: {
				actorId: 2,
				actorMdbId: 2,
				name: 	`Kate Winslet`,
				profilePath: `/4dnurP9Szr9y6S3nTkd3pHUQg5b.jpg`,
			},
		},
		{
			movie: {
				movieId: 3,
				movieMdbId: 333,
				name: 'Revolutionary Road',
				posterPath: `/bnOK1lmdlqdy2HX6IgKx9TQD7Ax.jpg`,
			},
			origin: {
				actorId: 2,
				actorMdbId: 3,
				name: 	`Kate Winslet`,
				profilePath: `/4dnurP9Szr9y6S3nTkd3pHUQg5b.jpg`,
			},
			target: {
				actorId: 3,
				actorMdbId: 3,
				name: 	`Cameron Diaz`,
				profilePath: `/xCFLBW1OM3AfgS12sqJX3NjSPSA.jpg`,
			},
		},
	];

	testAns = [
		{
			movie: {
				movieId: 0,
				movieMdbId:111,
				name: 'Inception',
				posterPath: `/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg`,
				correct: true,
				explanation: "This movie is correct",
			},
			origin: {
				actorId: 0,
				actorMdbId: 0 ,
				name: `Ken Watanabe`,
				profilePath: `/v8WQ5wCIZsnqVZn7jQveaDqurox.jpg`,
			},
			target: {
				actorId: 1,
				actorMdbId: 1,
				name: 	`Leonardo Di Caprio`,
				profilePath: `/aLUFp0zWpLVyIOgY0scIpuuKZLE.jpg`,
				correct: false,
				explanation: "This actor is wrong?",
			},
		},
		{
			movie: {
				movieId: 2,
				movieMdbId: 222,
				name: 'Revolutionary Road',
				posterPath: `/bnOK1lmdlqdy2HX6IgKx9TQD7Ax.jpg`,
				correct: true,
				explanation: "This movie is correct!",

			},
			origin: {
				actorId: 1,
				actorMdbId: 1,
				name: 	`Leonardo Di Caprio`,
				profilePath: `/aLUFp0zWpLVyIOgY0scIpuuKZLE.jpg`,
				correct: false,
				explanation: "Actor is wrong",
			},
			target: {
				actorId: 2,
				actorMdbId: 2,
				name: 	`Kate Winslet`,
				profilePath: `/4dnurP9Szr9y6S3nTkd3pHUQg5b.jpg`,
				correct: true,
				explanation: "Actor is correct! ",
			},
		},
		{
			movie: {
				movieId: 3,
				movieMdbId: 333,
				name: 'Revolutionary Road',
				posterPath: `/bnOK1lmdlqdy2HX6IgKx9TQD7Ax.jpg`,
				correct: false,
				explanation: "This movie is wrong",
			},
			origin: {
				actorId: 2,
				actorMdbId: 3,
				name: 	`Kate Winslet`,
				profilePath: `/4dnurP9Szr9y6S3nTkd3pHUQg5b.jpg`,
				correct: false,
				explanation: "Since movie is wrong, actor is wrong",
			},
			target: {
				actorId: 3,
				actorMdbId: 3,
				name: 	`Cameron Diaz`,
				profilePath: `/xCFLBW1OM3AfgS12sqJX3NjSPSA.jpg`,
			},
		},
	];

	testSolution = [
		{
			movie: {
				movieId: 0,
				movieMdbId:111,
				name: 'Inception',
				posterPath: `/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg`,
				correct: true,
				explanation: "This movie is correct",
			},
			origin: {
				actorId: 0,
				actorMdbId: 0 ,
				name: `Ken Watanabe`,
				profilePath: `/v8WQ5wCIZsnqVZn7jQveaDqurox.jpg`,
			},
			target: {
				actorId: 1,
				actorMdbId: 1,
				name: 	`Leonardo Di Caprio `,
				profilePath: `/aLUFp0zWpLVyIOgY0scIpuuKZLE.jpg`,
				correct: false,
				explanation: "This actor is wrong?",
			},
		},
		{
			movie: {
				movieId: 2,
				movieMdbId: 222,
				name: 'Revolutionary Road',
				posterPath: `/bnOK1lmdlqdy2HX6IgKx9TQD7Ax.jpg`,
				correct: true,
				explanation: "This movie is correct!",

			},
			origin: {
				actorId: 1,
				actorMdbId: 1,
				name: 	`Leonardo Di Caprio`,
				profilePath: `/aLUFp0zWpLVyIOgY0scIpuuKZLE.jpg`,
				correct: false,
				explanation: "Actor is wrong",
			},
			target: {
				actorId: 2,
				actorMdbId: 2,
				name: 	`Kate Winslet`,
				profilePath: `/4dnurP9Szr9y6S3nTkd3pHUQg5b.jpg`,
				correct: true,
				explanation: "Actor is correct! ",
			},
		},
		{
			movie: {
				movieId: 3,
				movieMdbId: 333,
				name: 'The Holiday',
				posterPath: `/ixNtpuq8OVp4IckgzkSJIflFDkw.jpg`,
				correct: false,
				explanation: "This movie is wrong",
			},
			origin: {
				actorId: 2,
				actorMdbId: 3,
				name: 	`Kate Winslet`,
				profilePath: `/4dnurP9Szr9y6S3nTkd3pHUQg5b.jpg`,
				correct: false,
				explanation: "Since movie is wrong, actor is wrong",
			},
			target: {
				actorId: 3,
				actorMdbId: 3,
				name: 	`Cameron Diaz`,
				profilePath: `/xCFLBW1OM3AfgS12sqJX3NjSPSA.jpg`,
			},
		},
	];

	constructor(props){
		super(props);

		//TODO: the getting of the puzzle and setting state will be moved to componentDidMount eventually and reference correct results

		const originalPuzzle = this.puzzle.splice();
		let firstActor = this.puzzle[0].origin;
		let lastActor = this.puzzle[this.puzzle.length-1].target;

		let puzzleEmptied = this.puzzle.map((item, indx) =>{
			return {
				movie: {
					movieId: indx,
					movieMdbId:null,
					name: null,
					picturePath: null,
				},
				origin: {
					actorId: null,
					actorMdbId: null,
					name: null,
					picturePath: null,
				},
				target: {
					actorId: null,
					actorMdbId: null,
					name: null,
					picturePath: null,
				},
			};
		});

		puzzleEmptied[0].origin = firstActor;
		puzzleEmptied[puzzleEmptied.length-1].target = lastActor;

		this.state = {
			puzzle: puzzleEmptied,
			showAnswer: this.props.showAnswer,
			answer: originalPuzzle,
			showFeedback: false,
			isSolution: false,
		};
		this.renderGameData = this.renderGameData.bind(this);
		this.renderButtons = this.renderButtons.bind(this);

		this.selectActor = this.selectActor.bind(this);
		this.setActorMdId = this.setActorMdId.bind(this);
		this.setActorPictureAndName = this.setActorPictureAndName.bind(this);

		this.setMovie = this.setMovie.bind(this);
		this.setMovieMdId = this.setMovieMdId.bind(this);
		this.setMoviePictureAndName = this.setMoviePictureAndName.bind(this);

		this.submitAnswer = this.submitAnswer.bind(this);
		this.showSolution = this.showSolution.bind(this);
		this.restartGame = this.restartGame.bind(this);
	}

	async componentDidMount(){

			//make a get request to get puzzle
			let url = 'https://movie-lynx-backend.herokuapp.com/puzzle/';
			let config = {
				headers: {
					'Access-Control-Allow-Origin': '*',
					crossdomain: true,
				}
			};
	}

	async selectActor(groupIndx, mdId, name, path){
		await this.setActorMdId(groupIndx, mdId);
		await this.setActorPictureAndName(groupIndx, name, path);
		console.log('done with select actor here state:', this.state);
	}

	async setActorMdId(groupIndx, mdId){
		const newPuzzle = this.state.puzzle.slice();
		newPuzzle[groupIndx].origin.actorMdbId= mdId;
		newPuzzle[groupIndx-1].target.actorMdbId = mdId;
		this.setState({puzzle: newPuzzle});
	}

	async setActorPictureAndName(groupIndx, name, path){
		const newPuzzle = this.state.puzzle.slice();
		newPuzzle[groupIndx].origin.name= name;
		newPuzzle[groupIndx-1].target.name = name;
		newPuzzle[groupIndx].origin.profilePath = path;
		newPuzzle[groupIndx-1].target.profilePath = path;
		this.setState({puzzle: newPuzzle});
	}

	async setMovie(groupIndx, mdId, name, path){
		await this.setMovieMdId(groupIndx, mdId);
		await this.setMoviePictureAndName(groupIndx, name, path);
		console.log('done with select movie here state:', this.state);
	}

	async setMovieMdId(groupIndx, mdId){
		const newPuzzle = this.state.puzzle.slice();
		newPuzzle[groupIndx].movie.movieMdbId = mdId;
		this.setState({puzzle: newPuzzle});
	}

	async setMoviePictureAndName(groupIndx, name, path){
		const newPuzzle = this.state.puzzle.slice();
		newPuzzle[groupIndx].movie.name= name;
		newPuzzle[groupIndx].movie.posterPath= path;
		this.setState({puzzle: newPuzzle});	
	}

	renderGameData(data, showFeedback, isSolution){
		let toDisplay = [];
		data.forEach((group, index) =>{
			toDisplay.push(
				<Col xs={true} sm={true} md={true} lg={true} xl={true}>
					<ActorColumn
						key = {`OriginID-${index}`}
						groupId = {index}
						isOriginTargetActor = {index===0}
						actorId={group.origin['actorId']}
						picturePath = {group.origin['profilePath']}
						name = {group.origin['name']}
						setSubmitData= {this.selectActor}

						isFeedback={showFeedback}
						isSolution={isSolution}
						isCorrect={group.origin.correct ? group.origin.correct : null}
						explanation={group.origin.explanation ? group.origin.explanation : null}
					/>
				</Col>
			);
			toDisplay.push(
				<Col xs={true} sm={true} md={true} lg={true} xl={true}>
					<div className="link-container">
						<img src={link} className="img-fluid" />
					</div>
					<MovieColumn
						key = {`MovieId-${index}`}
						groupId = {index} 
						movieId = {group.movie['movieId']}
						picturePath = {group.movie['posterPath']}
						name = {group.movie['name']}
						setSubmitData = {this.setMovie}

						isFeedback={showFeedback}
						isSolution={isSolution}
						isCorrect={group.movie.correct ? group.movie.correct : null}
						explanation={group.movie.explanation ? group.movie.explanation : null}
					/>
				</Col>
			);
			if(index === data.length - 1){
				toDisplay.push(
					<Col xs={true} sm={true} md={true} lg={true} xl={true}>
						<ActorColumn
							key = {`TargetId-${index}`}
							groupId = {index}
							isOriginTargetActor = {true}
							actorId={group.target['actorId']}
							picturePath = {group.target['profilePath']}
							name = {group.target['name']}
							isSolution={isSolution}
						/>
					</Col>
				);
			}
		});
		return toDisplay;
	}

	async submitAnswer(){
		const {puzzle} = this.state;
		let url = (process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://movie-lynx-backend.herokuapp.com') + '/check';

		let body = {
			submittedPuzzle: puzzle,
		}

		//TODO: To connect to the backend, please uncomment lines below: 

		// axios.post(url, body, config).then((res) =>{
		// 	const {data} = res;
		// 	//console.log(res);
		// 	console.log('here are the results from submitting puzzle', data);
		// 	this.setState({
		// 		puzzle : data,
		// 		showFeedback: true,
		// 	});
		// }).catch((err) =>{
		// 	console.log(err);
		// 	return err;
		// });

		/*
			TODO
			If connecting to the backend, please move this next setState to the THEN of the axios.post! 
			Please change the variable this.testAns to res.data 
		*/
		this.setState({
				puzzle : this.testAns,
				showFeedback: true,
		});
	}

	showSolution(){
		//TODO: remove line 451 completely to use real data that will be set in componentDidMount
		this.setState({
			isSolution: true,
			answer: this.testSolution,
		});
	}

	restartGame(){
		window.location.reload();
	}

	renderButtons(isSolution, showFeedback){
		if(isSolution){
			return(
				<Button onClick={this.restartGame} variant="danger">
					Restart Game
				</Button>
			);
		}
		else if(showFeedback){
			return(
			<Button onClick={this.showSolution} variant="secondary">
				Show original answer!
			</Button>
		);

		}
		return(
			<Button onClick={this.submitAnswer} variant="primary">
				Submit answer!
			</Button>
		);
	}

	render(){
		const { puzzle, answer, showFeedback, isSolution } = this.state;
		let data = isSolution ? answer : puzzle;
		return (
			<Container fluid={true}>
				<Row>
					{this.renderGameData(data, showFeedback, isSolution)}
				</Row>
				<Row className="justify-content-md-center">
					{this.renderButtons(isSolution, showFeedback)}
				</Row>
			</Container>
		);
	}
}

export default Game;