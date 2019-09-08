import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { searchActors } from "../services/requests";

import Row from './row';

const config = {
	headers: {
		'Access-Control-Allow-Origin': '*',
		crossdomain: true,
	}
};

class SearchTable extends React.Component{

	constructor(props){
			super(props);
			this.state = {
				searchResults: [],
			};
			this.searchActor = this.searchActor.bind(this);
			this.searchMovie = this.searchMovie.bind(this);
			this.renderRow = this.renderRow.bind(this);
	}

	async componentDidMount(){
		const { isActor, queryString } = this.props;
		if(isActor){
			await this.searchActor(queryString);
		}
		else{
			await this.searchMovie(queryString);
		}
	}


	async searchActor(queryString){
		// console.log('here is queryString', queryString);

		// let results = await searchActors(queryString);
		// console.log('here are results: ', results);
		// this.setState({
		// 		searchResults: results,
		// 	});

		//PAULINE TESTING:

		let url = (process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://movie-lynx-backend.herokuapp.com') + '/searchActor';
		let body = { 
			actor: queryString
		};

		axios.post(url, body, config).then((res) =>{
			//console.log(res);
			console.log('here are the results of the search for actor: ', res);
			this.setState({
				searchResults: res['data']['results'],
			});
		}).catch((err) =>{
			console.log(err);
			return err;
		});
	}

	async searchMovie(queryString){
		// console.log('here is queryString', queryString);

		// let results = await searchActors(queryString);
		// console.log('here are results: ', results);
		// this.setState({
		// 		searchResults: results,
		// 	});

		let url = (process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://movie-lynx-backend.herokuapp.com') + '/searchMovie';
		let body = { 
			movie: queryString
		};

		axios.post(url, body, config).then((res) =>{
			//console.log(res);
			console.log('here are the results of the search for movie: ', res);
			this.setState({
				searchResults: res['data']['results'],
			});
		}).catch((err) =>{
			console.log(err);
			return err;
		});
	}

	renderRow(){
		console.log('render rows');
		const { isActor, selector } = this.props;
		const {searchResults} = this.state;
		if(!searchResults) {
			return ('Loading');	
		}
		let result = searchResults.map((ele, idx) =>{
			const {name, title, profilePath, posterPath, id} = ele;
			return (<Row
				key={idx}
				isActor={isActor}
				name={name || title }
				imgPath={ profilePath || posterPath}
				mdbId={id}
				selector={selector}
			/>);
		});
		return result;
	}

	render(){
		return(
			<React.Fragment>
				{this.renderRow()}
			</React.Fragment>
		);
	}
}

SearchTable.propTypes = {
	queryString: PropTypes.string.isRequired,  
	isActor: PropTypes.bool.isRequired,
	selector: PropTypes.func,
};

SearchTable.defaultProps = {
	selector: () => {},
};

export default SearchTable;
