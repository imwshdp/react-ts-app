import Cell from 'Components/Chess/Models/Cell';
import Colors from 'Components/Chess/Models/Colors';

import { Figure } from './Figures/Figure';
import Knight from 'Components/Chess/Models/Figures/Knight';
import Bishop from 'Components/Chess/Models/Figures/Bishop';
import Pawn from 'Components/Chess/Models/Figures/Pawn';
import King from 'Components/Chess/Models/Figures/King';
import Rook from 'Components/Chess/Models/Figures/Rook';
import Queen from 'Components/Chess/Models/Figures/Queen';
import { getDeepCopyBoard } from '../Helpers/Copying';

class Board {
	// cells grid
	cells: Cell[][] = [];

	// lost figures
	lostBlackFigures: Figure[] = [];
	lostWhiteFigures: Figure[] = [];

	// kings cells
	whiteKing: Cell | undefined = undefined;
	blackKing: Cell | undefined = undefined;

	// figures that pose a danger to kings
	dangerousForWhiteKing: Cell[] = [];
	dangerousForBlackKing: Cell[] = [];

	public initCells() {
		for (let i = 0; i < 8; i++) {
			const row: Cell[] = [];
			for (let j = 0; j < 8; j++) {
				if ((i + j) % 2 !== 0) {
					row.push(new Cell(this, j, i, Colors.BLACK, null)); // black cells
				} else {
					row.push(new Cell(this, j, i, Colors.WHITE, null)); // white cells
				}
			}
			this.cells.push(row); // row pushing
		}
	}

	public getCell(x: number, y: number) {
		return this.cells[y][x];
	}

	// create and return copy of this board
	public getCopyBoard(): Board {
		const newBoard = new Board();
		newBoard.cells = this.cells;

		newBoard.lostBlackFigures = [];
		newBoard.lostWhiteFigures = [];

		newBoard.whiteKing = this.whiteKing;
		newBoard.blackKing = this.blackKing;

		return newBoard;
	}

	public checkmateCheck(): boolean {
		// check if kings are in danger
		for (let i = 0; i < this.cells.length; i++) {
			for (let j = 0; j < this.cells[i].length; j++) {
				const cell = this.getCell(i, j);

				// white king checking
				if (this.whiteKing && cell.figure?.canMove(this.whiteKing)) {
					this.dangerousForWhiteKing.push(cell); // save to dangerous figures list
					if (!!this.whiteKing.figure) this.whiteKing.figure.checked = true; // mark the check
				}

				// black king checking
				if (this.blackKing && cell.figure?.canMove(this.blackKing)) {
					this.dangerousForBlackKing.push(cell); // save to dangerous figures list
					if (!!this.blackKing.figure) this.blackKing.figure.checked = true; // mark the check
				}
			}
		}

		// checking end of the game for checked king
		if (this.whiteKing?.figure?.checked && this.checkEndgame(this.whiteKing)) {
			return true;
		}

		if (this.blackKing?.figure?.checked && this.checkEndgame(this.blackKing)) {
			return true;
		}

		return false;
	}

	public isKingInDanger(king: Cell, cells: Cell[][]): boolean {
		for (let i = 0; i < cells.length; i++) {
			for (let j = 0; j < cells[i].length; j++) {
				if (cells[j][i].figure?.canMove(king)) {
					return true;
				}
			}
		}
		return false;
	}

