import { Component, input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@cad/core';

@Component({
  selector: 'cad-ui-angular-button',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <cad-button [attr.variant]="variant()" [attr.disabled]="disabled() ? '' : null">
      <ng-content></ng-content>
    </cad-button>
  `,
})
export class CadUiAngularButtonComponent {
  variant = input<'primary' | 'secondary' | 'danger'>('primary');
  disabled = input<boolean>(false);
}
