import React from 'react';
import '../css/rules.css';
import {Row, Container, Col, Card} from 'react-bootstrap';

class Rules extends React.Component {

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
		if(this.state.showRules) {
			return(
				<Card>
					<Card.Body>
						<Card.Title>
							Rules
						</Card.Title>
						<Card.Text>
							Chupa chups jelly caramels gummi bears chocolate bonbon carrot cake toffee. 
				            Gummi bears chocolate bar carrot cake jelly marzipan. 
				            Dessert chupa chups muffin oat cake lollipop wafer.
						</Card.Text>	
					</Card.Body>
		        </Card>
			); 
		}
		return null;
	}

	render(){
		return(
			<Container fluid={true}>
				<Row>
					<Col md={1}>
						<img
			          	alt="questionIcon"
			          	onClick={this.toggleRules}
			          	id="question" 
			          	src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/1024px-Icon-round-Question_mark.svg.png"/>
					</Col>
					<Col md={11}>
						{this.renderRules()}
					</Col>
				</Row>
			</Container>
        );
	}
}


export default Rules;