import React from 'react';
import ReactDOM from 'react-dom';
var lines = [];

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()} key={props.index}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(100).fill(null),
      xIsNext: true,
    };
    this.forLoop = this.forLoop.bind(this);
  }
  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} index={i} key={i}/>;
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
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
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
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
    this.setState({
      squares:Array(100).fill(null)
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
      rows : 3,
      cols : 10,
      strikes : 3 //still does not work if changed
    }
  }
  componentWillMount(){
  // preparation variables
    let rows = this.state.rows;
    let cols = this.state.cols;
    let strikes = this.state.strikes;
    var nilaiAkhir;
    var nilaiAkhir2;
    var a,b,c;
  // push horizontal lines
    a=0;
    b=1;
    c=2;
    nilaiAkhir = cols - (strikes - 1);
    nilaiAkhir2 = rows + 1;
    for (let u = 1; u < nilaiAkhir2; u++){
      loopABC();
      a = u * cols;
      b = a + 1;
      c = b + 1;
    };
    lines.push([a,b,c]);
  //push vertical lines
    a = 0;
    b = cols;
    c = cols * 2;
    nilaiAkhir = cols;
    nilaiAkhir2 = (rows - strikes) + 1;
    for (let u = 1; u <= nilaiAkhir2; u++){
      loopABC();  
      a = cols * u;
      b = cols * (u + 1);
      c = cols * (u + 2);
    };
    lines.push([a,b,c]);
  // push diagonal1 lines
    a = 0;
    b = cols + 1;
    c = b + (cols + 1);
    nilaiAkhir = cols - (strikes - 1);
    loopABC();
    lines.push([a,b,c]);
  // push diagonal2 lines
    a = strikes - 1;
    b = cols + 1;
    c = cols * 2;
    nilaiAkhir = cols - (strikes - 1);
    loopABC();
    lines.push([a,b,c]);
  // make a loop function
    function loopABC(){
      for (let i = 0; i < nilaiAkhir; i++){
        // console.log(a,b,c);
        lines.push([a,b,c]);
        a = a + 1;
        b = b + 1;
        c = c + 1;
      };
    }
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board cols={this.state.cols} rows={this.state.rows}/>
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

function calculateWinner(squares) {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
export default Game;