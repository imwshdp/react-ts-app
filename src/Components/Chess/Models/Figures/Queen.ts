import { Figure, FigureName } from './Figure';
import { Cell } from '../Cell';
import { Colors } from '../Colors';

import blackLogo from '../../../../Assets/black-queen.png'
import whiteLogo from '../../../../Assets/white-queen.png'

export class Queen extends Figure {

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = FigureName.QUEEN;
    this.logo =
      color === Colors.BLACK
      ? blackLogo
      : whiteLogo;
  }

  canMove(target: Cell): boolean {
    if(!super.canMove(target)) {
      return false;
    }

    // vertical available cells to move
    if(this.cell.isEmptyVertical(target)) {
      return true;
    }

     // vertical available cells to move
     if(this.cell.isEmptyHorizontal(target)) {
      return true;
    }

    // diagonal available cells to move
    if(this.cell.isEmptyDiagonal(target)) {
      return true;
    }

    return false;
  }
}