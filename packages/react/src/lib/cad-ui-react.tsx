import React, { HTMLAttributes } from 'react';

// Actually, we should import the core library so the web component is registered.
import '@cad/core';

export interface CadButtonProps extends HTMLAttributes<HTMLElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

declare namespace JSX {
  interface IntrinsicElements {
    'cad-button': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        variant?: string;
        disabled?: boolean;
      },
      HTMLElement
    >;
  }
}

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
