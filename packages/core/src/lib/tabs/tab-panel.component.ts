import { BaseComponent } from '../base/base-component.js';

export class CadTabPanel extends BaseComponent {
  static get observedAttributes() {
    return ['active'];
  }

  get name(): string {
    return this.getAttribute('name') || '';
  }

  set name(value: string) {
    this.setAttribute('name', value);
  }

  get active(): boolean {
    return this.hasAttribute('active');
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tabpanel');
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    this.render();
  }

  protected getStyles(): string {
    return `
      :host {
        display: none;
      }
      :host([active]) {
        display: block;
      }
      :host(:focus-visible) {
        outline: 2px solid #007bff;
        outline-offset: 2px;
      }
    `;
  }

  protected getTemplate(): string {
    return `<slot></slot>`;
  }
}

if (!customElements.get('cad-tab-panel')) {
  customElements.define('cad-tab-panel', CadTabPanel);
}
