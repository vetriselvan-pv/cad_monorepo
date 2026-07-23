import { BaseComponent } from '../base/base-component.js';

export class CadTab extends BaseComponent {
  static get observedAttributes() {
    return ['active', 'disabled'];
  }

  get panel(): string {
    return this.getAttribute('panel') || '';
  }

  set panel(value: string) {
    this.setAttribute('panel', value);
  }

  get active(): boolean {
    return this.hasAttribute('active');
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }

  set disabled(value: boolean) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('slot')) {
      this.setAttribute('slot', 'nav');
    }
    this.setAttribute('role', 'tab');
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '-1');
    }
    if (this.hasAttribute('disabled')) {
      this.setAttribute('aria-disabled', 'true');
    }
    this.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    if (name === 'disabled') {
      this.setAttribute('aria-disabled', String(this.disabled));
    }
    this.render();
  }

  private handleClick() {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('cad-tab-select', {
        detail: { tab: this },
        bubbles: true,
        composed: true,
      }),
    );
  }

  protected getStyles(): string {
    return `
      :host {
        display: inline-flex;
        align-items: center;
        padding: 0.6em 1.2em;
        cursor: pointer;
        font-family: inherit;
        font-size: 1rem;
        font-weight: 500;
        color: #495057;
        background: transparent;
        border: none;
        border-bottom: 2px solid transparent;
        margin-bottom: -2px;
        user-select: none;
      }

      :host([orientation="vertical"]) {
        border-bottom: none;
        border-right: 2px solid transparent;
        margin-bottom: 0;
        margin-right: -2px;
        justify-content: flex-start;
      }

      :host(:hover:not([disabled])) {
        color: #007bff;
      }

      :host([active]) {
        color: #007bff;
        border-bottom-color: #007bff;
      }

      :host([orientation="vertical"][active]) {
        border-right-color: #007bff;
      }

      :host([disabled]) {
        color: #adb5bd;
        cursor: not-allowed;
        pointer-events: none;
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

if (!customElements.get('cad-tab')) {
  customElements.define('cad-tab', CadTab);
}
