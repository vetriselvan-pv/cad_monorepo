import { BaseComponent } from '../base/base-component.js';

let itemInstanceCount = 0;

export class CadAccordionItem extends BaseComponent {
  private _headingContainer!: HTMLElement;
  private _headerButton!: HTMLButtonElement;
  private _panel!: HTMLElement;
  private readonly _instanceId = `cad-accordion-item-${++itemInstanceCount}`;

  static get observedAttributes() {
    return ['expanded', 'disabled', 'level'];
  }

  get name(): string {
    return this.getAttribute('name') || '';
  }

  set name(value: string) {
    this.setAttribute('name', value);
  }

  get expanded(): boolean {
    return this.hasAttribute('expanded');
  }

  set expanded(value: boolean) {
    if (value) {
      this.setAttribute('expanded', '');
    } else {
      this.removeAttribute('expanded');
    }
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

  get level(): number {
    const value = Number(this.getAttribute('level'));
    return Number.isInteger(value) && value >= 1 && value <= 6 ? value : 3;
  }

  set level(value: number) {
    this.setAttribute('level', String(value));
  }

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  override connectedCallback() {
    super.connectedCallback();

    this._headingContainer = this.shadowRoot!.querySelector('.heading')!;
    this._headerButton = this.shadowRoot!.querySelector('.trigger')!;
    this._panel = this.shadowRoot!.querySelector('.panel')!;

    if (!this._headerButton.id) {
      this._headerButton.id = `${this._instanceId}-header`;
    }
    if (!this._panel.id) {
      this._panel.id = `${this._instanceId}-panel`;
    }
    this._headerButton.setAttribute('aria-controls', this._panel.id);
    this._panel.setAttribute('aria-labelledby', this._headerButton.id);

    this._headerButton.addEventListener('click', this.handleClick);
    this.updateState();
  }

  disconnectedCallback() {
    this._headerButton?.removeEventListener('click', this.handleClick);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    this.updateState();
  }

  /** Moves keyboard focus to this item's header button. */
  focusHeader() {
    this._headerButton?.focus();
  }

  private updateState() {
    if (!this._headerButton || !this._panel || !this._headingContainer) return;

    this._headingContainer.setAttribute('aria-level', String(this.level));
    this._headerButton.setAttribute('aria-expanded', String(this.expanded));
    this._headerButton.disabled = this.disabled;
    this._headerButton.setAttribute('aria-disabled', String(this.disabled));
    this._panel.toggleAttribute('hidden', !this.expanded);
  }

  private handleClick() {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent('cad-accordion-toggle', {
        detail: { item: this },
        bubbles: true,
        composed: true,
      }),
    );
  }

  protected getStyles(): string {
    return `
      :host {
        display: block;
        border-bottom: 1px solid #dee2e6;
      }
      :host(:last-of-type) {
        border-bottom: none;
      }
      .heading {
        margin: 0;
      }
      .trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0.75em 1em;
        font: inherit;
        font-weight: 500;
        color: #212529;
        background: transparent;
        border: none;
        cursor: pointer;
        text-align: left;
      }
      .trigger:hover:not(:disabled) {
        background-color: #f8f9fa;
      }
      .trigger:disabled {
        color: #adb5bd;
        cursor: not-allowed;
      }
      .trigger:focus-visible {
        outline: 2px solid #007bff;
        outline-offset: -2px;
      }
      .heading-text {
        flex: 1;
      }
      .icon {
        margin-left: 0.75em;
        flex-shrink: 0;
        transition: transform 0.2s;
      }
      .trigger[aria-expanded="true"] .icon {
        transform: rotate(180deg);
      }
      .panel[hidden] {
        display: none;
      }
      .panel-inner {
        padding: 0 1em 1em;
      }
    `;
  }

  protected getTemplate(): string {
    return `
      <div class="heading" part="heading" role="heading">
        <button type="button" class="trigger" part="trigger" aria-expanded="false">
          <span class="heading-text"><slot name="heading"></slot></span>
          <span class="icon" part="icon" aria-hidden="true">&#9662;</span>
        </button>
      </div>
      <div class="panel" part="panel" role="region" hidden>
        <div class="panel-inner">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('cad-accordion-item')) {
  customElements.define('cad-accordion-item', CadAccordionItem);
}
