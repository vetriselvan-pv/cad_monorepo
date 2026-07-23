import { Component, input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@cad/core';

@Component({
  selector: 'cad-ui-angular-tab-panel',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <cad-tab-panel [attr.name]="name()">
      <ng-content></ng-content>
    </cad-tab-panel>
  `,
})
export class CadUiAngularTabPanelComponent {
  name = input<string>('');
}
