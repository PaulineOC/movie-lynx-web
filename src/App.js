import React from 'react';
import './css/App.css';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import Intro from './pages/intro.jsx';


class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      playGame:false,
      gameGenerated: false,
      showAnswer: false,
      puzzle: {},
      answer:{},
    };
    this.renderIntro = this.renderIntro.bind(this);
  }

  renderIntro(){
    const {playGame} = this.state;
    if(playGame){
      return (<Intro />);
    }
    return null;
  }

  render(){
    return (
        <div className="App">
          <Header />
          <Footer />
          {this.renderIntro()}
        </div>
    );
  }
}



export default App;
