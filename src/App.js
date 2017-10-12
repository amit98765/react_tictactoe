import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Box extends Component {
  render() {
    return (
      <div className="box" onClick={() => this.props.clickHandler()}>
        {this.props.value}
      </div>
    );
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: Array(9).fill(null),
      isXNext: true
    }
  }
  whichBoxClicked(id) {
    let slicedGame = this.state.game.slice();

    //check if the box already has some value
    if (slicedGame[id - 1] === null) {

      // also check at each click we need to see if there is a winner

      if (!wehaveawinner(this.state.game)) {
        slicedGame[id - 1] = (this.state.isXNext) ? "X" : "O";
        this.setState({
          game: slicedGame,
          isXNext: !this.state.isXNext
        });

        console.log(slicedGame);
      }
    }
  }
  renderBox(id) {
    return <Box id={id} value={this.state.game[id - 1]} clickHandler={() => this.whichBoxClicked(id)} />
  }
  render() {


    return (<div>
      The next turn is {(this.state.isXNext) ? "X" : "O"}
      <div className="board">
        <div className="row">
          {this.renderBox("1")}
          {this.renderBox("2")}
          {this.renderBox("3")}
        </div>
        <div className="row">
          {this.renderBox("4")}
          {this.renderBox("5")}
          {this.renderBox("6")}
        </div>
        <div className="row">
          {this.renderBox("7")}
          {this.renderBox("8")}
          {this.renderBox("9")}

        </div>
      </div>
    </div>
    );
  }
}
function wehaveawinner(game) {
  const winPatterns = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
  ]

  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];

    if (game[a - 1] !== null && game[b - 1] !== null && game[c - 1] !== null)
      if (game[a - 1] === game[b - 1] && game[c - 1] === game[b - 1]) {
        game[a - 1] = game[b - 1] = game[c - 1] = "Y";
        console.log(game);
        return true;
      }
  }
  return false;
}
export default App;
