import { Cell } from './../Cell';
import { Colors } from './../Colors';
import logo from '../../../../Assets/black-king.png'

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

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    
    // adding figure on cell
    this.cell.figure = this;

    this.logo = null; 
    this.name = FigureName.FIGURE;

    this.id = Math.random()
  }

  canMove(target: Cell) : boolean {

    // self figure beating prevention
    if(target.figure?.color === this.color)
      return false;

    // checkmate
    if(target.figure?.name === FigureName.KING)
      return true;

    return true;
  }

  moveFigure(target: Cell) {
    
  }

};
