import React from 'react';

class NumberButton extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        visible: 1,
        prevVisible: 1,
        gameId: 0
      }
    }
  
    click() {
      if (this.state.visible && this.props.gameStatus === "play") {
        this.setState({visible: 0});
        this.props.update(this.props.value);
      }
    }
  
    reset() {
      this.setState( { visible: 1 } );
      this.setState( { gameId: this.props.gameId } );
    }
  
    render() {
      // this causes warning: state should not be chnanged during render?
      if ( this.state.gameId !== this.props.gameId) {
        this.reset(this.props.gameId);
      }
     

      var myClassName="number-form";
      if (this.state.visible) {
        if (this.props.gameStatus === "play"){
          myClassName+=" number-active zoom";
        } else {
          myClassName+=" number-inactive";
        }
      } else {
        myClassName+=" number-clicked";
      }

      if (this.props.gameStatus === "lost" ) {
        console.log(this.props.answer, this.state.visible );
        if (this.props.answer === true && this.state.visible  ) { // lost, not clicked and right answer
          myClassName+="-wrong blink";
        }
        if (this.props.answer === false && ! this.state.visible ) { // lost,  clicked and wrong answer
          myClassName+="-wrong blink";
        }
      }
  
      //console.log(this.props.value, this.props.gameStatus, this.props.answer, this.state.visible, myClassName);

      return <div className={ myClassName} onClick={() => this.click() }>
              {this.props.value}
            </div>;
    }
  }

  export default NumberButton;
