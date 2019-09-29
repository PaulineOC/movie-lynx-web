import React from 'react';
//import PropTypes from 'prop-types';
import axios from 'axios';
import ActorColumn from '../components/actorColumn.jsx';
import MovieColumn from '../components/movieColumn.jsx';

import {getPuzzle} from '../services/helpers';
import {Container, Row, Button, Col, Spinner} from 'react-bootstrap';
import link from '../images/link.jpg';

require('bootstrap');

const config = {
	headers: {
		'Access-Control-Allow-Origin': '*',
		crossdomain: true,
	}
};

class Game extends React.Component{

	testPuzzle = [
		{
			movie: {
				movieId: 0,
				movieMDBId:111,
				name: 'Inception',
				posterPath: `/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg`,
			},
			origin: {
				actorId: 0,
				actorMDBId: 0 ,
				name: `Ken Watanabe`,
				profilePath: `/v8WQ5wCIZsnqVZn7jQveaDqurox.jpg`,
			},
			target: {
				actorId: 1,
				actorMDBId: 1,
				name: 	`Leonardo Di Caprio`,
				profilePath: `/aLUFp0zWpLVyIOgY0scIpuuKZLE.jpg`,
			},
		},
		{
			movie: {
				movieId: 2,
				movieMDBId: 222,
				name: 'Revolutionary Road',
				posterPath: `/bnOK1lmdlqdy2HX6IgKx9TQD7Ax.jpg`,
			},
			origin: {
				actorId: 1,
				actorMDBId: 1,
				name: 	`Leonardo Di Caprio`,
				profilePath: `/aLUFp0zWpLVyIOgY0scIpuuKZLE.jpg`,
			},
			target: {
				actorId: 2,
				actorMDBId: 2,
				name: 	`Kate Winslet`,
				profilePath: `/4dnurP9Szr9y6S3nTkd3pHUQg5b.jpg`,
			},
		},
		{
			movie: {
				movieId: 3,
				movieMDBId: 333,
				name: 'Revolutionary Road',
				posterPath: `/bnOK1lmdlqdy2HX6IgKx9TQD7Ax.jpg`,
			},
			origin: {
				actorId: 2,
				actorMDBId: 3,
				name: 	`Kate Winslet`,
				profilePath: `/4dnurP9Szr9y6S3nTkd3pHUQg5b.jpg`,
			},
			target: {
				actorId: 3,
				actorMDBId: 3,
				name: 	`Cameron Diaz`,
				profilePath: `/xCFLBW1OM3AfgS12sqJX3NjSPSA.jpg`,
			},
		},
	];

	testAns = [
		{
			movie: {
				movieId: 0,
				movieMDBId:111,
				name: 'Inception',
				posterPath: `/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg`,
				correct: true,
				explanation: "This movie is correct",
			},
			origin: {
				actorId: 0,
				actorMDBId: 0 ,
				name: `Ken Watanabe`,
				profilePath: `/v8WQ5wCIZsnqVZn7jQveaDqurox.jpg`,
			},
			target: {
				actorId: 1,
				actorMDBId: 1,
				name: 	`Leonardo Di Caprio`,
				profilePath: `/aLUFp0zWpLVyIOgY0scIpuuKZLE.jpg`,
				correct: false,
				explanation: "This actor is wrong?",
			},
		},
		{
			movie: {
				movieId: 2,
				movieMDBId: 222,
				name: 'Revolutionary Road',
				posterPath: `/bnOK1lmdlqdy2HX6IgKx9TQD7Ax.jpg`,
				correct: true,
				explanation: "This movie is correct!",

			},
			origin: {
				actorId: 1,
				actorMDBId: 1,
				name: 	`Leonardo Di Caprio`,
				profilePath: `/aLUFp0zWpLVyIOgY0scIpuuKZLE.jpg`,
				correct: false,
				explanation: "Actor is wrong",
			},
			target: {
				actorId: 2,
				actorMDBId: 2,
				name: 	`Kate Winslet`,
				profilePath: `/4dnurP9Szr9y6S3nTkd3pHUQg5b.jpg`,
				correct: true,
				explanation: "Actor is correct! ",
			},
		},
		{
			movie: {
				movieId: 3,
				movieMDBId: 333,
				name: 'Revolutionary Road',
				posterPath: `/bnOK1lmdlqdy2HX6IgKx9TQD7Ax.jpg`,
				correct: false,
				explanation: "This movie is wrong",
			},
			origin: {
				actorId: 2,
				actorMDBId: 3,
				name: 	`Kate Winslet`,
				profilePath: `/4dnurP9Szr9y6S3nTkd3pHUQg5b.jpg`,
				correct: false,
				explanation: "Since movie is wrong, actor is wrong",
			},
			target: {
				actorId: 3,
				actorMDBId: 3,
				name: 	`Cameron Diaz`,
				profilePath: `/xCFLBW1OM3AfgS12sqJX3NjSPSA.jpg`,
			},
		},
	];

