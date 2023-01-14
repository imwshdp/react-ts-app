import { Figure } from './Figures/Figure';
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

  // kings cells
  whiteKing: Cell | undefined = undefined;
  blackKing: Cell | undefined = undefined;

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = []
      // row creating
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
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

    newBoard.whiteKing = this.whiteKing;
    newBoard.blackKing = this.blackKing;

    if (!!newBoard.whiteKing) newBoard.whiteKing.available = false;
    if (!!newBoard.blackKing) newBoard.blackKing.available = false;

    return newBoard;
  }

  isKingUnderAttack(cells: Cell[][], king: Cell | undefined) {
    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[i].length; j++) {
        const cell = cells[i][j];
        // if (king?.figure?.checked === false && !!cell?.figure?.canMove(king)) {
        if (king?.figure?.checked === false && !!cell?.figure?.canMove(king)) {
          king.figure.checked = true;
          return true;
        }
      }
    }
    return false;
  }

  isKingCanEscape(kingColor: Colors, toCell: Cell): boolean | void {

    let king = kingColor === Colors.WHITE ? this.whiteKing : this.blackKing;
    let cell = this.getCell(toCell.x, toCell.y);
    if (!!king) {
      // king moving
      this.getCell(king.x, king.y).moveFigure(cell);

      if (king.figure) {
        king.figure.checked = false;
        king.available = false;
      }

      if (!this.isKingUnderAttack(this.cells, cell)) {
        console.log('Король может сбежать на клетку: ', cell.x, cell.y)
        return true;
      }
      return false;
    }
  }

  isCheckmate(king: Cell): boolean {
    let cells = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        // search into available to moving cells
        if (Math.abs(king.x - j) <= 1 && Math.abs(king.y - i) <= 1) {
          // find empty or occupied by the enemy cells
          if (this.cells[i][j].figure == null || this.cells[i][j].figure?.color !== king.figure?.color) {
            // save cells
            cells.push(this.cells[i][j])
          }
        }
      }
    }

    console.log(cells);

    for (let cell of cells) {
      let copyBoard = this.getCopyBoard();
      if (!!king.figure?.color) {
        // if true - checkmate checkout failed
        if (copyBoard.isKingCanEscape(king.figure.color, cell)) {
          // king can escape
          console.log('is Checkmate вернул false');
          return false;
        }
      }
    }

    // checkmate confirmed
    console.log('is Checkmate вернул true')
    return true;
  }

  public kingsVulnerabilityChecking() {
    let whiteKing = this.whiteKing;
    let blackKing = this.blackKing;

    if (!!whiteKing) {
      whiteKing.available = false; // prevent kings beating
      if (!!whiteKing && this.isKingUnderAttack(this.cells, whiteKing)) { // if king under attack
        whiteKing.available = false; // prevent kings beating
        // checkmate checkout
        if (this.isCheckmate(whiteKing)) {
          console.log('checkmate');
        }
      }
    }

    if (!!blackKing) {
      blackKing.available = false; // prevent kings beating
      if (!!blackKing && this.isKingUnderAttack(this.cells, blackKing)) { // if king under attack
        blackKing.available = false; // prevent kings beating
        // checkmate checkout
        if (this.isCheckmate(blackKing)) {
          console.log('checkmate');
        }
      }
    }
  }

  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
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
  }

  // adding figures methods
  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCell(i, 1))
      new Pawn(Colors.WHITE, this.getCell(i, 6))
    }
  }

  private addKings() {
    let whiteKing = new King(Colors.BLACK, this.getCell(4, 0))
    let blackKing = new King(Colors.WHITE, this.getCell(4, 7))

    // kings saving
    this.whiteKing = whiteKing.cell;
    this.blackKing = blackKing.cell;
  }

  private addQueens() {
    new Queen(Colors.BLACK, this.getCell(3, 0))
    // new Queen(Colors.WHITE, this.getCell(3, 7))
    new Queen(Colors.WHITE, this.getCell(4, 4))
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