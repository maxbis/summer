import './Hiscore.css';
import React from 'react';
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";

const months = ["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"];
//const zeroPad = (num, places=2) => String(num).padStart(places, '0');
const server='http://vps789715.ovh.net/yii/summer/hiscores/web/hiscores/';
// const server='http://localhost:8080/hiscores/';

class HiScore extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      visible: 0,
      language: 0,
      name: "naam",
      hiscores: [],
      buttonDisabled: 0,
    };
  }

  componentDidMount() {
    this.getData();
  }

  shouldComponentUpdate(nextProps, nextStat) {
    // only update if visible state changed or the hiscore changed
    let returnVal =  ( nextStat.visible !== this.state.visible ||  this.props.value !== nextProps.valu);
    return(returnVal);

  }

  getData() {
    fetch(server+'api-get')
    .then(res => res.json())
    .then((data) => {
      this.setState({ hiscores: data['top10'] });
      if ( data['myName'] ) {
        this.setState({ name:data['myName'], id:data['myId'] });
      }
    })
    .catch(console.log);
    
  }

  click() {
    this.setState( {visible: !this.state.visible } );
  }

  clickScore() {
    this.setState( {buttonDisabled: 1 } );
    this.postScore();

    if (this.state.id) {
      var hiscores=this.state.hiscores;
      var arrayLength = hiscores.length;
      
      for (var i=0; i<arrayLength; i++) {
        if ( hiscores[i]['id']===this.state.id) {
          hiscores[i]['score']=this.props.value;
          hiscores[i]['name']=this.state.name;
        }
      } 
      this.setState({ 'hiscores': hiscores} );
    }
    
    setTimeout(() => {  this.getData();this.setState( {buttonDisabled: 0 } ); }, 2000);
  }

  formatDate(string) {
    // string from server has format: 2021-08-01 23:29:16
    return string.substring(8,10)+" "+months[parseInt(string.substring(5,7)-1)];
  }

  render() {
    var visible = {
      display: this.state.visible ? 'block' : 'none'
    }  

    return(
      <>
          <div className="left topbar hiscore">
          { this.state.visible
              ? <AiFillCaretDown className="icon highscore-icon" onClick={() => this.click() } size={24}  />
              : <AiFillCaretRight className="icon highscore-icon" onClick={() => this.click() } size={24}  />
          }
          Hi-score: {this.props.value}
          </div>
          <div className="row ontop" style={visible}>
            
            <input type="text" name="name" placeholder={this.state.name} onChange={(e)=>{this.handleNameChanged(e.target.value)}} />
            &nbsp;<button onClick={() => this.clickScore() } disabled={this.state.buttonDisabled} >Score naar lijst</button>
            &nbsp;
            { this.state.buttonDisabled
              ? <GrUpdate className="spinning" /> 
              : null
            }
            <div className="small">Vul naam in en druk op knop om jouw hi-score in de lijst op te nemen.</div>
            <hr />
            <table className="smaller">
              <thead><tr><th>datum</th><th>naam</th><th>score</th></tr></thead>
              { this.state.hiscores.map((value, index) => 
                <tbody key={index}>
                  <tr key={index} className= {value.id === this.state.id ? "accent" : null } >
                    <td key={index+"1"}>{this.formatDate(value.datetime)}</td>
                    <td key={index+"2"}>{value.name}</td>
                    <td key={index+"3"}>{value.score}</td>
                  </tr>
                </tbody>
              )}
            </table>
            <br />
          </div>
         
    </>
    )
  }

  handleNameChanged(name) {
    this.setState({name: name} ); 
  }

  postScore() {
    if (this.state.name) {
      // console.log('postScore: name='+this.state.name+"&score="+this.props.value);
      let http = new XMLHttpRequest();
      http.open("POST",server+"api-post");
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      http.send("name="+this.state.name+"&score="+this.props.value);
    }
  }


}

export default HiScore;