	testSolution = [
		{
			movie: {
				movieId: 0,
				movieMDBId:111,
				name: 'Inception',
				posterPath: `/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg`,
				correct: true,
				explanation: "This movie is correct",
			},
			origin: {
				actorId: 0,
				actorMDBId: 0 ,
				name: `Ken Watanabe`,
				profilePath: `/v8WQ5wCIZsnqVZn7jQveaDqurox.jpg`,
			},
			target: {
				actorId: 1,
				actorMDBId: 1,
				name: 	`Leonardo Di Caprio `,
				profilePath: `/aLUFp0zWpLVyIOgY0scIpuuKZLE.jpg`,
				correct: false,
				explanation: "This actor is wrong?",
			},
		},
		{
			movie: {
				movieId: 2,
				movieMDBId: 222,
				name: 'Revolutionary Road',
				posterPath: `/bnOK1lmdlqdy2HX6IgKx9TQD7Ax.jpg`,
				correct: true,
				explanation: "This movie is correct!",

			},
			origin: {
				actorId: 1,
				actorMDBId: 1,
				name: 	`Leonardo Di Caprio`,
				profilePath: `/aLUFp0zWpLVyIOgY0scIpuuKZLE.jpg`,
				correct: false,
				explanation: "Actor is wrong",
			},
			target: {
				actorId: 2,
				actorMDBId: 2,
				name: 	`Kate Winslet`,
				profilePath: `/4dnurP9Szr9y6S3nTkd3pHUQg5b.jpg`,
				correct: true,
				explanation: "Actor is correct! ",
			},
		},
		{
			movie: {
				movieId: 3,
				movieMDBId: 333,
				name: 'The Holiday',
				posterPath: `/ixNtpuq8OVp4IckgzkSJIflFDkw.jpg`,
				correct: false,
				explanation: "This movie is wrong",
			},
			origin: {
				actorId: 2,
				actorMDBId: 3,
				name: 	`Kate Winslet`,
				profilePath: `/4dnurP9Szr9y6S3nTkd3pHUQg5b.jpg`,
				correct: false,
				explanation: "Since movie is wrong, actor is wrong",
			},
			target: {
				actorId: 3,
				actorMDBId: 3,
				name: 	`Cameron Diaz`,
				profilePath: `/xCFLBW1OM3AfgS12sqJX3NjSPSA.jpg`,
			},
		},
	];

	constructor(props){
		super(props);
		
		this.state = {
			puzzle: [],
			showAnswer: this.props.showAnswer,
			answer: [],
			answerCorrect: null,
		};

		this.renderGameData = this.renderGameData.bind(this);
		this.renderButtons = this.renderButtons.bind(this);

		this.selectActor = this.selectActor.bind(this);
		this.setActorMdId = this.setActorMdId.bind(this);
		this.setActorPictureAndName = this.setActorPictureAndName.bind(this);

		this.setMovie = this.setMovie.bind(this);
		this.setMovieMdId = this.setMovieMdId.bind(this);
		this.setMoviePictureAndName = this.setMoviePictureAndName.bind(this);

		this.submitAnswer=this.submitAnswer.bind(this);
		this.setAlertForActor = this.setAlertForActor.bind(this);
		this.setAlertForMovie = this.setAlertForMovie.bind(this);
		this.showSolution = this.showSolution.bind(this);
		this.renderLoading = this.renderLoading.bind(this);
	}

	async componentWillMount(){
			
		const originalPuzzle = await getPuzzle();

		const copy = originalPuzzle.splice();
		let firstActor = originalPuzzle[0].origin;
		let lastActor = originalPuzzle[originalPuzzle.length-1].target;
		const puzzleEmptied = originalPuzzle.map((item, indx) =>{
		  return {
				movie: {
					movieIdx: indx,
					movieMDBId:null,
					name: null,
					picturePath: null,
					alert: false,
				},
				origin: {
					actorIdx: null,
					actorMDBId: null,
					name: null,
					picturePath: null,
					alert: false,
				},
				target: {
					actorId: null,
					actorMDBId: null,
					name: null,
					picturePath: null,
					alert: false,
				},
			};
		});
		puzzleEmptied[0].origin = firstActor;
		puzzleEmptied[puzzleEmptied.length-1].target = lastActor;

		this.setState({
			puzzle: puzzleEmptied,
			showAnswer: this.props.showAnswer,
			answer: originalPuzzle,
			showFeedback: false,
			isSolution: false,
		});
	}

	async selectActor(groupIndx, mdId, name, path){
		await this.setActorMdId(groupIndx, mdId);
		await this.setActorPictureAndName(groupIndx, name, path);
		await this.setAlertForActor(groupIndx, false);
	}

	async setActorMdId(groupIndx, mdId){
		const newPuzzle = this.state.puzzle.slice();
		newPuzzle[groupIndx].origin.actorMDBId= mdId;
		newPuzzle[groupIndx-1].target.actorMDBId = mdId;
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
		await this.setAlertForMovie(groupIndx, false);
	}

