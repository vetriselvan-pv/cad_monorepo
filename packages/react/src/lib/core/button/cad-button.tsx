import React  from 'react';
import '@cad/core';
import { CadButtonProps } from '../../model/cad-button.model';




export const CadButton: React.FC<CadButtonProps> = ({
  children,
  variant,
  disabled,
  ...rest
}) => {
  return (
    <cad-button
      variant={variant}
      disabled={disabled ? true : undefined}
      {...rest}
    >
      {children}
    </cad-button>
  );
};
