import { Figure, FigureName } from './Figure';
import { Cell } from '../Cell';
import { Colors } from '../Colors';

import blackLogo from '../../../../Assets/black-knight.png'
import whiteLogo from '../../../../Assets/white-knight.png'

export class Knight extends Figure {

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = FigureName.KNIGHT;
    this.logo =
      color === Colors.BLACK
      ? blackLogo
      : whiteLogo;
  }

  canMove(target: Cell): boolean {
    if(!super.canMove(target)) {
      return false;
    }

    const deltaX = Math.abs(this.cell.x - target.x);
    const deltaY = Math.abs(this.cell.y - target.y);

    return (deltaX === 1 && deltaY === 2) || (deltaX === 2 && deltaY === 1)
  }
}