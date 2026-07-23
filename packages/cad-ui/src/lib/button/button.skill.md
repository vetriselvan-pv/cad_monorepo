---
name: cad-ui-button
description: Documentation and instructions for using the `<cad-button>` web component from the cad-ui library in React and Angular applications.
---

# CadButton (`<cad-button>`)

The `cad-button` is a framework-agnostic web component built using Vanilla TypeScript and standard Web Component APIs (Custom Elements, Shadow DOM). It provides a styled, accessible button that can be used in any frontend framework.

## API Reference

### Attributes / Properties

| Attribute | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'primary' \| 'secondary' \| 'danger'` | `'primary'` | The visual style variant of the button. |
| `disabled` | `boolean` | `false` | Whether the button is disabled. If true, adds the `disabled` attribute. |

### Slots

| Name | Description |
| :--- | :--- |
| `default` | The content to display inside the button (e.g., text or icons). |

## Usage in React

To use `<cad-button>` in a React application:

1. Import the component to register it:
   ```typescript
   import '@cad/cad-ui'; // Or the specific path to the index
   ```

2. Use it in JSX. Since React uses synthetic events and doesn't fully support all web component features natively, basic attributes and string properties work fine. For complex properties or custom events, you might need a wrapper or ref, but for this button, standard JSX works:
   ```tsx
   export function App() {
     return (
       <div>
         <cad-button variant="primary">Primary Button</cad-button>
         <cad-button variant="secondary">Secondary Button</cad-button>
         <cad-button variant="danger" disabled>Disabled Danger</cad-button>
       </div>
     );
   }
   ```
   *(Note: For React 19+, Web Component support is native and much better!)*

## Usage in Angular

To use `<cad-button>` in an Angular application:

1. Import the component in your `main.ts` or `app.component.ts`:
   ```typescript
   import '@cad/cad-ui';
   ```

2. Add `CUSTOM_ELEMENTS_SCHEMA` to your Angular Module or Standalone Component to tell Angular to ignore unknown tags:
   ```typescript
   import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

   @Component({
     selector: 'app-root',
     standalone: true,
     schemas: [CUSTOM_ELEMENTS_SCHEMA],
     template: `
       <cad-button variant="primary">Angular Button</cad-button>
       <cad-button [attr.variant]="dynamicVariant" [attr.disabled]="isDisabled ? '' : null">Dynamic</cad-button>
     `
   })
   export class AppComponent {
     dynamicVariant = 'secondary';
     isDisabled = true;
   }
   ```
   *(Note: Angular uses `[attr.name]` for binding to standard HTML attributes on custom elements, or you can bind directly to properties if they are defined on the class).*
