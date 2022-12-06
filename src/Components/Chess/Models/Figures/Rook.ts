import { Figure, FigureName } from './Figure';
import { Cell } from '../Cell';
import { Colors } from '../Colors';

import blackLogo from '../../../../Assets/black-rook.png'
import whiteLogo from '../../../../Assets/white-rook.png'

export class Rook extends Figure {

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = FigureName.ROOK;
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

    return false;
  }
}