import React from "react";
import PropTypes from 'prop-types';

import "../css/game.css";

class MovieColumn extends React.Component{

	constructor(props){	
		super(props);
	}

	render(){
		const {isOriginTargetActor, imgPath, name} = this.props;
		let imgStyle = {'backgroundImage': `url('../../public/links.png')`};
		return(
			<React.Fragment>
				<div className="actor-container">
		            <div className="img-container">
		              <div className="img-inner-container chainlink" style={imgStyle}>
		              </div>
		            </div>
	            	<input
		              className="movie-name"
		              type="text"
		              placeholder="Movie name"
		              size="20"
		              id="movie-{{@index}}"
		              data-movie-name="{{this.movie.title}}"
		              data-index="{{@index}}"
		            />
		            <button className="modalBtn buttons movies" data-index='{{@index}}' disabled>
		                Search for Movie
                	</button>
	          </div>
			</React.Fragment>
		);
	}

}

MovieColumn.propTypes = {
	groupId: PropTypes.number.isRequired,
	movieId: PropTypes.number.isRequired,
	name: PropTypes.string,
	setSubmitData: PropTypes.func,
};

MovieColumn.defaultProps = {
	name: 'Select a Movie',
	setSubmitData: ()=>{},
};

export default MovieColumn;