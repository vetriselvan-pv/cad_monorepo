import { HTMLAttributes } from "react";

export interface CadInputProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'onChange' | 'onInput'
> {
  value?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}