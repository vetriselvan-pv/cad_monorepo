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
import '@cad/core'; // Register the web component

@Component({
  selector: 'cad-ui-angular-input',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <cad-input
      #inputEl
      [attr.value]="value()"
      [attr.placeholder]="placeholder()"
      [attr.type]="type()"
      [attr.disabled]="disabled() ? '' : null"
    >
    </cad-input>
  `,
})
export class CadUiAngularInputComponent implements AfterViewInit, OnDestroy {
  value = input<string>('');
  placeholder = input<string>('');
  type = input<string>('text');
  disabled = input<boolean>(false);

  valueChange = output<string>();

  readonly inputEl = viewChild.required<ElementRef<HTMLElement>>('inputEl');

  private handleInput = (event: Event) => {
    const customEvent = event as CustomEvent;
    this.valueChange.emit(customEvent.detail.value);
  };

  ngAfterViewInit() {
    const inputEl = this.inputEl();
    if (inputEl) {
      inputEl.nativeElement.addEventListener(
        'cad-input',
        this.handleInput,
      );
    }
  }

  ngOnDestroy() {
    const inputEl = this.inputEl();
    if (inputEl) {
      inputEl.nativeElement.removeEventListener(
        'cad-input',
        this.handleInput,
      );
    }
  }
}
