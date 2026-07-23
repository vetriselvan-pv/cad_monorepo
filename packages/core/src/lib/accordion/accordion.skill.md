---
name: cad-accordion
description: Learn how to use the cad-accordion web component (with WCAG/WAI-ARIA accordion support) and its framework wrappers
---

# `cad-accordion`

`cad-accordion` is a framework-agnostic accordion built from two Web Components:

- `<cad-accordion>` — the container. Orchestrates expand/collapse state (single or multiple expansion) and keyboard navigation between headers.
- `<cad-accordion-item>` — a single section, rendering an accessible header button (`slot="heading"`) and a collapsible panel (default slot).

## Accessibility (WCAG / WAI-ARIA)

Implements the [WAI-ARIA APG Accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/):

- Each header is a native `<button>` inside a `role="heading"` container (`aria-level` configurable via `heading-level` / `level`), so it's reachable via normal Tab order and activates on `Enter`/`Space` for free.
- `aria-expanded` on the header button and `aria-controls`/`aria-labelledby` linking the header to its `role="region"` panel are wired up automatically.
- Keyboard support: `ArrowDown`/`ArrowUp` move focus to the next/previous header, `Home`/`End` jump to the first/last enabled header, disabled items are skipped.
- `aria-disabled` is reflected automatically; disabled items are excluded from arrow-key navigation and cannot be toggled.
- Visible `:focus-visible` outline on headers.
- By default only one panel is expanded at a time (opening one collapses the others); add `multiple` on `<cad-accordion>` to allow several panels open simultaneously.

## Vanilla Web Component

```html
<cad-accordion>
  <cad-accordion-item name="general" expanded>
    <span slot="heading">General</span>
    <p>This is the general panel.</p>
  </cad-accordion-item>

  <cad-accordion-item name="advanced">
    <span slot="heading">Advanced</span>
    <p>This is the advanced panel.</p>
  </cad-accordion-item>

  <cad-accordion-item name="billing" disabled>
    <span slot="heading">Billing</span>
    <p>This is the billing panel.</p>
  </cad-accordion-item>
</cad-accordion>

<script>
  const accordion = document.querySelector('cad-accordion');
  accordion.addEventListener('cad-accordion-change', (e) => {
    console.log('Toggled:', e.detail.name, 'expanded:', e.detail.expanded);
  });
</script>
```

Add `multiple` to allow more than one panel open at once, and `heading-level="2"` to render headers as `aria-level="2"` (matching the surrounding page outline).

### Attributes / Properties

| Element                | Attribute       | Type      | Default | Description                                                     |
| :---------------------- | :-------------- | :-------- | :------ | :---------------------------------------------------------------- |
| `<cad-accordion>`       | `multiple`      | `boolean` | `false` | Allows more than one item to be expanded at a time.               |
| `<cad-accordion>`       | `heading-level` | `1-6`     | `3`     | `aria-level` applied to every item's header (propagated down).    |
| `<cad-accordion-item>`  | `name`          | `string`  | —       | Identifier reported in the `cad-accordion-change` event.          |
| `<cad-accordion-item>`  | `expanded`      | `boolean` | `false` | Whether the panel is open. Reflects on toggle.                     |
| `<cad-accordion-item>`  | `disabled`      | `boolean` | `false` | Disables toggling and keyboard focus for this item.                |

### Events

| Event                   | Detail                              | Description                                          |
| :----------------------- | :------------------------------------ | :------------------------------------------------------ |
| `cad-accordion-change`   | `{ name: string, expanded: boolean }` | Dispatched on `<cad-accordion>` when an item is toggled. |

## React

```tsx
import { CadAccordion, CadAccordionItem } from '@cad/react';

function MyComponent() {
  return (
    <CadAccordion multiple onItemToggle={(name, expanded) => console.log(name, expanded)}>
      <CadAccordionItem name="general" expanded>
        <span slot="heading">General</span>
        <p>This is the general panel.</p>
      </CadAccordionItem>
      <CadAccordionItem name="advanced">
        <span slot="heading">Advanced</span>
        <p>This is the advanced panel.</p>
      </CadAccordionItem>
    </CadAccordion>
  );
}
```

## Angular (Signals based)

```typescript
import { Component } from '@angular/core';
import {
  CadUiAngularAccordionComponent,
  CadUiAngularAccordionItemComponent,
} from '@cad/angular';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CadUiAngularAccordionComponent, CadUiAngularAccordionItemComponent],
  template: `
    <cad-ui-angular-accordion (itemToggle)="onToggle($event)">
      <cad-ui-angular-accordion-item name="general" [expanded]="true">
        <span slot="heading">General</span>
        <p>This is the general panel.</p>
      </cad-ui-angular-accordion-item>
      <cad-ui-angular-accordion-item name="advanced">
        <span slot="heading">Advanced</span>
        <p>This is the advanced panel.</p>
      </cad-ui-angular-accordion-item>
    </cad-ui-angular-accordion>
  `,
})
export class AppComponent {
  onToggle(event: { name: string; expanded: boolean }) {
    console.log(event.name, event.expanded);
  }
}
```

## Vue (script setup)

```vue
<script setup>
import { CadAccordion, CadAccordionItem } from '@cad/vue';
</script>

<template>
  <CadAccordion multiple @item-toggle="(name, expanded) => console.log(name, expanded)">
    <CadAccordionItem name="general" expanded>
      <template #heading>General</template>
      <p>This is the general panel.</p>
    </CadAccordionItem>
    <CadAccordionItem name="advanced">
      <template #heading>Advanced</template>
      <p>This is the advanced panel.</p>
    </CadAccordionItem>
  </CadAccordion>
</template>
```
