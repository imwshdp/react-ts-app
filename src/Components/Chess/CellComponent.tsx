import React, { FC } from "react";
import { Cell } from "./Models/Cell";

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({ cell, selected, click }) => {
  return (
    <div
      className={["cell", cell.color, selected ? "selected" : ""].join(" ")}
      onClick={() => {
        click(cell);
      }}
      // green background if cell contains figure and is available to move
      style={
        // background: cell.available && cell.figure ? "green" : ""
        cell.figure?.checked === true
        ? { background: "rgb(255, 99, 71)" }
        : { background: cell.available && cell.figure ? "green" : "" }
      }
    >
      {/* green marks of availability to move */}
      {cell.available && !cell.figure && <div className="available" />}

      {/* figures render */}
      {cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
    </div>
  );
};

export default CellComponent;
