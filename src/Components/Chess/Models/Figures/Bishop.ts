import { Figure, FigureName } from './Figure';
import Cell from "Components/Chess/Models/Cell";
import Colors from "Components/Chess/Models/Colors";

import blackLogo from 'Assets/black-bishop.png'
import whiteLogo from 'Assets/white-bishop.png'

export default class Bishop extends Figure {

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = FigureName.BISHOP;
    this.logo =
      color === Colors.BLACK
        ? blackLogo
        : whiteLogo;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }

    // diagonal available cells to move
    if (this.cell.isEmptyDiagonal(target)) {
      return true;
    }

    return false;
  }
}