
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
    if (this.state.visible && this.props.gameStatus === "play") {
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
      timer: 1,
      elementsClicked: 0,
      sum: 0,
      gameId: 0,
      score: 0
    }
  }

  updateSelectedIds = (clickValue) => {
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

    // console.log("In updateSelectedId("+clickValue+")");
  }

gameResult = (win) => {
  clearInterval(this.timer);
  if (win) {
    this.setState( {  gameStatus: "won",
                      score: this.state.score + this.state.timer } );
  } else {
    this.setState( {  gameStatus: "lost",
                      score: parseInt(this.state.score * 0.8),
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
      myRnd=parseInt( Math.random()* ( 10+parseInt(this.state.score/10) ) );
      myArr.push(myRnd);
    }

    this.setState( {  answer: myArr[0]+myArr[1]+myArr[2],
                      numbers: this.shuffleArray(myArr),
                      gameStatus: "play",
                      elementsClicked: 0,
                      sum: 0,
                      gameId: this.state.gameId + 1,
                      timer: 20 + parseInt(this.state.score/20)
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
          <div className="col target">{this.state.answer}</div>
        </div>

        <div className="row">
          <div className="col score">Clicks:{3-this.state.elementsClicked}</div>
          <div className="col score">Score:{this.state.score}</div>
          <div className="col score">Time:{this.state.timer}</div>
        </div>

        <div className="row">
          <div className="col timer">{this.state.gameStatus}</div>
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
        { this.state.gameStatus !== "play" &&
          <button className="button-form number-active" onClick={()=>this.startGame()}> Start</button>
        }
        <br />
        <Help />

      </div>
    );
  }
}

export default Game;


class Help extends React.Component {

  render() {
    return(
      <>
        <div>
          <p>
          Druk telkens op drie (zwarte) nummers zodat de nummers opgeteld het rode nummer vormen.
          Na elke game kan je een nieuwe opgave starten. Als jouw score toeneemt, wordt het spel lastiger.
          </p>
          <p>
          Bij een gewonnen game krijg je de resterende seconden bnij jouw socre opgeteld.
          Bij een verloren game gaat er ongeveer 20% van jouw score af.
          </p>
          <p>
          Start het eerste spel door de knoppen 1,2 en 3 in te drukken, deze vormen samen 6.
          Start dan een nieuw spel door op start te drukken.
          </p>
        </div>
        <div>
          <p>
          Click on three (balck) buttons so that the sum of these numbers is the red number.
          After each game, you can start again. If the socre increases, the difficulty will increase as well.
          </p>
          <p>
          After a won game the time left will be added to your score.
          When a game is lost, your score will be reduced by approximatly 20%.
          </p>
          <p>
          Start the first game by clicking teh numbers 1,2 and 3. Addes up these will be 6 (the red number).
          Press start to continue the game.
          </p>
        </div>
    </>
    )
  }

}