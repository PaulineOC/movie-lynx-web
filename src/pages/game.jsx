import React from 'react';
//import PropTypes from 'prop-types';
import ActorColumn from '../components/actorColumn.jsx';
import MovieColumn from '../components/movieColumn.jsx';

import { getRequest } from "../services/requests";


require('bootstrap');



class Game extends React.Component{

	puzzle = [
		{
			movie: {
				movieId: 0,
				movieMdbId:111,
				name: 'Inception',
				picturePath: `/movie1`,
			},
			origin: {
				actorId: 0,
				actorMdbId: 0 ,
				name: `Ken Watanabe`,
				picturePath: `/actor0`,
			},
			target: {
				actorId: 1,
				actorMdbId: 1,
				name: 	`Leonardo Di Caprio`,
				picturePath: `/actor1`,
			},
		},
		{
			movie: {
				movieId: 2,
				movieMdbId: 222,
				name: 'Revolutionary Road',
				picturePath: `/movie2`,
			},
			origin: {
				actorId: 1,
				actorMdbId: 1,
				name: 	`Leonardo Di Caprio`,
				picturePath: `/actor1`,
			},
			target: {
				actorId: 2,
				actorMdbId: 2,
				name: 	`Kate Winslet`,
				picturePath: `/actor2`,
			},
		},
		{
			movie: {
				movieId: 3,
				movieMdbId: 333,
				name: 'Revolutionary Road',
				picturePath: `/movie2`,
			},
			origin: {
				actorId: 2,
				actorMdbId: 3,
				name: 	`Kate Winslet`,
				picturePath: `/actor2`,
			},
			target: {
				actorId: 3,
				actorMdbId: 3,
				name: 	`Cameron Diaz`,
				picturePath: `/actor3`,
			},
		},
	];

	constructor(props){
		super(props);
		let puzzle = this.puzzle.map((item, indx) =>{
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
		const copy = this.puzzle.splice();
		this.state = {
			puzzle: this.puzzle,
			showAnswer: this.props.showAnswer,
			answer: copy,
		};
		this.renderGame = this.renderGame.bind(this);
		this.setMovieMdId = this.setMovieMdId.bind(this);

		this.selectActor = this.selectActor.bind(this);
		this.setActorMdId = this.setActorMdId.bind(this);
		this.setActorPictureAndName = this.setActorPictureAndName.bind(this);

		this.setMovie= this.setMovie.bind(this);
		this.setMovieMdId = this.setMovieMdId.bind(this);
		this.setMoviePictureAndName = this.setMoviePictureAndName.bind(this);
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
			//let testPuzzle = await getRequest( url, {}, config);
			//console.log('here are the results of getting puzzle: ');
			//console.log(testPuzzle);
		//set state correctly to be the result puzzle 
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
		newPuzzle[groupIndx].origin.picturePath= path;
		newPuzzle[groupIndx-1].target.picturePath = path;
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
		newPuzzle[groupIndx].movie.picturePath= path;
		this.setState({puzzle: newPuzzle});	
	}

	renderGame(data){
		let  toDisplay = [];
		data.forEach((group, index) =>{
			// Push Origin Actor
			toDisplay.push(
				<ActorColumn
					key = {`OriginID-${index}`}
					groupId = {index}
					isOriginTargetActor = {index===0}
					actorId={group.origin['actorId']}
					picturePath = {group.origin['picturePath']}
					name = {group.origin['name']}
					setSubmitData= {this.selectActor} 
				/>
			);

			//Push Movie
			toDisplay.push(
				<MovieColumn
					key = {`MovieId-${index}`}
					groupId = {index} 
					movieId = {group.movie['movieId']}
					picturePath = {group.movie['picturePath']}
					name = {group.movie['name']}
					setSubmitData = {this.setMovie}
				/>
			);

			//Last set: push target actor
			if(index!==data.length-1){
				toDisplay.push(
					<ActorColumn
						key = {`TargetId-${index}`}
						groupId = {index}
						isOriginTargetActor = {true}
						actorId={group.origin['actorId']}
						picturePath = {group.origin['picturePath']}
						name = {group.origin['name']}
					/>
				);
			}
		});
		return toDisplay;
	}


	render(){
		const { puzzle, answer } = this.state;
		return (
			<div id="game-dashboard">
				{this.renderGame(puzzle)}
			</div>
		);
	}
}

export default Game;