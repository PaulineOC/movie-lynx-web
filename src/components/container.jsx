import React from 'react';
import '../css/game.css';
import Button from '../components/button';

class Column extends React.Component{


	//default props: 

	//actor-mdb-id={-1}
	//isActor = true;
	//show answer = false
	//picturePath = anonymous.svg etc


	// constructor(){
	// }


	// gets an origin, target and Actor 
	renderSet(){


		



	}



	render(){

		console.log('in container: ', this.props);
		return (
			<div>
				<p>
					{this.props}
				</p>
			</div>

		);
	}
}

export default Column;
