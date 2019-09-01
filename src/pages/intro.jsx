import React from 'react';
import Button from '../components/button';

class Intro extends React.Component{


render(){
	return (
		<div style={{'backgroundColor': 'blue', 'height':'80	vh'}}>
			<Button 
				label={"Hi"}
				onClick={this.props.onClick}
			/>
		</div>
	);
}
}



export default Intro;