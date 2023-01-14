import { Figure, FigureName } from './Figure';
import Cell from "Components/Chess/Models/Cell";
import Colors from "Components/Chess/Models/Colors";

import blackLogo from 'Assets/black-king.png'
import whiteLogo from 'Assets/white-king.png'

export default class King extends Figure {

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.name = FigureName.KING;
    this.logo =
      color === Colors.BLACK
        ? blackLogo
        : whiteLogo;

    this.checked = false;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }

    // if X or Y coords differents are less than or equal to 1 = TRUE
    if (Math.abs(this.cell.x - target.x) <= 1
      && Math.abs(this.cell.y - target.y) <= 1) {
      return true;
    }

    return false;
  }
}