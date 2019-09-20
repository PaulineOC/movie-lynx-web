import React from 'react';
//import PropTypes from 'prop-types';
import axios from 'axios';
import ActorColumn from '../components/actorColumn.jsx';
import MovieColumn from '../components/movieColumn.jsx';

import {getPuzzle} from '../services/helpers';
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

	constructor(props){
		super(props);

		this.state = {
			puzzle: [],
			showAnswer: this.props.showAnswer,
			answer: [],
			answerCorrect: null,
		};
		this.renderGame = this.renderGame.bind(this);
		this.selectActor = this.selectActor.bind(this);
		this.setActorMdId = this.setActorMdId.bind(this);
		this.setActorPictureAndName = this.setActorPictureAndName.bind(this);

		this.setMovie= this.setMovie.bind(this);
		this.setMovieMdId = this.setMovieMdId.bind(this);
		this.setMoviePictureAndName = this.setMoviePictureAndName.bind(this);

		this.submitAnswer=this.submitAnswer.bind(this);
		this.setAlertForActor = this.setAlertForActor.bind(this);
		this.setAlertForMovie = this.setAlertForMovie.bind(this);
	}

	async componentDidMount(){
			
		const puzzle = await getPuzzle();

		console.log(puzzle);
		const copy = puzzle.splice();
		let firstActor = puzzle[0].origin;
		let lastActor = puzzle[puzzle.length-1].target;
		const puzzleEmptied = puzzle.map((item, indx) =>{
		return {
				movie: {
					movieId: indx,
					movieMdbId:null,
					name: null,
					picturePath: null,
					alert: false,
				},
				origin: {
					actorId: null,
					actorMdbId: null,
					name: null,
					picturePath: null,
					alert: false,
				},
				target: {
					actorId: null,
					actorMdbId: null,
					name: null,
					picturePath: null,
					alert: false,
				},
			};
		});
		puzzleEmptied[0].origin = firstActor;
		puzzleEmptied[puzzleEmptied.length-1].target = lastActor;

		this.setState(
		{
			puzzle: puzzleEmptied,
			showAnswer: this.props.showAnswer,
			answer: copy,
			answerCorrect: null,
		});
	}


	async selectActor(groupIndx, mdId, name, path){
		await this.setActorMdId(groupIndx, mdId);
		await this.setActorPictureAndName(groupIndx, name, path);
		await this.setAlertForActor(groupIndx, false);
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
		await this.setAlertForMovie(groupIndx, false);
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

	renderGame(data){
		let  toDisplay = [];
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
							alert={group.movie.alert}
						/>
					</Col>
				);
			}
		});
		return toDisplay;
	}

	async submitAnswer(){
		let {puzzle} = this.state;

		// Check if every element was assigned
		let alertFound = false;
		puzzle.forEach((group, idx) => {
			if (!group.origin.actorMdbId && idx > 0) {
				group.origin.alert = true;
				puzzle[idx - 1].target. alert = true;
				alertFound = true;
			}
			if (!group.target.actorMdbId && idx < puzzle.length-1) {
				group.target.alert = true;
				puzzle[idx + 1].origin.alert = true;
				alertFound = true;
			}
			if (!group.movie.movieMdbId) {
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

		axios.post(url, body, config).then((res) =>{
			const {data} = res;
			this.setState({
				answerCorrect: res,
			});
		}).catch((err) =>{
			return err;
		});

	}

	render(){
		const { puzzle, answer } = this.state;
		return (
			<Container fluid={true}>
				<Row>
					{this.renderGame(puzzle)}
				</Row>
				<Row className="justify-content-md-center">
					<Button onClick={this.submitAnswer} variant="dark">
						Submit answer!
					</Button>
				</Row>
			</Container>
		);
	}
}

export default Game;