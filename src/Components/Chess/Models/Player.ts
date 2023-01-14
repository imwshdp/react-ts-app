import Colors from "Components/Chess/Models/Colors";

export default class Player {
  color: Colors;

  constructor(color: Colors) {
    this.color = color;
  }
}