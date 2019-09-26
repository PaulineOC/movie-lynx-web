import React from 'react';
import './css/App.css';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import Game from './pages/game.jsx';
import Rules from './components/rules.jsx';
import {Row, Container} from 'react-bootstrap';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      playGame:false,
      showAnswer: false,
      submittedPuzzle: {},
      answer:{},
    };
    this.renderApp = this.renderApp.bind(this);
    this.togglePuzzle = this.togglePuzzle.bind(this);
  }

  togglePuzzle(){
    this.setState({
      playGame: true,
    });
  }

  //Render:
  renderApp(){
    const {playGame, showAnswer} = this.state;
    return (
      <Container fluid={true}>
        <Rules/>
        <Row>
          <Game 
          puzzle={this.puzzle} 
          showAnswer={showAnswer}/>
        </Row>
      </Container>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        {this.renderApp()}
      </React.Fragment>
    );
  }
}



export default App;
