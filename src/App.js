import React from 'react';
import './css/App.css';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import Intro from './pages/intro.jsx';
import Game from './pages/game.jsx';

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
    if(!playGame){
      return (
        <Intro
          onClick={this.togglePuzzle}
        />
      );
    }
    return (
      <Game 
          puzzle={this.puzzle} 
          showAnswer={showAnswer}
        />
    );
  }
// <Footer/>
  render(){
    return(
      <div>
        <Header/>
        {this.renderApp()}
       
      </div>
    );
  }
}



export default App;
