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
  selector: 'cad-ui-angular-tabs',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <cad-tabs
      #tabsEl
      [attr.orientation]="orientation()"
      [attr.active-tab]="activeTab()"
    >
      <ng-content></ng-content>
    </cad-tabs>
  `,
})
export class CadUiAngularTabsComponent implements AfterViewInit, OnDestroy {
  orientation = input<'horizontal' | 'vertical'>('horizontal');
  activeTab = input<string | undefined>(undefined);

  activeTabChange = output<string>();

  readonly tabsEl = viewChild.required<ElementRef<HTMLElement>>('tabsEl');

  private handleChange = (event: Event) => {
    const customEvent = event as CustomEvent<{ name: string }>;
    this.activeTabChange.emit(customEvent.detail.name);
  };

  ngAfterViewInit() {
    const tabsEl = this.tabsEl();
    if (tabsEl) {
      tabsEl.nativeElement.addEventListener(
        'cad-tabs-change',
        this.handleChange,
      );
    }
  }

  ngOnDestroy() {
    const tabsEl = this.tabsEl();
    if (tabsEl) {
      tabsEl.nativeElement.removeEventListener(
        'cad-tabs-change',
        this.handleChange,
      );
    }
  }
}
