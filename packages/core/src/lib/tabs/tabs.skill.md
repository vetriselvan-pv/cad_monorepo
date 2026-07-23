---
name: cad-tabs
description: Learn how to use the cad-tabs web component (with WCAG/WAI-ARIA tabs support) and its framework wrappers
---

# `cad-tabs`

`cad-tabs` is a framework-agnostic tab group built from three Web Components:

- `<cad-tabs>` — the container. Renders the `role="tablist"` region and orchestrates selection, keyboard navigation, and ARIA wiring.
- `<cad-tab>` — an individual tab (`role="tab"`), placed in the `nav` slot.
- `<cad-tab-panel>` — the content panel (`role="tabpanel"`) associated with a tab.

## Accessibility (WCAG / WAI-ARIA)

Implements the [WAI-ARIA APG Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) with automatic activation:

- `role="tablist"`, `role="tab"`, and `role="tabpanel"` are set automatically.
- `aria-selected`, `aria-controls`, and `aria-labelledby` are wired up automatically by matching each `<cad-tab panel="name">` to its `<cad-tab-panel name="name">`.
- Roving `tabindex` — only the active tab is in the Tab sequence (`tabindex="0"`); inactive tabs are `tabindex="-1"`.
- Keyboard support: `ArrowLeft`/`ArrowRight` move and activate the previous/next tab (`ArrowUp`/`ArrowDown` when `orientation="vertical"`), `Home`/`End` jump to the first/last enabled tab, and disabled tabs are skipped.
- `aria-disabled` and `aria-orientation` are reflected automatically.
- Visible `:focus-visible` outline on tabs and panels.

## Vanilla Web Component

```html
<cad-tabs active-tab="general">
  <cad-tab slot="nav" panel="general">General</cad-tab>
  <cad-tab slot="nav" panel="advanced">Advanced</cad-tab>
  <cad-tab slot="nav" panel="billing" disabled>Billing</cad-tab>

  <cad-tab-panel name="general">This is the general tab panel.</cad-tab-panel>
  <cad-tab-panel name="advanced">This is the advanced tab panel.</cad-tab-panel>
  <cad-tab-panel name="billing">This is the billing tab panel.</cad-tab-panel>
</cad-tabs>

<script>
  const tabs = document.querySelector('cad-tabs');
  tabs.addEventListener('cad-tabs-change', (e) => {
    console.log('Active tab:', e.detail.name);
  });
</script>
```

Set `orientation="vertical"` on `<cad-tabs>` for a vertical tab list (switches keyboard support to `ArrowUp`/`ArrowDown`).

### Attributes / Properties

| Element           | Attribute     | Type                             | Default        | Description                                                    |
| :---------------- | :------------ | :-------------------------------- | :------------- | :-------------------------------------------------------------- |
| `<cad-tabs>`       | `orientation` | `'horizontal' \| 'vertical'`      | `'horizontal'` | Layout and keyboard navigation direction.                       |
| `<cad-tabs>`       | `active-tab`  | `string`                          | first enabled tab | Name of the currently active panel/tab. Reflects on selection. |
| `<cad-tab>`        | `panel`       | `string`                          | —              | Name of the `<cad-tab-panel>` this tab controls.                |
| `<cad-tab>`        | `disabled`    | `boolean`                         | `false`        | Disables selection and keyboard focus for this tab.             |
| `<cad-tab-panel>`  | `name`        | `string`                          | —              | Matches a `<cad-tab panel="...">` value.                        |

### Events

| Event             | Detail            | Description                                    |
| :---------------- | :----------------- | :---------------------------------------------- |
| `cad-tabs-change`  | `{ name: string }`  | Dispatched on `<cad-tabs>` when the active tab changes. |

## React

```tsx
import { CadTabs, CadTab, CadTabPanel } from '@cad/react';
import { useState } from 'react';

function MyComponent() {
  const [active, setActive] = useState('general');

  return (
    <CadTabs activeTab={active} onActiveTabChange={setActive}>
      <CadTab slot="nav" panel="general">General</CadTab>
      <CadTab slot="nav" panel="advanced">Advanced</CadTab>

      <CadTabPanel name="general">This is the general tab panel.</CadTabPanel>
      <CadTabPanel name="advanced">This is the advanced tab panel.</CadTabPanel>
    </CadTabs>
  );
}
```

## Angular (Signals based)

```typescript
import { Component, signal } from '@angular/core';
import {
  CadUiAngularTabsComponent,
  CadUiAngularTabComponent,
  CadUiAngularTabPanelComponent,
} from '@cad/angular';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [
    CadUiAngularTabsComponent,
    CadUiAngularTabComponent,
    CadUiAngularTabPanelComponent,
  ],
  template: `
    <cad-ui-angular-tabs
      [activeTab]="active()"
      (activeTabChange)="active.set($event)"
    >
      <cad-ui-angular-tab slot="nav" panel="general">General</cad-ui-angular-tab>
      <cad-ui-angular-tab slot="nav" panel="advanced">Advanced</cad-ui-angular-tab>

      <cad-ui-angular-tab-panel name="general">This is the general tab panel.</cad-ui-angular-tab-panel>
      <cad-ui-angular-tab-panel name="advanced">This is the advanced tab panel.</cad-ui-angular-tab-panel>
    </cad-ui-angular-tabs>
  `,
})
export class AppComponent {
  active = signal('general');
}
```

## Vue (script setup + v-model)

```vue
<script setup>
import { ref } from 'vue';
import { CadTabs, CadTab, CadTabPanel } from '@cad/vue';

const active = ref('general');
</script>

<template>
  <CadTabs v-model="active">
    <CadTab slot="nav" panel="general">General</CadTab>
    <CadTab slot="nav" panel="advanced">Advanced</CadTab>

    <CadTabPanel name="general">This is the general tab panel.</CadTabPanel>
    <CadTabPanel name="advanced">This is the advanced tab panel.</CadTabPanel>
  </CadTabs>
</template>
```
