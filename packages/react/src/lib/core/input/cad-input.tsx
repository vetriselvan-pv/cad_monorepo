import React, {  useEffect, useRef } from 'react';
import '@cad/core';
import { CadInputProps } from '../../model/cad-input.model';

export const CadInput: React.FC<CadInputProps> = ({
  value,
  placeholder,
  type = 'text',
  disabled,
  onValueChange,
  ...rest
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleInput = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (onValueChange) {
        onValueChange(customEvent.detail.value);
      }
    };

    el.addEventListener('cad-input', handleInput);
    return () => {
      el.removeEventListener('cad-input', handleInput);
    };
  }, [onValueChange]);

  return (
    <cad-input
      ref={ref}
      value={value}
      placeholder={placeholder}
      type={type}
      disabled={disabled ? true : undefined}
      {...rest}
    />
  );
};
