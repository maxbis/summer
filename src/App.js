
import './App.css';
import React from 'react';


class NumberButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: 1,
      gameid: 0
    }
  }

  click() {
    console.log("Number.click() clicked at "+this.state.visible);
    console.log(this.props.value);
    console.log(this.props.update );
    if (this.state.visible) {
      this.setState({visible: 0});
      this.props.update(this.props.value);
    }
    console.log("Set visible=0 "+this.state.visible);
  }

  reset() {
    this.setState( { visible: 1 } );
    this.setState( { gameid: this.props.gameId } );
  }

  render() {
    // console.log("GameStatus: "+this.props.gameStatus);
    if ( this.state.gameid !== this.props.gameId) {
      this.reset(this.props.gameId);
    }

    return <div className={ (this.state.visible) ? "number-form number-active" : "number-form number-clicked"}
                onClick={() => this.click() }
            >
            {this.props.value}
            </div>;
  }
}



class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      numbers: [1,2,3,4,5,6],
      answer: 6,
      gameStatus:  'play', // play, won, lost, start
      timer: 10,
      elementsClicked: 0,
      sum: 0,
      gameId: 0,
      score: 0
    }
  }

  updateSelectedIds = (clickValue) => {
    this.setState( { gameStatus: "play" } );

    if ( this.state.elementsClicked === 2) {
      clearInterval(this.timer);
      if ( this.state.sum + clickValue === this.state.answer ) {
        this.setState( {  gameStatus: "won",
                          score: this.state.score + this.state.timer
                      } );
      } else {
        this.setState( { gameStatus: "lost" } );
      }
    }
    this.setState( { elementsClicked: this.state.elementsClicked+1,
                     sum: this.state.sum + clickValue
                  } );

    // console.log("In updateSelectedId("+clickValue+")");
  }

  shuffleArray(array) {
    var currentIndex = array.length;
    var randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  startGame = (clickValue) => {
    let myArr = [];
    let myRnd = 0;  

    for(let i=0; i<6; i++) {
      myRnd=parseInt( Math.random()*20 );
      myArr.push(myRnd);
    }

    this.setState( {  answer: myArr[0]+myArr[1]+myArr[2],
                      numbers: this.shuffleArray(myArr),
                      gameStatus: "start",
                      elementsClicked: 0,
                      sum: 0,
                      gameId: this.state.gameId + 1,
                      timer: 30
                  } );
    this.timer = setInterval(() => this.countDown(), 1000); 
  }

  countDown = () => {
    if (this.state.timer) {
      this.setState( { timer: this.state.timer -1 });
    } else {
      clearInterval(this.timer);
    }
   
  }

  render() {
    return (
      <div className="game">
        <div className="row">
          <div className="col target">{this.state.answer}</div>
        </div>
        <div className="row">
          <div className="col timer">{this.state.gameStatus}</div>
        </div>
        <div className="row">
          <div className="col score">Clicks:{3-this.state.elementsClicked}</div>
          <div className="col score">Score:{this.state.score}</div>
          <div className="col score">Time:{this.state.timer}</div>
        </div>

        <div className="row">
          { this.state.numbers.map((value, index) =>
            <NumberButton key={index} value={value} 
                    update={this.updateSelectedIds} 
                    gameStatus={this.state.gameStatus}
                    gameId={this.state.gameId}
            />
          )}
        </div>

        <br />

        <button className="button-form number-active" onClick={()=>this.startGame()}> Start</button>

      </div>
    );
  }
}

export default Game;
