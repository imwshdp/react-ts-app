import React, {FC} from 'react';
import cl from "./Button.module.css"

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({children, onClick}) => {
  return (
    <button className={cl.Button} onClick={() => onClick()}>
      {children}
    </button>
  );
}

export default Button;