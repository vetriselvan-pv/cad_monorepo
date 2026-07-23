import { BaseComponent } from '../base/base-component';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

export class CadButton extends BaseComponent {
  static get observedAttributes() {
    return ['variant', 'disabled'];
  }

  get variant(): ButtonVariant {
    return (this.getAttribute('variant') as ButtonVariant) || 'primary';
  }

  set variant(value: ButtonVariant) {
    this.setAttribute('variant', value);
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

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  protected getStyles(): string {
    return `
      button {
        font-family: inherit;
        font-size: 1rem;
        font-weight: 500;
        padding: 0.6em 1.2em;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s, color 0.2s, transform 0.1s;
      }

      button:active:not(:disabled) {
        transform: translateY(1px);
      }

      button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      /* Primary Variant */
      :host([variant="primary"]) button,
      :host(:not([variant])) button {
        background-color: #007bff;
        color: white;
      }
      :host([variant="primary"]) button:hover:not(:disabled),
      :host(:not([variant])) button:hover:not(:disabled) {
        background-color: #0056b3;
      }

      /* Secondary Variant */
      :host([variant="secondary"]) button {
        background-color: #6c757d;
        color: white;
      }
      :host([variant="secondary"]) button:hover:not(:disabled) {
        background-color: #5a6268;
      }

      /* Danger Variant */
      :host([variant="danger"]) button {
        background-color: #dc3545;
        color: white;
      }
      :host([variant="danger"]) button:hover:not(:disabled) {
        background-color: #c82333;
      }
    `;
  }

  protected getTemplate(): string {
    const disabledAttr = this.disabled ? 'disabled' : '';
    return `
      <button ${disabledAttr}>
        <slot></slot>
      </button>
    `;
  }
}

// Register the web component
if (!customElements.get('cad-button')) {
  customElements.define('cad-button', CadButton);
}
