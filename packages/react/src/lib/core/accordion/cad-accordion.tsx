import React, { useEffect, useRef } from 'react';
import '@cad/core';
import { CadAccordionProps, CadAccordionItemProps } from '../../model/cad-accordion.model';

export const CadAccordion: React.FC<CadAccordionProps> = ({
  children,
  multiple,
  headingLevel,
  onItemToggle,
  ...rest
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ name: string; expanded: boolean }>;
      if (onItemToggle) {
        onItemToggle(customEvent.detail.name, customEvent.detail.expanded);
      }
    };

    el.addEventListener('cad-accordion-change', handleChange);
    return () => {
      el.removeEventListener('cad-accordion-change', handleChange);
    };
  }, [onItemToggle]);

  return (
    <cad-accordion
      ref={ref}
      multiple={multiple ? true : undefined}
      heading-level={headingLevel}
      {...rest}
    >
      {children}
    </cad-accordion>
  );
};

export const CadAccordionItem: React.FC<CadAccordionItemProps> = ({
  children,
  name,
  expanded,
  disabled,
  ...rest
}) => {
  return (
    <cad-accordion-item
      name={name}
      expanded={expanded ? true : undefined}
      disabled={disabled ? true : undefined}
      {...rest}
    >
      {children}
    </cad-accordion-item>
  );
};
