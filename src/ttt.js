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

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      squares: Array(this.props.rows * this.props.cols).fill(null),
      xIsNext: true,
    };
    this.forLoop = this.forLoop.bind(this);
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
      <div>
        <div className='status'>{status}</div>
        {this.forLoop()}
        <br/>
        <button onClick={() =>this.ulangi()}>Reset Game</button>
      </div>
    );
  }
  ulangi(){
    win = false;
    this.setState({
      squares:Array(this.props.rows * this.props.cols).fill(null),
      xIsNext:true
    })
    ReactDOM.render(
      <Game />,
      document.getElementById('container')
    )
  }
}

class Game extends React.Component {
  constructor(){
    super();
    this.state = {
    // input how many rows, columns, and strikes
      rows : 10,
      cols : 10,
      strikes : 10
    }
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board cols={this.state.cols} rows={this.state.rows} strikes={this.state.strikes}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ===============================================================================================================

function calculateWinner(squares, index, cols, strikes) {
  var counter;
  var handle = true;
  var a = squares[index];
  var b = index;
  var c = index;
  if (win === false){
    // ----------------------------------------------diagonal1
    counter = cols + 1;
    loop();
  };
  if (win === false){
    // ----------------------------------------------diagonal2
    counter = cols - 1;  
    loop();    
  };
  if (win === false){
    // ----------------------------------------------horizontal
    counter = 1;
    loop();
  };
  if (win === false){
    // ----------------------------------------------vertical
    counter = cols;
    loop();
  };
  if (win === true){
    const output = squares[index];
    return output;
  } else {
    return null
  };
  // ----------------------------------------------loop function  
  function loop(){
    for (let i = 0; i < strikes; i++){
      if (handle === true){
        if ((a === squares[b]) && (a !== null)){
          handle = true;
          win = true;
          b = b + counter;
        } else {
          handle = false;
          win = false;
        };
      };
    };
    for (let i = 0; i < strikes; i++){
      if (handle === false){
        if ((a === squares[c])&&(a !== null)){
          handle = false;
          win = true;
          c = c - counter;
        } else {
          handle = true;
          win = false;
        };
      };
    };
    handle = true;
    b = index;
    c = index;
  }
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