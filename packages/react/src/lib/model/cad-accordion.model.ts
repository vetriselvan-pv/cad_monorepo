import { HTMLAttributes } from "react";

export interface CadAccordionProps extends HTMLAttributes<HTMLElement> {
  multiple?: boolean;
  headingLevel?: number;
  onItemToggle?: (name: string, expanded: boolean) => void;
}

export interface CadAccordionItemProps extends HTMLAttributes<HTMLElement> {
  name?: string;
  expanded?: boolean;
  disabled?: boolean;
}
