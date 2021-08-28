import React, { useState, useEffect } from "react";
import "./styles.css";
import { Game } from "./game";
import { RenderRow } from "../RenderRow";

const game = new Game(3);

export default function App() {
  const [board, setBoard] = useState(game.board);

  const movePlayer = (row, col) => {
    const result = game.move({ row, col });
    console.log(row, col, result);
    if (result?.length > 0) {
      setTimeout(() => {
        const msg =
          result === "tie" ? "Tie... No winner" : `${result} is winner`;
        alert(msg);
        game.reset();
        setBoard([...game.board]);
      }, 1000);
    }
    setBoard([...game.board]);
  };

  const getRowsData = function () {
    return board.map((rows, index) => {
      return (
        <tr key={index}>
          <RenderRow
            key={index}
            data={rows}
            onClick={(col) => movePlayer(index, col)}
          />
        </tr>
      );
    });
  };

  return (
    <div className="App">
      <table>
        <tbody>{getRowsData()}</tbody>
      </table>
    </div>
  );
}
