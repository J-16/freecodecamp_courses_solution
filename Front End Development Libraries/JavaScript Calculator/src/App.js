import './App.css';
import React from 'react'
import { evaluate } from "mathjs";

class App extends React.Component {
constructor(props){
  super(props)
  this.state={
    displayone: "",
    displaytwo:'0',
    currentvalue: '',
    previousvalue: '',
  }

  this.displaytwoupdate = this.displaytwoupdate.bind(this)
  this.displayclear = this.displayclear.bind(this)
  this.calculate = this.calculate.bind(this)
  this.decimal = this.decimal.bind(this)
  this.operation = this.operation.bind(this)
  this.displayzero = this.displayzero.bind(this)
}

displayzero(val){
  if(!this.state.displayone == 0){
    this.displaytwoupdate('0')
  }
}

decimal (){
  if(this.state.currentvalue.search(/\./g) === -1 ){
    this.displaytwoupdate('.');
  }
}

operation(val){
  this.setState({
    previousvalue: this.state.previousvalue + this.state.currentvalue + val,
    currentvalue: '',
    displayone: this.state.displayone+val,
    displaytwo: this.state.displayone+val
  })

}

displaytwoupdate(val){

  this.setState({
    currentvalue: this.state.currentvalue+val,
    displayone: this.state.displayone+val,
    displaytwo: this.state.displayone+val
  })
}


displayclear(){
  this.setState({
    displayone: '',
    displaytwo: '0',
    previousvalue: '',
    currentvalue:'',
  })
}

calculate(){
  var val = this.state.previousvalue + this.state.currentvalue
  val = val.replace(/[*+‑/]$/, '')
  val = val.replace(/([*][-][+])+/g, '+')
  console.log(val)
  val = Math.round(1000000000000 * evaluate(val)) / 1000000000000
  this.setState({ 
    previousvalue:  '',
    currentvalue:val,
    displayone: this.state.displayone + '=' + val,
    displaytwo: val
  });
}

  render(){
  return (
    <div className="App">
      <div id='calc-background'>
        <div className='display'>
          <div className='display-one' >{this.state.displayone}</div>
          <div className='display-two' id='display'>{this.state.displaytwo}</div>
        </div>
        <div id='buttons'>
        <div id='button-inner'>
          <div className='numbers divide' id='divide' onClick={()=>this.operation('/')}>/</div>
          <div className='numbers subtract' id='subtract' onClick={()=>this.operation('-')}>-</div>
          <div className='numbers add' id='add' onClick={()=>this.operation('+')}>+</div>
          <div className='numbers multiply' id='multiply' onClick={()=>this.operation('*')}>*</div>

          <div className='numbers zero' id='zero' onClick={()=>this.displayzero('0')}>0</div>


          <div className='numbers one' id='one' onClick={()=>this.displaytwoupdate('1')}>1</div>
          <div className='numbers two' id='two' onClick={()=>this.displaytwoupdate('2')}>2</div>
          <div className='numbers three' id='three' onClick={()=>this.displaytwoupdate('3')}>3</div>
          <div className='numbers four' id='four' onClick={()=>this.displaytwoupdate('4')}>4</div>
          <div className='numbers five' id='five' onClick={()=>this.displaytwoupdate('5')}>5</div>
          <div className='numbers six' id='six' onClick={()=>this.displaytwoupdate('6')}>6</div>
          <div className='numbers seven' id='seven' onClick={()=>this.displaytwoupdate('7')}>7</div>
          <div className='numbers eight' id='eight' onClick={()=>this.displaytwoupdate('8')}>8</div>
          <div className='numbers nine' id='nine' onClick={()=>this.displaytwoupdate('9')}>9</div>

          <div className='numbers decimal' id='decimal' onClick={this.decimal}>.</div>

          <div className='numbers equals' id='equals' onClick={() => this.calculate()}>=</div>
          <div className='numbers clear' id='clear' onClick={this.displayclear}>AC</div>
        </div>
        </div>
      </div>
    </div>
  );
}
}
export default App;
