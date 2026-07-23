import { HTMLAttributes } from "react";

export interface CadButtonProps extends HTMLAttributes<HTMLElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}