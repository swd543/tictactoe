import React, { Component } from "react";
import "./App.css";
import Tic from "./components/Tic";

interface IState {
  game: (boolean | null)[][];
  xTurn: boolean;
}
interface IProps {}

class App extends Component<IProps, IState> {
  initState = () => ({
    game: [[null, null, null], [null, null, null], [null, null, null]],
    xTurn: true
  });

  state = this.initState();

  resetState = () => {
    this.setState(this.initState());
  };

  clickHandler = (x: number, y: number) => {
    const { game } = this.state;

    if (game[x][y] === null) {
      this.setState(
        prevState => {
          prevState.game[x][y] = prevState.xTurn;
          return { game: prevState.game, xTurn: !prevState.xTurn };
        },
        () => {
          this.checkWin();
        }
      );
    } else {
      alert("Dude, that spot is already taken.");
    }
  };

  checkWin = () => {
    const { game } = this.state;

    // Horizontal, vertical check
    for (var i = 0; i < game.length; i++) {
      var xCountHor = 0,
        oCountHor = 0,
        xCountVer = 0,
        oCountVer = 0;
      for (var j = 0; j < game[i].length; j++) {
        game[i][j] === true && xCountHor++;
        game[j][i] === true && xCountVer++;
        game[i][j] === false && oCountHor++;
        game[j][i] === false && oCountVer++;
      }
      if (xCountHor === game.length || xCountVer === game.length) {
        alert("X wins!");
      } else if (oCountHor === game.length || oCountVer === game.length) {
        alert("O wins!");
      }
    }

    // Diagonal check
    {
      var xCountLD = 0,
        oCountLD = 0,
        xCountRD = 0,
        oCountRD = 0;
      for (var i = 0; i < game.length; i++) {
        game[i][i] === true && xCountLD++;
        game[i][game.length - i - 1] === true && xCountRD++;
        game[i][i] === false && oCountLD++;
        game[i][game.length - i - 1] === false && oCountRD++;
      }
      if (xCountLD === game.length || xCountRD === game.length) {
        alert("X wins!");
      } else if (oCountLD === game.length || oCountRD === game.length) {
        alert("O wins!");
      }
    }
  };

  render() {
    const { game, xTurn } = this.state;
    return (
      <div className="App">
        <header className="App-header">Tic tac toe by Takti Nanu</header>
        <div className="App-body">
          <table>
            <tbody>
              {game.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>
                      <Tic
                        value={cell}
                        clickHandler={this.clickHandler.bind(this, i, j)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            {xTurn === true && "Hey X, its your turn!"}
            {xTurn === false && "Hey O, its your turn!"}
          </p>
          <button onClick={this.resetState}>Reset</button>
        </div>
      </div>
    );
  }
}

export default App;
