import React, { useState } from 'react';

const PLAYER = 'X';
const AI = 'O';

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [status, setStatus] = useState('Player Turn');

    const checkWin = (currentBoard, player) =>
        winPatterns.some((pattern) =>
            pattern.every((index) => currentBoard[index] === player)
        );

    const checkDraw = (currentBoard) =>
        currentBoard.every((cell) => cell !== null);

    const handlePlayerMove = (index) => {
        if (!isPlayerTurn || board[index] || status !== 'Player Turn') return;

        const newBoard = board.map((cell, i) => (i === index ? PLAYER : cell));
        setBoard(newBoard);

        if (checkWin(newBoard, PLAYER)) {
            setStatus('Player Wins!');
        } else if (checkDraw(newBoard)) {
            setStatus('Draw!');
        } else {
            setIsPlayerTurn(false);
            setStatus('AI Turn');
            setTimeout(() => handleAiMove(newBoard), 500);
        }
    };

    const handleAiMove = (currentBoard) => {
        const availableMoves = currentBoard
            .map((cell, index) => (cell === null ? index : null))
            .filter((index) => index !== null);

        const randomMove =
            availableMoves[Math.floor(Math.random() * availableMoves.length)];
        const newBoard = currentBoard.map((cell, i) =>
            i === randomMove ? AI : cell
        );
        setBoard(newBoard);

        if (checkWin(newBoard, AI)) {
            setStatus('AI Wins!');
        } else if (checkDraw(newBoard)) {
            setStatus('Draw!');
        } else {
            setIsPlayerTurn(true);
            setStatus('Player Turn');
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsPlayerTurn(true);
        setStatus('Player Turn');
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Tic Tac Toe</h1>
            <p>{status}</p>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 100px)',
                    gap: '10px',
                }}
            >
                {board.map((cell, index) => (
                    <button
                        key={index}
                        onClick={() => handlePlayerMove(index)}
                        style={{
                            width: '100px',
                            height: '100px',
                            fontSize: '2rem',
                            cursor: 'pointer',
                            color: cell === PLAYER ? 'blue' : 'red',
                        }}
                    >
                        {cell}
                    </button>
                ))}
            </div>
            <button
                onClick={resetGame}
                style={{ marginTop: '20px', padding: '10px', fontSize: '1rem' }}
            >
                Reset Game
            </button>
        </div>
    );
};

export default TicTacToe;
