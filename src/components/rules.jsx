import React from 'react';
import {Row, Container, Col, Card} from 'react-bootstrap';

import '../css/rules.css';
import example from '../images/example.png';

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
							Movie Lynx is a pop culture game where you have to connect the origin and target actors by listing costars and their movies. No repeats allowed! To explain the example below:
								<ul>
									<li>
										Ken Watanabe and Leonardo Di Caprio were both in <em>Inception</em> 
									</li>
									<li>
										Leonardo Di Caprio and Kate Winslet were both in <em>Revolutionary Road</em>
									</li>
									<li>
										Kate Winslet and Cameron Diaz were both in <em>The Holiday</em>
									</li>
								</ul>
						</Card.Text>	
						<Card.Img variant="bottom" thumbnail src={example}/>

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