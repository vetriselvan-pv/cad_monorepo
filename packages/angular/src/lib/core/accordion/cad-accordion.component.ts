import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  output,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  viewChild
} from '@angular/core';
import '@cad/core';

@Component({
  selector: 'cad-ui-angular-accordion',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <cad-accordion
      #accordionEl
      [attr.multiple]="multiple() ? '' : null"
      [attr.heading-level]="headingLevel()"
    >
      <ng-content></ng-content>
    </cad-accordion>
  `,
})
export class CadUiAngularAccordionComponent implements AfterViewInit, OnDestroy {
  multiple = input<boolean>(false);
  headingLevel = input<number>(3);

  itemToggle = output<{ name: string; expanded: boolean }>();

  readonly accordionEl = viewChild.required<ElementRef<HTMLElement>>('accordionEl');

  private handleChange = (event: Event) => {
    const customEvent = event as CustomEvent<{ name: string; expanded: boolean }>;
    this.itemToggle.emit(customEvent.detail);
  };

  ngAfterViewInit() {
    const accordionEl = this.accordionEl();
    if (accordionEl) {
      accordionEl.nativeElement.addEventListener(
        'cad-accordion-change',
        this.handleChange,
      );
    }
  }

  ngOnDestroy() {
    const accordionEl = this.accordionEl();
    if (accordionEl) {
      accordionEl.nativeElement.removeEventListener(
        'cad-accordion-change',
        this.handleChange,
      );
    }
  }
}
