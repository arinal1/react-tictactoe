import React from 'react';
import ReactDOM from 'react-dom';
var win = false;


function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()} key={props.index}>
    {props.value}
    </button>
    );
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      squares: Array(this.props.rows * this.props.cols).fill(null),
      xIsNext: true,
    };
    this.forLoop = this.forLoop.bind(this);
    this.changeSetting = this.changeSetting.bind(this);
    reRender = reRender.bind(this)
  }
  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} index={i} key={i}/>;
  }
  handleClick(i) {
    let cols = this.props.cols;
    let strikes = this.props.strikes;
    const squares = this.state.squares.slice();
    var winner = calculateWinner(squares, i, cols, strikes);
    if ((win == true) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      index: i,
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
  forLoop(){
    let rows = this.props.rows;
    let cols = this.props.cols;
    var index = 0;
    var temp=[];
    var boardRows=[];
    for (let u = 1; u <= rows; u++){
      for (let i = 1; i <= cols; i++) {
        temp.push(this.renderSquare(index));
        index = index + 1;
      };
      boardRows.push(<div className="board-row" key={u}>{temp}</div>);
      temp = [];
    }
    return (
      boardRows
      )
  }

  render() {
    let rows = this.props.rows;
    let cols = this.props.cols;
    let strikes = this.props.strikes;
    let i = this.state.index;
    const winner = calculateWinner(this.state.squares, i, cols, strikes);
    let draw = drawGame(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (draw){
      status = 'Game Draw';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className='konten'>
      <div className='inline'>
      <legend>Setting Board</legend>
      <table cellSpacing='5px'>
      <tbody>
      <tr><td>Rows </td><td>:</td><td><input id='rows'></input></td></tr>
      <tr><td>Cols </td><td>:</td><td><input id='cols'></input></td></tr>
      <tr><td>Strikes </td><td>:</td><td><input id='strikes'></input></td></tr>
      <tr>
      <td><button onClick={() =>reRender(rows,cols,strikes)}>Reset Game</button></td>
      <td colSpan="2" style={{textAlign:"right"}}><button onClick={()=>this.changeSetting()}>Change Setting</button></td>
      </tr>
      </tbody>              
      </table>
      </div>
      <div className='inline'>
      <div className='status'>{status}</div>
      {this.forLoop()}
      </div>
      </div>
      );
  }

  changeSetting(){
    var rows = Number(document.getElementById('rows').value)
    var cols = Number(document.getElementById('cols').value)
    var strikes = Number(document.getElementById('strikes').value)    
    if (rows == 0 || isNaN(rows)){
      rows = this.props.rows
    }
    if (cols == 0 || isNaN(cols)){
      cols = this.props.cols
    }
    if (strikes == 0 || isNaN(strikes)){
      strikes = this.props.strikes
    }
    reRender(rows,cols,strikes)
  }
}

Game.defaultProps = {
  rows : 3,
  cols : 3,
  strikes : 3
};

Game.propsTypes = {
  rows : React.PropTypes.number,
  cols : React.PropTypes.number,
  strikes : React.PropTypes.number
};

function reRender(r,c,s){
  win = false;
  this.setState({
    index:0,
    squares:Array(r * c).fill(null),
    xIsNext:true
  });
  ReactDOM.render(
    <Game rows={r} cols={c} strikes={s}/>,
    document.getElementById('container')
    );
  document.getElementById('rows').value = ""
  document.getElementById('cols').value = ""
  document.getElementById('strikes').value = ""
}

// ===============================================================================================================

function calculateWinner(squares, index, cols, strikes) {
  var counter;
  var a = squares[index];
  var b = index;
  var c = index;
  var if1 = true;
  var if2 = true;
  var poin = 1;
  var current;
  if (win == false){
    // ----------------------------------------------diagonal1
    current = "diagonal1"
    counter = cols + 1;
    loop();
  };
  if (win == false){
    // ----------------------------------------------diagonal2
    current = "diagonal2"
    counter = cols - 1;
    b = index;
    c = index;
    for (let i = 1; i < strikes;i++){
      // console.log("b,b' = ",Math.abs(parseInt(b/cols)) , Math.abs(parseInt((b+counter)/cols)))
      // console.log("c,c' = ",Math.abs(parseInt(b/cols)) , Math.abs(parseInt((c-counter)/cols)))
      if (Math.abs(parseInt(b/cols)) != Math.abs(parseInt((b+counter)/cols))){
        if (if1 == true){
          b = b + counter;
          if (a==squares[b] && a != null){
            console.log("a==b",a,b)
            poin = poin + 1;
            
          } else {
            if1 = false;
          };
        };
      } else {if1 = false}
      if (Math.abs(parseInt(index/cols)) != Math.abs(parseInt((c-counter)/cols))){
        console.log(Math.abs(parseInt(b/cols)), Math.abs(parseInt((c-counter)/cols)))
        if (if2 == true){
          c=c-counter;
          if (a==squares[c] && a != null){
            // console.log("a==c",a,squares[c]," index : ",index,c)
            poin = poin + 1;
            
          } else {
            if2 = false;
          };
        };
      } else {if2 = false}
    }
    if (poin < strikes){
      win = false;
      poin = 1;
      if1 = true;
      if2 = true;
    } else if (poin >= strikes){
      win = true;
    };
    // loop()
  };
  if (win == false){
    // ----------------------------------------------horizontal
    current = "horizontal"
    counter = 1;
    loop();
  };
  if (win == false){
    // ----------------------------------------------vertical
    current = "vertical"
    counter = cols;
    loop();
  };
  if (win == true){
    const output = squares[index];
    console.log(current)
    return output;
  } else {
    return null
  };
  // ----------------------------------------------loop function  
  function loop(){
    b = index + counter;
    c = index - counter;
    for (let i=0; i<=strikes;i++){
      if (if1 == true){
        if (a==squares[b] && a != null){
          poin = poin + 1;
          b=b+counter;
        } else {
          if1 = false;
        };
      };
      if (if2 == true){
        if (a==squares[c] && a != null){
          poin = poin + 1;
          c=c-counter;
        } else {
          if2 = false;
        };
      };
      if (if1 == false && if2 == false) {
        i = strikes + 1;
      };
    };
    if (poin < strikes){
      win = false;
      poin = 1;
      if1 = true;
      if2 = true;
    } else if (poin >= strikes){
      win = true;
    };
  };
};

function drawGame(squares){
  var length = squares.length;
  var draw = false;
  for (let i = 0; i <= length; i++){
    if (squares[i] !== null){
      draw = true;
    } else {
      i = length + 1;
      draw = false;
    };
  };
  return draw
};

export default Game;