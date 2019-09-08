import React from 'react';
import PropTypes from 'prop-types';

class Row extends React.Component{

	constructor(props){
		super(props);
		this.selectorWrapper = this.selectorWrapper.bind(this);
	}

	selectorWrapper(){
		const {imgPath, name, mdbId, selector} = this.props;
		selector(imgPath, name, mdbId);
	}

	renderRow(){

		const {isActor, imgPath, name, selector } = this.props;
		const buttonText = `Select ${isActor ? 'actor' : 'movie' }`;
		return (
			<div>
				<div>
					<img src={`${imgPath}`}/>
				</div>

				<div>
					<p>
						{name}
					</p>
				</div>

				<div>

					<button
						onClick = {this.selectorWrapper}
					>
						Select {buttonText}
					</button>
				</div>
			</div>
		);
	}

	render(){
		return(
			<React.Fragment>
				{this.renderRow()}
			</React.Fragment>
		);
	}
}

Row.propTypes = {
	isActor: PropTypes.bool.isRequired,
	imgPath: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	mdbId: PropTypes.string.isRequired,
	selector: PropTypes.func,
};

Row.defaultProps = {
	selector: () => {},
};


export default Row;
