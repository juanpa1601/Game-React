import React from "react";
import Board from "./Board";
import { useState } from 'react';

const Game = () => {
    const [isNext, setIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0); 
    const currentSquares = history[currentMove];
    
    const handlePlay = (nextSquares) => {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setIsNext(!isNext);
    };

    const jumpTo = (nextMove) => {
        setCurrentMove(nextMove);
        setIsNext((nextMove % 2) === 0);
    };

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0){
            description = 'Ir al movimiento #' + move;
        } else {
            description = 'Ir al inicio del juego';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>
                    {description}
                </button>
            </li>
        );
    });


    return (
        <>
           <div className="game">
                <div className="game-board">
                    <Board isNext={isNext} squares={currentSquares} onPlay={handlePlay}/>
                </div>
                <div className="game-info">
                    <ol>{moves}</ol>
                </div>
            </div> 
        </>
    );
};

export default Game;