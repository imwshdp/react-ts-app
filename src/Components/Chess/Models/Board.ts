import { Figure, FigureName } from './Figures/Figure';
import { Knight } from './Figures/Knight';
import { Bishop } from './Figures/Bishop';
import { Pawn } from './Figures/Pawn';
import { King } from './Figures/King';
import { Rook } from './Figures/Rook';
import { Queen } from './Figures/Queen';
import { Cell } from "./Cell";
import { Colors } from "./Colors";

export class Board {

  // cells grid
  cells: Cell[][] = []

  // lost figures
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];

  public initCells() {
    for(let i = 0; i < 8; i++) {
      
      const row: Cell[] = []

      // row creating
      for(let j = 0; j < 8; j++) {
        if((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null)) // black cells
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null)) // white cells
        }
      }

      // row pushing
      this.cells.push(row)
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  // create and return copy of this board
  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    return newBoard;
  }

  public highlightCells(selectedCell: Cell | null) {
    for(let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for(let j = 0; j < row.length; j++) {
        const target = row[j];
        // get boolean value of move availability
        target.available = !!selectedCell?.figure?.canMove(target)
      }
    }
  }

  addLostFigure(figure: Figure) {
    figure.color === Colors.BLACK
      ? this.lostBlackFigures.push(figure)
      : this.lostWhiteFigures.push(figure)

    if(figure.name === FigureName.KING) {
      // end of the game
      //this.endGame(figure.color);
    }
  }

  // adding figures methods

  private addPawns() {
    for(let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1))
      new Pawn(Colors.WHITE, this.getCell(i, 6))
    }
  }

  private addKings() {
    new King(Colors.BLACK, this.getCell(4, 0))
    new King(Colors.WHITE, this.getCell(4, 7))
  }

  private addQueens() {
    new Queen(Colors.BLACK, this.getCell(3, 0))
    new Queen(Colors.WHITE, this.getCell(3, 7))
  }

  private addBishops() {
    new Bishop(Colors.BLACK, this.getCell(2, 0))
    new Bishop(Colors.BLACK, this.getCell(5, 0))
    new Bishop(Colors.WHITE, this.getCell(2, 7))
    new Bishop(Colors.WHITE, this.getCell(5, 7))
  }

  private addKnights() {
    new Knight(Colors.BLACK, this.getCell(1, 0))
    new Knight(Colors.BLACK, this.getCell(6, 0))
    new Knight(Colors.WHITE, this.getCell(1, 7))
    new Knight(Colors.WHITE, this.getCell(6, 7))
  }

  private addRooks() {
    new Rook(Colors.BLACK, this.getCell(0, 0))
    new Rook(Colors.BLACK, this.getCell(7, 0))
    new Rook(Colors.WHITE, this.getCell(0, 7))
    new Rook(Colors.WHITE, this.getCell(7, 7))
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