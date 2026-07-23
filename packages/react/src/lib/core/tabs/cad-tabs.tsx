import React, {  useEffect, useRef } from 'react';
import '@cad/core';
import { CadTabsProps, CadTabProps, CadTabPanelProps } from '../../model/cad-tabs.model';

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
