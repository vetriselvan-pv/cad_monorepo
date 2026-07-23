import { HTMLAttributes } from "react";

export interface CadTabsProps extends HTMLAttributes<HTMLElement> {
  orientation?: 'horizontal' | 'vertical';
  activeTab?: string;
  onActiveTabChange?: (name: string) => void;
}

export interface CadTabProps extends HTMLAttributes<HTMLElement> {
  panel?: string;
  disabled?: boolean;
}

export interface CadTabPanelProps extends HTMLAttributes<HTMLElement> {
  name?: string;
}
