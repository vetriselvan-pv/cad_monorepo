import { BaseComponent } from '../base/base-component.js';

export class CadInput extends BaseComponent {
  private _inputElement!: HTMLInputElement;

  static get observedAttributes() {
    return ['value', 'placeholder', 'type', 'disabled'];
  }

  get value(): string {
    return this.getAttribute('value') || '';
  }

  set value(val: string) {
    this.setAttribute('value', val);
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }

  set disabled(val: boolean) {
    if (val) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
  }

  protected getTemplate(): string {
    return `
      <style>
        :host {
          display: inline-block;
          font-family: inherit;
        }
        input {
          padding: 8px 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
          box-sizing: border-box;
        }
        input:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 3px rgba(0,123,255,0.25);
        }
        input:disabled {
          background-color: #f8f9fa;
          cursor: not-allowed;
          opacity: 0.65;
        }
      </style>
      <input type="text" />
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._inputElement = this.shadowRoot!.querySelector('input')!;
    this._inputElement.addEventListener('input', this.handleInput);
    this.updateInputAttributes();
  }

  disconnectedCallback() {
    if (this._inputElement) {
      this._inputElement.removeEventListener('input', this.handleInput);
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.updateInputAttributes();
    }
  }

  private updateInputAttributes() {
    if (!this._inputElement) return;

    this._inputElement.value = this.getAttribute('value') || '';
    this._inputElement.placeholder = this.getAttribute('placeholder') || '';
    this._inputElement.type = this.getAttribute('type') || 'text';
    this._inputElement.disabled = this.hasAttribute('disabled');
  }

  private handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    
    // Dispatch a custom event that framework wrappers can listen to
    this.dispatchEvent(new CustomEvent('cad-input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('cad-input', CadInput);
