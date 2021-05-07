import './App.css';
import React from 'react'

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

class App extends React.Component {
  constructor(props){
    super(props)
    this.state= {
      keycode:'',
      switch: true,
      play: false
    }
    this.handlekey = this.handlekey.bind(this)
    this.changecolor = this.changecolor.bind(this)
    this.changecolorblack = this.changecolorblack.bind(this)
    this.displaykey = this.displaykey.bind(this)
    this.swtich  = this.swtich.bind(this)
    this.playAudio = this.playAudio.bind(this)
  }


  swtich(){
    this.setState({
      switch: !this.state.switch
    })
    console.log(this.state.switch)
  }

  changecolor(keycode){
    console.log('logged', keycode)
    if (document.getElementById(keycode).className == "white2"){
      document.getElementById(keycode).className = "white"
    }
    else{
      document.getElementById(keycode).className = "white2"
    }
    
  }

  changecolorblack(keycode){
    if (document.getElementById(keycode).className == "black2"){
      document.getElementById(keycode).className = "black"
    }
    else{
      document.getElementById(keycode).className = "black2"
    }
  }


  handlekey= (event) => {
    let keycode = ''
    switch (event.keyCode) {
      case 81:
       keycode = 'Q';
       break;
      case 87:
       keycode = 'W';
       break;
      case 69:
        keycode = 'E';
        break;
      case 65:
        keycode = 'A';
        break;
      case 83:
        keycode = 'S';
        break;
      case 68:
        keycode = 'D';
        break;
      case 90:
        keycode = 'Z';
        break;
      case 88:
        keycode = 'X';
        break;
      case 67:
        keycode = 'C';
        break;
      default:
        break;
    }
    this.displaykey(keycode)
    if (keycode == 'Q' || keycode == 'E' || keycode == 'S' || keycode == 'D' || keycode == 'X' ){
      this.changecolor(keycode)
      setTimeout(()=> this.changecolor(keycode), 100);
      }
      else if(keycode == 'W' || keycode == 'A' || keycode == 'Z' || keycode == 'C'){
      this.changecolorblack(keycode)
      setTimeout(()=> this.changecolorblack(keycode), 100);
      }
  }


  displaykey(key){
    this.setState({
      keycode: key
    })
    this.playAudio(key)
  }




  componentDidMount(){
    document.addEventListener("keydown", this.handlekey, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handlekey, false);
  }

  async playAudio(key) {
     var audio = await document.getElementById(key)
     audio.play()
}

  render(){
    var powerswitch  = this.state.switch ?  'switch-button' : 'switch-button-off';
  return (
    
    <div className="App">
      <div id='drum-machine'>
        <div id='display'>
          <div id='switch' onClick={this.swtich}> <div id='switch-button' className={powerswitch} onClick={this.swtich}></div> </div>
          <div id='display-text'>{this.state.keycode}</div>
          <div className='volume' id='volume'> 
          <ul>
          <li className='vol vol-1' id='vol-1'>1</li>
          <li className='vol vol-2' id='vol-2'>2</li>
          <li className='vol vol-3' id='vol-3'>3</li>
          <li className='vol vol-4' id='vol-4'>4</li>
          <li className='vol vol-5' id='vol-5'>5</li>
          <li className='vol vol-6' id='vol-6'>6</li>
          </ul>
          <div className='volumer-inner' id='volume-inner'><div className='vol-dot' id='vol-dot'>.</div></div>
          </div>
          
        </div>
        <ul id='keys'>
        <div className='drum-pad white key' id='Qi' onClick={()=>this.displaykey('Q')}><audio className='clip' id='Q' src='https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'/> Q </div>
        <li className='drum-pad black key' id='Wi' onClick={()=>this.displaykey('W')}><audio className='clip' id='W' src='https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'></audio>W</li>
        <li className='drum-pad white key' id='Ei' onClick={()=>this.displaykey('E')}><audio className='clip' id='E' src='https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'></audio>E</li>
        <li className='drum-pad black key' id='Ai' onClick={()=>this.displaykey('A')}><audio className='clip' id='A' src='https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'></audio>A</li>
        <li className='drum-pad white key' id='Si' onClick={()=>this.displaykey('S')}><audio className='clip' id='S' src='https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'></audio>S</li>
        <li className='drum-pad white key' id='Di' onClick={()=>this.displaykey('D')}><audio className='clip' id='D' src='https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'></audio>D</li>
        <li className='drum-pad black key' id='Zi' onClick={()=>this.displaykey('Z')}><audio className='clip' id='Z' src='https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'></audio>Z</li>
        <li className='drum-pad white key' id='Xi' onClick={()=>this.displaykey('X')}><audio className='clip' id='X' src='https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'></audio>X</li>
        <li className='drum-pad black key' id='Ci' onClick={()=>this.displaykey('C')}><audio className='clip' id='C' src='https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'></audio>C</li>
        </ul>
      </div>
    </div>
  );
}
}

export default App;
