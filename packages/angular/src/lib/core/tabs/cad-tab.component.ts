import { Component, input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@cad/core';

@Component({
  selector: 'cad-ui-angular-tab',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <cad-tab [attr.panel]="panel()" [attr.disabled]="disabled() ? '' : null">
      <ng-content></ng-content>
    </cad-tab>
  `,
})
export class CadUiAngularTabComponent {
  panel = input<string>('');
  disabled = input<boolean>(false);
}
