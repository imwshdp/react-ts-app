import Board from '../Models/Board';
import { FigureName } from '../Models/Figures/Figure';

import Knight from 'Components/Chess/Models/Figures/Knight';
import Bishop from 'Components/Chess/Models/Figures/Bishop';
import Pawn from 'Components/Chess/Models/Figures/Pawn';
import King from 'Components/Chess/Models/Figures/King';
import Rook from 'Components/Chess/Models/Figures/Rook';
import Queen from 'Components/Chess/Models/Figures/Queen';

export const getDeepCopyBoard = (board: Board): Board => {
	const copyBoard = new Board();
	copyBoard.initCells();

	for (let i = 0; i < copyBoard.cells.length; i++) {
		for (let j = 0; j < copyBoard.cells[i].length; j++) {
			const currentCell = board.getCell(i, j);
			const figureColor = currentCell.figure?.color;

			if (figureColor) {
				switch (currentCell.figure?.name) {
					case FigureName.BISHOP:
						new Bishop(figureColor, copyBoard.getCell(i, j));
						break;

					case FigureName.KING:
						new King(figureColor, copyBoard.getCell(i, j));
						break;

					case FigureName.KNIGHT:
						new Knight(figureColor, copyBoard.getCell(i, j));
						break;

					case FigureName.PAWN:
						new Pawn(figureColor, copyBoard.getCell(i, j));
						break;

					case FigureName.QUEEN:
						new Queen(figureColor, copyBoard.getCell(i, j));
						break;

					case FigureName.ROOK:
						new Rook(figureColor, copyBoard.getCell(i, j));
						break;
				}
			}
		}
	}

	return copyBoard;
};
