import { useState } from "react";
import Board from "./Board";
import Select from "react-select";

function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;
    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1)
      }

      function jumpTo(nextMove) {
        const nextHistory = history.slice(0, nextMove + 1);
        setHistory(nextHistory);
        setCurrentMove(nextMove);
      }
    
      const options = history.map((squares, move) => {
        let description;
        if (move > 0) {
          description = "Go to move #" + move;
        } else {
          description = "Go to game start";
        }
        return {
          value: move,
          label: description,
        };
      });
      const handleChange = (selectedOption) => {
        jumpTo(selectedOption.value);
      };

      return (
        <div className="game">
          <div className="game-board">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          </div>
          <div className="game-info">
            <Select
              options={options}
              onChange={handleChange}
              placeholder="Select a move"
            />
          </div>
        </div>
      );
  }

  export default Game