	public checkEndgame(king: Cell): boolean | void {
		let newPotentialBoard: Board = getDeepCopyBoard(this); // copy of board with new context
		let cellsOfPotentialBoard: Cell[][] = newPotentialBoard.cells; // cells of board with new context

		const cellsToEscape: Cell[] = []; // array with all cells to escape for king

		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				let x = king.x + i;
				let y = king.y + j;
				if (x >= 0 && x < 8 && y >= 0 && y < 8) {
					// if cell exists on board and
					if (
						newPotentialBoard.cells[y][x].figure === null || // if cell is empty
						newPotentialBoard.cells[y][x].figure?.color !== king.figure?.color // or occupied by opponent
					) {
						cellsToEscape.push(newPotentialBoard.getCell(x, y)); // push cell to array of variants for escaping
					}
				}
			}
		}

		// checking variants when king can escape
		for (let cellToEscape of cellsToEscape) {
			newPotentialBoard = getDeepCopyBoard(this); // new variant of board
			cellsOfPotentialBoard = newPotentialBoard.cells; // cells of new board

			const kingPosition = newPotentialBoard.getCell(king.x, king.y); // current king position
			const newKingPotentialPosition = newPotentialBoard.getCell(
				cellToEscape.x,
				cellToEscape.y
			); // new potential king position

			kingPosition.moveFigure(newKingPotentialPosition); // moving king to new potential position

			const isNewPositionDangerous = newPotentialBoard.isKingInDanger(
				newKingPotentialPosition,
				cellsOfPotentialBoard
			);

			if (!isNewPositionDangerous) {
				return false;
			}
		}

		// TODO
		const dangerousFigures =
			king.figure?.color === Colors.WHITE
				? this.dangerousForWhiteKing
				: this.dangerousForBlackKing;

		// checking variants when the king can be covered by friendly figure
		// OR
		// variants when a dangerous figure can be defeated
		for (let i = 0; i < this.cells.length; i++) {
			for (let j = 0; j < this.cells[i].length; j++) {
				const cell = this.cells[i][j];
				if (cell.figure && cell.figure.color === king.figure?.color) {
					// if cell contains friendly figure - iterate all possible figure moves
					if (this.isFigureMoveCanCoverCheck(cell, king)) {
						return false;
					}
				}
			}
		}

		// confirm end of the game
		return true;
	}

	public isFigureMoveCanCoverCheck(cell: Cell, king: Cell): boolean {
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 8; j++) {
				const newPotentialBoard: Board = getDeepCopyBoard(this);
				const cellsOfPotentialBoard: Cell[][] = newPotentialBoard.cells;

				const currentCell = newPotentialBoard.getCell(cell.x, cell.y);
				const kingCell = newPotentialBoard.getCell(king.x, king.y);

				currentCell.moveFigure(newPotentialBoard.getCell(i, j));

				if (!this.isKingInDanger(kingCell, cellsOfPotentialBoard)) {
					return true;
				}
			}
		}
		return false;
	}

	public blockCells(): void {
		for (let i = 0; i < this.cells.length; i++) {
			for (let j = 0; j < this.cells[i].length; j++) {
				this.getCell(i, j).blocked = true;
			}
		}
	}

	public highlightCells(selectedCell: Cell | null) {
		for (let i = 0; i < this.cells.length; i++) {
			const row = this.cells[i];
			for (let j = 0; j < row.length; j++) {
				const target = row[j];

				// get boolean value of availability to move
				target.available = !!selectedCell?.figure?.canMove(target);
			}
		}
	}

	addLostFigure(figure: Figure) {
		figure.color === Colors.BLACK
			? this.lostBlackFigures.push(figure)
			: this.lostWhiteFigures.push(figure);
	}

	// adding figures methods
	private addPawns() {
		for (let i = 0; i < 8; i++) {
			if (i === 4) {
				new Pawn(Colors.WHITE, this.getCell(i, 6));
				continue;
			}
			new Pawn(Colors.BLACK, this.getCell(i, 1));
			new Pawn(Colors.WHITE, this.getCell(i, 6));
		}
	}

	private addKings() {
		let blackKing = new King(Colors.BLACK, this.getCell(4, 0));
		let whiteKing = new King(Colors.WHITE, this.getCell(4, 7));

		// kings saving
		this.whiteKing = whiteKing.cell;
		this.blackKing = blackKing.cell;
	}

	private addQueens() {
		// new Queen(Colors.BLACK, this.getCell(3, 0));
		// new Queen(Colors.WHITE, this.getCell(3, 7))
		new Queen(Colors.WHITE, this.getCell(4, 5));
	}

	private addBishops() {
		new Bishop(Colors.BLACK, this.getCell(2, 0));
		// new Bishop(Colors.BLACK, this.getCell(5, 0));
		new Bishop(Colors.WHITE, this.getCell(2, 7));
		new Bishop(Colors.WHITE, this.getCell(5, 7));
	}

	private addKnights() {
		new Knight(Colors.BLACK, this.getCell(1, 0));
		new Knight(Colors.BLACK, this.getCell(6, 0));
		new Knight(Colors.WHITE, this.getCell(1, 7));
		new Knight(Colors.WHITE, this.getCell(6, 7));
	}

	private addRooks() {
		new Rook(Colors.BLACK, this.getCell(0, 0));
		new Rook(Colors.BLACK, this.getCell(7, 0));
		// new Rook(Colors.WHITE, this.getCell(0, 7))
		new Rook(Colors.WHITE, this.getCell(4, 4));
		new Rook(Colors.WHITE, this.getCell(7, 7));
	}

	public addFigures() {
		this.addPawns();
		this.addKings();
		this.addQueens();
		this.addBishops();
		this.addKnights();
		this.addRooks();
	}
}

export default Board;
