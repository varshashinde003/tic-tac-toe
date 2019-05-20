import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null,
      isGameEnded: false,
      winner: null,
      resultToBeDeclared: "",
      board: Array(9).fill(""),
      counter: 0
    }
    this.selectPlayer = this.selectPlayer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkWinner = this.checkWinner.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  selectPlayer(player) {
    this.setState({
      player: player
    })
  }

  handleClick =  async (index) => {
    if (!this.state.board[index] && !this.state.winner) {
      let newBoard = this.state.board;
      newBoard[index] = this.state.player;
      await this.setState({
        board: newBoard,
        player: this.state.player === "X" ? "O" : "X",
        counter: this.state.counter + 1
      });
      const result = this.checkWinner();
      if (result === "X") {
        this.setState({
          isGameEnded: true,
          winner: "X",
          resultToBeDeclared: "Match Won By X",
        })
      } else if (result === "O") {
        this.setState({
          isGameEnded: true,
          winner: "O",
          resultToBeDeclared: "Match Won By O",
        })
      } else if (result === "draw") {
        this.setState({
          isGameEnded: true,
          winner: "DRAW",
          resultToBeDeclared: "Game is Drawn",
        })
      }
    }
  }

  checkWinner() {
    const moves = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    const { board, counter } = this.state;
    for (let i = 0; i < moves.length; i++) {
      if (board[moves[i][0]] && board[moves[i][0]] === board[moves[i][1]] && board[moves[i][1]] === board[moves[i][2]]) {
        return board[moves[i][2]];
      } 
    } 

    if(counter === 9) {
      return "draw";
    }
    return "";
    
  }

  restartGame() {
    this.setState({
      player: null,
      isGameEnded: false,
      winner: null,
      resultToBeDeclared: "",
      board: Array(9).fill(null),
      counter: 0
    })
  }

  render() {
    const { resultToBeDeclared, winner, player } = this.state;

    return (
      <div id="tic-tac-toe">
        <div id="head"> TIC-TAC-TOE BY VARSHA </div>

        {!player ? <Player onChange={this.selectPlayer} /> : ""}

        {resultToBeDeclared ? <h4> {resultToBeDeclared} </h4> : ""}

        {player ? <ShowBoard board={this.state.board} onClick={this.handleClick} restartGame={this.restartGame} winner={winner} player={player} /> : ""}
      </div>
    );
  }
}

const ShowBoard = props => {
  const { winner, board, onClick, restartGame, player } = props;
  return (
    <>
      {winner ? "" : <h4>Next Player is {player} </h4>}
      <div id="board">
        {board.map((item, index) =>
          <div className="square" key={index} onClick={() => onClick(index)}>{item}</div>
        )}
      </div>
      <div className="footer">
        <button type="button" disabled={!winner  || winner === "draw"} className="reset-btn" onClick={restartGame}>
          Restart
          </button>
      </div>
    </>
  )
}

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onChange(e.target.player.value)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} id="select-player">
        <label>
          <input type="radio" name="player" value="X" className="m-1" />
          Player X
        </label>
        <label className="ml-2">
          <input type="radio" name="player" value="O" className="m-1" />
          Player O
        </label><br />
        <button type="submit" className="start-game-btn mt-2">Start</button>
      </form>
    )
  }
}

export default App;
