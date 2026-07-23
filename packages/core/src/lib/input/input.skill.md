---
name: cad-input
description: Learn how to use the cad-input web component and its framework wrappers
---

# `cad-input`

The `cad-input` component provides a standard text input field.

## Vanilla Web Component

```html
<cad-input
  value="Initial text"
  placeholder="Enter text..."
  disabled
></cad-input>

<script>
  const input = document.querySelector('cad-input');
  input.addEventListener('cad-input', (e) => {
    console.log('Value changed:', e.detail.value);
  });
</script>
```

## React

```tsx
import { CadInput } from '@cad/cad-ui-react';
import { useState } from 'react';

function MyComponent() {
  const [val, setVal] = useState('');

  return (
    <CadInput
      value={val}
      placeholder="Enter something"
      onValueChange={setVal}
    />
  );
}
```

## Angular (Latest - Signals based)

```typescript
import { Component, signal } from '@angular/core';
import { CadUiAngularInputComponent } from '@cad/cad-ui-angular';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CadUiAngularInputComponent],
  template: `
    <cad-ui-angular-input
      [value]="myValue()"
      (valueChange)="myValue.set($event)"
      placeholder="Enter text"
    >
    </cad-ui-angular-input>
  `,
})
export class AppComponent {
  myValue = signal('');
}
```

## Vue (Latest - script setup + v-model)

```vue
<script setup>
import { ref } from 'vue';
import { CadInput } from '@cad/cad-ui-vue';

const text = ref('');
</script>

<template>
  <CadInput v-model="text" placeholder="Type here..." />
</template>
```
