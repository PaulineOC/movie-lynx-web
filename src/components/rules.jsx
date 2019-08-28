import React from 'react';
import '../css/rules.css';


class Rules extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			showRules: false,
		};
		this.toggleRules = this.toggleRules.bind(this);
		this.renderRules = this.renderRules.bind(this);
	}

	toggleRules(){
		this.setState({
			showRules: !this.state.showRules,
		});
	}

	renderRules(){
		if(this.state.showRules){
			return(
				<div id="rule-text">
		          <p>
		            Chupa chups jelly caramels gummi bears chocolate bonbon carrot cake toffee. 
		            Gummi bears chocolate bar carrot cake jelly marzipan. 
		            Dessert chupa chups muffin oat cake lollipop wafer. 
		            Cake tootsie roll gummies powder. 
		            Candy liquorice sugar plum oat cake oat cake sesame snaps. 
		            Chocolate cake cookie macaroon cookie.
		            Powder jujubes chocolate macaroon fruitcake.
		            Sugar plum cake soufflé chocolate cake bonbon cupcake. 
		            Cupcake sweet roll toffee. 
		            Jujubes chocolate tiramisu cheesecake bear claw tart. 
		            Croissant cotton candy jelly-o. Chocolate cake jelly beans pastry macaroon pie
		          </p>
		        </div>
			); 
		}
		return null;
	}

	render(){
		return(
			<div id="rules">
		        <div id="questionIcon">
		          <img
		          	alt="questionIcon"
		          	onClick={this.toggleRules}
		          	id="question" 
		          	src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/1024px-Icon-round-Question_mark.svg.png"/>
		          	{this.renderRules()}
	        	</div>
      		</div>
      );
	}
}


export default Rules;