	async setMovieMdId(groupIndx, mdId){
		const newPuzzle = this.state.puzzle.slice();
		newPuzzle[groupIndx].movie.movieMDBId = mdId;
		this.setState({puzzle: newPuzzle});
	}

	async setMoviePictureAndName(groupIndx, name, path){
		const newPuzzle = this.state.puzzle.slice();
		newPuzzle[groupIndx].movie.name= name;
		newPuzzle[groupIndx].movie.posterPath= path;
		this.setState({puzzle: newPuzzle});	
	}

	async setAlertForMovie(groupIndx, alert) {
		const newPuzzle = this.state.puzzle.slice();
		newPuzzle[groupIndx].movie.alert = alert;
		this.setState({puzzle: newPuzzle});
	}

	async setAlertForActor(actorIdx, alert) {
		const newPuzzle = this.state.puzzle.slice();
		if (actorIdx === 0 || actorIdx === newPuzzle.length) {
			return;
		}
		newPuzzle[actorIdx].origin.alert = alert;
		newPuzzle[actorIdx-1].target.alert = alert;
		this.setState({puzzle: newPuzzle});
	}

  	renderGameData(data, showFeedback, isSolution){
  		if (data.length === 0) {
  			return (
  				<Col className="text-center">
  					{this.renderLoading()}
  				</Col>
  			);
  		}
		let toDisplay = [];
		data.forEach((group, index) =>{
			toDisplay.push(
				<Col xs={true} sm={true} md={true} lg={true} xl={true} key={`origin-${index}`}>
					<ActorColumn
						key = {`OriginID-${index}`}
						groupId = {index}
						isOriginTargetActor = {index===0}
						picturePath = {group.origin['profilePath']}
						name = {group.origin['name']}
						setSubmitData= {this.selectActor}
						isFeedback={showFeedback}
						isSolution={isSolution}
						isCorrect={group.origin.correct ? group.origin.correct : null}
						explanation={group.origin.explanation ? group.origin.explanation : null}
						alert={group.origin.alert} 
					/>
				</Col>
			);
			toDisplay.push(
				<Col xs={true} sm={true} md={true} lg={true} xl={true} key={`movie-${index}`}>
					<div className="link-container">
						<img src={link} className="img-fluid" />
					</div>
					<MovieColumn
						key = {`MovieId-${index}`}
						groupId = {index} 
						picturePath = {group.movie['posterPath']}
						name = {group.movie['name']}
						setSubmitData = {this.setMovie}
						isFeedback={showFeedback}
						isSolution={isSolution}
						isCorrect={group.movie.correct ? group.movie.correct : null}
						explanation={group.movie.explanation ? group.movie.explanation : null}
						alert={group.movie.alert}
					/>
				</Col>
			);
			if(index === data.length - 1){
				toDisplay.push(
					<Col xs={true} sm={true} md={true} lg={true} xl={true} key={`target-${index}`}>
						<ActorColumn
							key = {`TargetId-${index}`}
							groupId = {index}
							isOriginTargetActor = {true}
							picturePath = {group.target['profilePath']}
							name = {group.target['name']}
							isSolution={isSolution}
							alert={group.movie.alert}
						/>
					</Col>
				);
			}
		});
		return toDisplay;
	}

	async submitAnswer(){
		const {puzzle} = this.state;
		// Check if every element was assigned
		let alertFound = false;
		puzzle.forEach((group, idx) => {
			if (!group.origin.actorMDBId && idx > 0) {
				group.origin.alert = true;
				puzzle[idx - 1].target. alert = true;
				alertFound = true;
			}
			if (!group.target.actorMDBId && idx < puzzle.length-1) {
				group.target.alert = true;
				puzzle[idx + 1].origin.alert = true;
				alertFound = true;
			}
			if (!group.movie.movieMDBId) {
				group.movie.alert = true;
				alertFound = true;	
			}
		});
		if (alertFound) {
			this.setState({puzzle: puzzle});
			return;
		}
		let url = (process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://movie-lynx-backend.herokuapp.com') + '/check';

		let body = {
			submittedPuzzle: puzzle,
		}
		console.log('here is what i\'m sending');
		axios.post(url, body, config).then((res) =>{
			console.log(res.data.result);
			const {data:  { result: results } } = res;
			console.log('here are the results from submitting puzzle', results);
			this.setState({
				puzzle : results,
				showFeedback: true,
			});
		}).catch((err) =>{
			console.log(err);
			return err;
		});
	}

	showSolution(){
		//TODO: remove line 451 completely to use real data that will be set in componentDidMount
		this.setState({
			isSolution: true,
		});

		// axios.post(url, body, config).then((res) =>{
		// 	const {data} = res;
		// 	this.setState({
		// 		answerCorrect: res,
		// 	});
		// }).catch((err) =>{
		// 	return err;
		// });
		
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

	renderLoading() {
		return (
			<Spinner animation="border" role="status" size="xl"> 
				<span className="sr-only">Loading...</span>
			</Spinner>
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