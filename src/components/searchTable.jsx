import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { searchActors } from "../services/requests";

import Table from 'react-bootstrap/Table';
import '../css/searchTable.css';
import anonymous from '../images/anonymous.png';
import poster from '../images/poster.png';


const config = {
	headers: {
		'Access-Control-Allow-Origin': '*',
		crossdomain: true,
	}
};
const baseProfileUrl = "https://image.tmdb.org/t/p/original";

class SearchTable extends React.Component{

	constructor(props){
		super(props);
	}

	renderThumbnail(result) {
		const {isActor} = this.props;
		if (isActor) {
			if (result.profilePath) {
				return (<img src={`${baseProfileUrl}${result.profilePath}`} className="img-thumbnail img-small"/>);
			}
			return (<img src={anonymous} className="img-thumbnail img-small"/>)
		}
		else {
			if (result.posterPath) {
				return (<img src={`${baseProfileUrl}${result.posterPath}`} className="img-thumbnail img-small"/>);
			}
			return (<img src={poster} className="img-thumbnail img-small"/>)
		}
	}

	selectActor(actor) {
		return () => {
			const {hideModal, selector} = this.props;
			selector(actor.profilePath, actor.name, actor.id);
			hideModal();
		}
	}

	selectMovie(movie) {
		return () => {
			const {hideModal, selector} = this.props;
			selector(movie.posterPath, movie.title, movie.id);
			hideModal();
		}
	}

	renderTable() {
		const {searchResults, selector, isActor} = this.props;
		let tableRows = searchResults.map(result => (
			<tr onClick={isActor ? this.selectActor(result) : this.selectMovie(result)}>
				<td>
					{result.name || result.title}
				</td>
				<td>
					{this.renderThumbnail(result)}
				</td>
			</tr>
		));

		return (
			<Table hover>
				<tbody>
					{tableRows}
				</tbody>
			</Table>
		);
	}

	render(){
		return(
			<React.Fragment>
				{this.renderTable()}
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
