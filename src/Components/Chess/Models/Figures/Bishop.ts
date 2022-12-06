import { Figure, FigureName } from './Figure';
import { Cell } from '../Cell';
import { Colors } from '../Colors';

import blackLogo from '../../../../Assets/black-bishop.png'
import whiteLogo from '../../../../Assets/white-bishop.png'

export class Bishop extends Figure {

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = FigureName.BISHOP;
    this.logo =
      color === Colors.BLACK
      ? blackLogo
      : whiteLogo;
  }

  canMove(target: Cell): boolean {
    if(!super.canMove(target)) {
      return false;
    }
    
    // diagonal available cells to move
    if(this.cell.isEmptyDiagonal(target)) {
      return true;
    }

    return false;
  }
}