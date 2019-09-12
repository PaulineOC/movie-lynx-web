import React from 'react';
import Button from 'react-bootstrap/Button'

class Intro extends React.Component{


render(){
	return (
		<div>
			<Button onClick={this.props.onClick}>
				Hi
			</Button>
		</div>
	);
}
}



export default Intro;