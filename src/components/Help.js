import React from 'react';
import './Help.css';
import { AiFillQuestionCircle, AiFillCloseCircle } from "react-icons/ai";

class Help extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        visible: 0,
        language: 0
      }
    }

    shouldComponentUpdate(nextProps, nextStat) {
      return nextProps.visible !== this.state.visible;
    }

    click() {
      this.setState( {visible: !this.state.visible } );
    }
  
    render() {
      var visible = {
        display: this.state.visible ? 'block' : 'none'
      }  
  
      return(
        <>
            <div>
            { this.state.visible
                ? <AiFillCloseCircle className="icon help-icon" onClick={() => this.click() } size={24}  />
                : <AiFillQuestionCircle className="icon help-icon" onClick={() => this.click() } size={24}  />
            }
            </div>
  
            <div className="row ontop small" style={visible}>
              <h4>Nederlands</h4>
              <p>
              Druk telkens op drie (zwarte) nummers zodat de nummers opgeteld het rode nummer vormen.
              Na elke game kan je een nieuwe opgave starten. Als jouw score toeneemt, wordt het spel lastiger.
              </p>
              <p>
              Bij een gewonnen game krijg je de resterende seconden bij jouw socre opgeteld.
              Bij een verloren game gaat er ongeveer 20% van jouw score af.
              </p>
              <p>
              Start het eerste spel door de knoppen 1,2 en 3 in te drukken, deze vormen samen 6.
              Start dan een nieuw spel door op <i>start</i> te drukken.
              </p>
              <p>
              Klik links boven op het driehoekje om jouw naam en high score te registreren.
              </p>
              <p><button className="help-right small" onClick={() => this.click() }>Cool, thanks Max!</button></p><br /><br />
              <hr></hr>
              <h4>English</h4>
              <p>
              Click on three (black) buttons so that the sum of these numbers will be the red number.
              After each game, you can start again. If the score increases, the difficulty will increase as well.
              </p>
              <p>
              After a won game the time left will be added to your score.
              When a game is lost, your score will be reduced by approximatly 20%.
              </p>
              <p>
              Start the first game by clicking the numbers 1,2 and 3. Added up these will be 6 (the red number).
              Press <i>start</i> to continue the game.
              </p>
              <p>
              Click on top left triangle to register your name and high score.
              </p>
              <p><button className="help-right small" onClick={() => this.click() }>Cool, thanks Max!</button></p><br /><br />
              <hr></hr>
              <p className="vsmall">Summer v1.0 created in React/Yii by Max Bisschop</p>

            </div>
  
      </>
      )
    }
  
  }

  export default Help;