import React, { HTMLAttributes, useEffect, useRef } from 'react';
import '@cad/core';

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

declare namespace JSX {
  interface IntrinsicElements {
    'cad-tabs': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        orientation?: string;
        'active-tab'?: string;
      },
      HTMLElement
    >;
    'cad-tab': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        panel?: string;
        disabled?: boolean;
      },
      HTMLElement
    >;
    'cad-tab-panel': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        name?: string;
      },
      HTMLElement
    >;
  }
}

export const CadTabs: React.FC<CadTabsProps> = ({
  children,
  orientation,
  activeTab,
  onActiveTabChange,
  ...rest
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ name: string }>;
      if (onActiveTabChange) {
        onActiveTabChange(customEvent.detail.name);
      }
    };

    el.addEventListener('cad-tabs-change', handleChange);
    return () => {
      el.removeEventListener('cad-tabs-change', handleChange);
    };
  }, [onActiveTabChange]);

  return (
    <cad-tabs
      ref={ref}
      orientation={orientation}
      active-tab={activeTab}
      {...rest}
    >
      {children}
    </cad-tabs>
  );
};

export const CadTab: React.FC<CadTabProps> = ({
  children,
  panel,
  disabled,
  ...rest
}) => {
  return (
    <cad-tab panel={panel} disabled={disabled ? true : undefined} {...rest}>
      {children}
    </cad-tab>
  );
};

export const CadTabPanel: React.FC<CadTabPanelProps> = ({
  children,
  name,
  ...rest
}) => {
  return (
    <cad-tab-panel name={name} {...rest}>
      {children}
    </cad-tab-panel>
  );
};
