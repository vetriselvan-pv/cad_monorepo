import { Component, input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@cad/core';

@Component({
  selector: 'cad-ui-angular-accordion-item',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <cad-accordion-item
      [attr.name]="name()"
      [attr.expanded]="expanded() ? '' : null"
      [attr.disabled]="disabled() ? '' : null"
    >
      <ng-content select="[slot=heading]"></ng-content>
      <ng-content></ng-content>
    </cad-accordion-item>
  `,
})
export class CadUiAngularAccordionItemComponent {
  name = input<string>('');
  expanded = input<boolean>(false);
  disabled = input<boolean>(false);
}
