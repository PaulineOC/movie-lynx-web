import React from 'react';
import Button from '../components/button';

class Intro extends React.Component{

	constructor(props) {
	    super(props);
	    this.toggle = this.toggle.bind(this);
  }


	toggle(){
		alert(`YOU'VE MADE A BUTTON`);

	}

	render(){
		return (
			<div style={{'background-color': 'blue'}}>
				<Button 
					label={"Hi"}
					onClick={this.handleClick}
				/>
			</div>
		);
	}
}



export default Intro;