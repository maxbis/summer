import React from 'react';

import './Game.css';

import NumberButton from "./NumberButton";
import Help from "./Help";
import ProgressBar from "./ProgressBar";
import HiScore from "./HiScore";

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      numbers: [1,2,3,4,5,6],
      correctNumers:[1,2,3],
      answer: 6,
      gameStatus:  'play', // play, won, lost
      timer: 1,
      timerStart: 1,
      elementsClicked: 0,
      sum: 0,
      gameId: 0,
      score: 0,
      hiScore: 0
    }
  }

  clickedAtNumber = (clickValue) => {
    this.setState( { gameStatus: "play" } );

    if ( this.state.elementsClicked === 2 ) {
      clearInterval(this.timer);
      if ( this.state.sum + clickValue === this.state.answer ) {
        this.gameResult(1);
      } else {
        this.gameResult(0);
      }
    }
    this.setState( { elementsClicked: this.state.elementsClicked+1,
                     sum: this.state.sum + clickValue } );
  }

  gameResult = (win) => {
    clearInterval(this.timer);
    if (win) {
      this.setState( {  gameStatus: "won",
                        score: this.state.score + this.state.timer,
                        hiScore: Math.max(this.state.score + this.state.timer, this.state.hiScore)
                    } );
    } else {
      this.setState( {  gameStatus: "lost",
                        score: this.state.score - parseInt(this.state.score * 0.2),
                        } );
    }
    
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
     do {
      myRnd=parseInt( Math.random()* ( 10+parseInt(this.state.score/10) ) );
     } while ( myArr.includes(myRnd) );

      myArr.push(myRnd);
    }

    this.setState( {  answer: myArr[0]+myArr[1]+myArr[2],
                      correctNumers: myArr.slice(0,3),
                      numbers: this.shuffleArray(myArr),
                      gameStatus: "play",
                      elementsClicked: 0,
                      sum: 0,
                      gameId: this.state.gameId + 1,
                      timer: 20 + parseInt(this.state.score/20),
                      timerStart:  20 + parseInt(this.state.score/20)
                  } );
    this.timer = setInterval(() => this.countDown(), 1000); 
  }

  countDown = () => {
    if ( this.state.timer > 0 ) {
      this.setState( { timer: this.state.timer -1 });
    } else {
      this.gameResult(0);
      clearInterval(this.timer);
    }
   
  }

  render() {
    return (
      <div className="game">

        <div className="row">
          <HiScore value={ this.state.hiScore } />
          <Help />
        </div>

        <div className="row"><ProgressBar bgcolor="#6a1b9a" timer={this.state.timer} timerStart={this.state.timerStart}/></div>

        <div className="row">
          <div className="col scorebar play-status ">score:{this.state.score}</div>
          <div className={ "col scorebar play-status "+this.state.gameStatus }>
            { this.state.gameStatus === "play" ? "play "+(3-this.state.elementsClicked) : (this.state.gameStatus === "won" ? "+"+this.state.timer : "-"+parseInt(this.state.score * 0.2) ) }
          </div>
        </div>

        <div className="row">
          <div className={"col target "+ (this.state.gameStatus !== "play" ? (this.state.gameStatus === "won" ? "target-won" : "target-lost" ) : null) } >{this.state.answer}</div>
        </div>

        <div className="row">
          { this.state.numbers.map((value, index) =>
            <NumberButton key={index} value={value} 
                    update={this.clickedAtNumber} 
                    gameStatus={this.state.gameStatus}
                    gameId={this.state.gameId}
                    answer={ (  this.state.gameStatus === "lost" && this.state.correctNumers.includes(value) ) }
            />
          )}
        </div>

        <div className="row button-row">

            { this.state.gameStatus !== "play" &&
              <div className="number-form number-active right delay" onClick={()=>this.startGame()}> Start </div>
            }
            { this.state.gameStatus === "play" &&
              <div className="number-form number-inactive right"> Start </div>
            }

        </div>

      </div>
    );
  }
}

export default Game;


