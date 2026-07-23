import { BaseComponent } from '../base/base-component.js';
import { CadAccordionItem } from './accordion-item.component.js';

let accordionInstanceCount = 0;

/**
 * Implements the WAI-ARIA Accordion pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
 */
export class CadAccordion extends BaseComponent {
  private _slot!: HTMLSlotElement;
  private readonly _instanceId = `cad-accordion-${++accordionInstanceCount}`;

  static get observedAttributes() {
    return ['multiple', 'heading-level'];
  }

  get multiple(): boolean {
    return this.hasAttribute('multiple');
  }

  set multiple(value: boolean) {
    if (value) {
      this.setAttribute('multiple', '');
    } else {
      this.removeAttribute('multiple');
    }
  }

  get headingLevel(): number {
    const value = Number(this.getAttribute('heading-level'));
    return Number.isInteger(value) && value >= 1 && value <= 6 ? value : 3;
  }

  set headingLevel(value: number) {
    this.setAttribute('heading-level', String(value));
  }

  constructor() {
    super();
    this.handleToggle = this.handleToggle.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.syncItems = this.syncItems.bind(this);
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('cad-accordion-toggle', this.handleToggle as EventListener);
    this.addEventListener('keydown', this.handleKeydown);
    queueMicrotask(this.syncItems);
  }

  disconnectedCallback() {
    this.removeEventListener('cad-accordion-toggle', this.handleToggle as EventListener);
    this.removeEventListener('keydown', this.handleKeydown);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    this.syncItems();
  }

  protected override render() {
    super.render();
    this._slot = this.shadowRoot!.querySelector('slot')!;
    this._slot.addEventListener('slotchange', this.syncItems);
  }

  protected getStyles(): string {
    return `
      .accordion {
        display: block;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        overflow: hidden;
      }
    `;
  }

  protected getTemplate(): string {
    return `
      <div class="accordion" part="base">
        <slot></slot>
      </div>
    `;
  }

  /** Expands or collapses the given item, honoring single/multiple expansion mode. */
  toggleItem(item: CadAccordionItem, expanded = !item.expanded) {
    if (!item || item.disabled) return;

    if (!this.multiple && expanded) {
      this.getItems().forEach((other) => {
        if (other !== item) other.expanded = false;
      });
    }
    item.expanded = expanded;

    this.dispatchEvent(
      new CustomEvent('cad-accordion-change', {
        detail: { name: item.name, expanded: item.expanded },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private getItems(): CadAccordionItem[] {
    if (!this._slot) return [];
    return (this._slot.assignedElements({ flatten: true }) as CadAccordionItem[]).filter(
      (el) => el.tagName.toLowerCase() === 'cad-accordion-item',
    );
  }

  private syncItems() {
    const items = this.getItems();
    if (!items.length) return;

    items.forEach((item, index) => {
      if (!item.id) {
        item.id = `${this._instanceId}-item-${index}`;
      }
      item.setAttribute('level', String(this.headingLevel));
    });

    if (!this.multiple) {
      const expandedItems = items.filter((item) => item.expanded);
      expandedItems.slice(1).forEach((item) => (item.expanded = false));
    }
  }

  private handleToggle(event: CustomEvent<{ item: CadAccordionItem }>) {
    this.toggleItem(event.detail.item);
  }

  private handleKeydown(event: KeyboardEvent) {
    const items = this.getItems().filter((item) => !item.disabled);
    if (!items.length) return;

    const currentIndex = items.indexOf(event.target as CadAccordionItem);
    if (currentIndex === -1) return;

    let newIndex: number;

    switch (event.key) {
      case 'ArrowDown':
        newIndex = (currentIndex + 1) % items.length;
        break;
      case 'ArrowUp':
        newIndex = (currentIndex - 1 + items.length) % items.length;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = items.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    items[newIndex].focusHeader();
  }
}

if (!customElements.get('cad-accordion')) {
  customElements.define('cad-accordion', CadAccordion);
}
