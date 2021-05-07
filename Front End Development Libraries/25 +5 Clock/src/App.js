import React from 'react'
import './App.css'
import FontAwesome from 'react-fontawesome'


var timer;
var distance;

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      time:  0,
      minute: 25,
      seconds: 0,
      breaklength: 5,
      sessionlength: 25,
      isplaying: false,
      interval:'',
      timer:'session',
    }
    this.Increment = this.Increment.bind(this)
    this.Decrement = this.Decrement.bind(this)
    this.Start = this.Start.bind(this)
    this.reset = this.reset.bind(this)
    this.pause = this.pause.bind(this)
  }

  Increment(input){
    if( input == 'break' && this.state.breaklength !== 60){
      this.setState({
        breaklength: this.state.breaklength+1
      })
    }
    else if( input == 'session' && this.state.sessionlength !== 60) {
      this.setState({
        sessionlength: this.state.sessionlength+1,
        minute: this.state.minute+1
      })
    }
  }

  Decrement(input){
    if( input == 'break' &&  this.state.breaklength !==1 ){
      this.setState({
        breaklength: this.state.breaklength-1
      })
    }
    else if( input == 'session' &&  this.state.sessionlength !==1 ) {
      this.setState({
        sessionlength: this.state.sessionlength-1,
        minute: this.state.minute-1
      })
    }
  }



  Start(){

    if(this.state.time == 0){
    timer = new Date().getTime() + ((this.state.minute)*60000);
    }
    else {
      timer = new Date().getTime()  + ((this.state.minute)*60000) + ((this.state.seconds)*1000)
    }

    if(!this.state.isplaying){

      this.setState({isplaying:!this.state.isplaying})

      this.state.interval = setInterval(() => {
      var now = new Date().getTime()
      distance =  timer - now;
      var minutes =  Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds =  Math.floor((distance % (1000 * 60)) / 1000);
      console.log(distance)

      if( distance < 0 ){
        if(this.state.timer == 'session'){
          this.audiobeep.play()
          this.setState({
            minute: this.state.breaklength,
            seconds:0,
            time:0,
            timer:'break',
            isplaying:false,
          })
          clearInterval(this.state.interval)
          this.Start()
        }
        else if(this.state.timer == 'break'){
          
            this.setState({
              minute: this.state.sessionlength,
              time:0,
              timer:'session',
              isplaying:false,
            })
            clearInterval(this.state.interval)
            this.audiobeep.play()
            this.Start()
        }
      }
      else {
        this.setState({
          minute: minutes,
          seconds: seconds,
          time:1
        })
      }
    }, 1000);
   }

  }

  pause(){
    this.setState({isplaying:!this.state.isplaying})
    clearInterval(this.state.interval)
    this.audiobeep.pause()
  }

reset (){
  clearInterval(this.state.interval)
  this.setState({
    minute: 25,
    seconds: 0,
    sessionlength: 25,
    breaklength: 5,
    time:  0,
    isplaying:false,
    timer:'session'
  })
  this.audiobeep.pause()
}

  
  render(){

    var button;
    if(!this.state.isplaying){
      button = <button className='grid-four-class' id='start_stop' onClick={this.Start}> <FontAwesome className='fa fa-play' name='play' size='2x'  /></button>
      }
      else {
        button = <button className='grid-four-class' id='start_stop' onClick={this.pause}> <FontAwesome className='fa fa-pause' name='pause' size='2x'  /></button>
      }

  return (
    <div className="App">
      <div>
        <div id='background-clock'>

          <div id='outer-grid'>

            <div className='grid-one'>
              <div className='heading' id='break-label'> Break Length </div>

              <div className='classbutton'>
              <div className='buttons' id='break-decrement' onClick={()=>this.Decrement('break')}>-</div>
              <div className='break-session' id='break-length'>{this.state.breaklength}</div>
              <div className='buttons' id='break-increment' onClick={()=>this.Increment("break")}>+</div>
              </div>
            </div>

            <div className='grid-two'>
              <div className='heading timer-label' id='timer-label'> {this.state.timer} </div>
              <div className='time-left' id='time-left'>{this.state.minute < 10 ? '0' + this.state.minute : this.state.minute}:{this.state.seconds < 10 ? '0' + this.state.seconds : this.state.seconds}</div>
            </div>

            <div className='grid-three'>
              <div className='heading' id='session-label'> Session Length </div>

              <div className='classbutton'>
              <div className='buttons' id='session-decrement' onClick={()=>this.Decrement('session')}>-</div>
              <div className='break-session' id='session-length'>{this.state.sessionlength}</div>
              <div className='buttons' id='session-increment' onClick={()=>this.Increment('session')}>+</div>
              </div>
            </div>

              <div className='grid-four'>
                <div className='classbutton'>
                   {button}
                  <button className='grid-four-class' id='reset' onClick={this.reset}> <FontAwesome className='fa fa-refresh' name='refresh' size='2x' id='reset' onClick={this.reset}/> </button>
                </div>
              </div>

              <audio id='beep' src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" ref={(audio)=>{this.audiobeep = audio}}></audio>

          </div>

        </div>
      </div>
    </div>
  );
}
}

export default App;
