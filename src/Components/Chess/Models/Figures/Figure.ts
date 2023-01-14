import Cell from "Components/Chess/Models/Cell";
import Colors from "Components/Chess/Models/Colors";
import logo from 'Assets/black-king.png'

export enum FigureName {
  FIGURE = "Фигура",
  KING = "Король",
  KNIGHT = "Конь",
  PAWN = "Пешка",
  QUEEN = "Ферзь",
  ROOK = "Ладья",
  BISHOP = "Слон",
}

export class Figure {
  color: Colors;
  logo: typeof logo | null;
  cell: Cell;
  name: FigureName;
  id: number;
  checked?: boolean;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;

    // adding figure on cell
    this.cell.figure = this;

    this.logo = null;
    this.name = FigureName.FIGURE;

    this.id = Math.random()
  }

  canMove(target: Cell): boolean {
    // self figure beating prevention
    if (target.figure?.color === this.color)
      return false;

    return true;
  }

  moveFigure(target: Cell) { }
};
