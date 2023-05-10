import React, { FC, useState, useEffect } from 'react';
import 'Styles/Chess.css';

import CellComponent from 'Components/Chess/CellComponent';
import Board from 'Components/Chess/Models/Board';
import Cell from 'Components/Chess/Models/Cell';
import Colors from 'Components/Chess/Models/Colors';
import Player from 'Components/Chess/Models/Player';
import { FigureName } from 'Components/Chess/Models/Figures/Figure';

interface BoardProps {
	board: Board;
	setBoard: (board: Board) => void;
	currentPlayer: Player | null;
	swapPlayer: () => void;

	isGameActive: boolean;
	setIsGameActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const BoardComponent: FC<BoardProps> = ({
	board,
	setBoard,
	currentPlayer,
	swapPlayer,
	isGameActive,
	setIsGameActive,
}) => {
	const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

	useEffect(() => {
		highlightCells();
	}, [selectedCell]);

	function handleClick(cell: Cell) {
		if (cell.blocked) return;
		if (!isGameActive) setIsGameActive(true);

		// MOVING TO CELL
		if (
			selectedCell &&
			selectedCell !== cell &&
			selectedCell.figure?.canMove(cell)
		) {
			// check state rewriting for kings to false
			if (!!board.whiteKing && board.whiteKing.figure) {
				board.whiteKing.figure.checked = false;
				board.dangerousForWhiteKing = [];
			}

			if (!!board.blackKing && board.blackKing.figure) {
				board.blackKing.figure.checked = false;
				board.dangerousForBlackKing = [];
			}

			if (selectedCell.figure?.name === FigureName.KING) {
				selectedCell.figure.color === Colors.WHITE
					? (board.whiteKing = cell)
					: (board.blackKing = cell);
			}

			selectedCell.moveFigure(cell);
			setSelectedCell(null);

			checkmateCheck();

			// swap player
			swapPlayer();
		} else {
			// PICKING CELL
			if (cell.figure?.color === currentPlayer?.color) {
				setSelectedCell(cell); // if cell contains figure - change state and select this cell
			}
		}
	}

	// highlight available cells
	function highlightCells() {
		board.highlightCells(selectedCell);
		updateBoard();
	}

	function checkmateCheck() {
		const result = board.checkmateCheck();
		if (result) {
			// game ended
			setSelectedCell(null);
			console.log('GAME ENDED');
			setIsGameActive(false);
			blockCells();
		}
	}

	function updateBoard() {
		const newBoard = board.getCopyBoard();
		setBoard(newBoard);
	}

	function blockCells() {
		board.blockCells();
	}

	return (
		<>
			<h3>
				Сейчас ходит{' '}
				{currentPlayer?.color === Colors.WHITE ? 'белый' : 'чёрный'} игрок
			</h3>
			<div className='board'>
				{board.cells.map((row, index) => (
					<React.Fragment key={index}>
						{row.map(cell => (
							<CellComponent
								cell={cell}
								key={cell.id}
								selected={
									cell.x === selectedCell?.x && cell.y === selectedCell?.y
										? true
										: false
								}
								click={handleClick}
							/>
						))}
					</React.Fragment>
				))}
			</div>
		</>
	);
};

export default BoardComponent;
