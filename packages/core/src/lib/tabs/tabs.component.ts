import { BaseComponent } from '../base/base-component.js';
import { CadTab } from './tab.component.js';
import { CadTabPanel } from './tab-panel.component.js';

export type TabsOrientation = 'horizontal' | 'vertical';

let instanceCount = 0;

/**
 * Implements the WAI-ARIA Tabs pattern (automatic activation):
 * https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 */
export class CadTabs extends BaseComponent {
  private _navSlot!: HTMLSlotElement;
  private _panelSlot!: HTMLSlotElement;
  private readonly _instanceId = `cad-tabs-${++instanceCount}`;

  static get observedAttributes() {
    return ['orientation', 'active-tab'];
  }

  get orientation(): TabsOrientation {
    return (this.getAttribute('orientation') as TabsOrientation) || 'horizontal';
  }

  set orientation(value: TabsOrientation) {
    this.setAttribute('orientation', value);
  }

  get activeTab(): string | null {
    return this.getAttribute('active-tab');
  }

  set activeTab(value: string | null) {
    if (value) {
      this.setAttribute('active-tab', value);
    } else {
      this.removeAttribute('active-tab');
    }
  }

  constructor() {
    super();
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.syncTabs = this.syncTabs.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('cad-tab-select', this.handleTabSelect as EventListener);
    this.addEventListener('keydown', this.handleKeydown);
    queueMicrotask(this.syncTabs);
  }

  disconnectedCallback() {
    this.removeEventListener('cad-tab-select', this.handleTabSelect as EventListener);
    this.removeEventListener('keydown', this.handleKeydown);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;
    if (name === 'active-tab') {
      this.syncTabs();
    } else {
      this.render();
    }
  }

  protected override render() {
    super.render();
    this._navSlot = this.shadowRoot!.querySelector('slot[name="nav"]')!;
    this._panelSlot = this.shadowRoot!.querySelector('slot:not([name])')!;
    this._navSlot.addEventListener('slotchange', this.syncTabs);
    this._panelSlot.addEventListener('slotchange', this.syncTabs);
  }

  protected getStyles(): string {
    return `
      .tabs {
        display: flex;
        flex-direction: column;
      }
      :host([orientation="vertical"]) .tabs {
        flex-direction: row;
      }
      .nav {
        display: flex;
        flex-direction: row;
        gap: 0.25rem;
        border-bottom: 2px solid #dee2e6;
      }
      :host([orientation="vertical"]) .nav {
        flex-direction: column;
        border-bottom: none;
        border-right: 2px solid #dee2e6;
      }
      .body {
        padding: 1rem 0;
      }
      :host([orientation="vertical"]) .body {
        padding: 0 1rem;
      }
    `;
  }

  protected getTemplate(): string {
    return `
      <div class="tabs" part="base">
        <div class="nav" part="nav" role="tablist" aria-orientation="${this.orientation}">
          <slot name="nav"></slot>
        </div>
        <div class="body" part="body">
          <slot></slot>
        </div>
      </div>
    `;
  }

  /** Selects the tab that controls the given panel name. */
  selectTab(tab: CadTab) {
    if (!tab || tab.disabled) return;
    const panelName = tab.getAttribute('panel');
    if (panelName && panelName !== this.activeTab) {
      this.activeTab = panelName;
    }
    this.dispatchEvent(
      new CustomEvent('cad-tabs-change', {
        detail: { name: panelName },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private getTabs(): CadTab[] {
    if (!this._navSlot) return [];
    return (this._navSlot.assignedElements({ flatten: true }) as CadTab[]).filter(
      (el) => el.tagName.toLowerCase() === 'cad-tab',
    );
  }

  private getPanels(): CadTabPanel[] {
    if (!this._panelSlot) return [];
    return (this._panelSlot.assignedElements({ flatten: true }) as CadTabPanel[]).filter(
      (el) => el.tagName.toLowerCase() === 'cad-tab-panel',
    );
  }

  private syncTabs() {
    const tabs = this.getTabs();
    const panels = this.getPanels();

    if (!tabs.length) return;

    tabs.forEach((tab, index) => {
      if (!tab.id) {
        tab.id = `${this._instanceId}-tab-${index}`;
      }
      tab.setAttribute('orientation', this.orientation);
    });
    panels.forEach((panel, index) => {
      if (!panel.id) {
        panel.id = `${this._instanceId}-panel-${index}`;
      }
    });

    const findPanel = (tab: CadTab, index: number) =>
      panels.find((panel) => panel.name === tab.panel) ?? panels[index];

    const activeName = this.activeTab;
    const activeTab =
      tabs.find((tab) => tab.panel === activeName) ??
      tabs.find((tab) => tab.hasAttribute('active')) ??
      tabs.find((tab) => !tab.disabled) ??
      tabs[0];

    tabs.forEach((tab, index) => {
      const panel = findPanel(tab, index);
      const selected = tab === activeTab;

      tab.setAttribute('aria-selected', String(selected));
      tab.setAttribute('tabindex', selected ? '0' : '-1');
      tab.toggleAttribute('active', selected);
      if (panel) {
        tab.setAttribute('aria-controls', panel.id);
        panel.setAttribute('aria-labelledby', tab.id);
        panel.toggleAttribute('active', selected);
      }
    });

    const activePanelName = activeTab?.panel ?? null;
    if (activePanelName && activePanelName !== this.activeTab) {
      this.activeTab = activePanelName;
    }
  }

  private handleTabSelect(event: CustomEvent<{ tab: CadTab }>) {
    this.selectTab(event.detail.tab);
  }

  private handleKeydown(event: KeyboardEvent) {
    const tabs = this.getTabs().filter((tab) => !tab.disabled);
    if (!tabs.length) return;

    const currentIndex = tabs.indexOf(event.target as CadTab);
    if (currentIndex === -1) return;

    const isVertical = this.orientation === 'vertical';
    const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
    const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';

    let newIndex: number;

    switch (event.key) {
      case nextKey:
        newIndex = (currentIndex + 1) % tabs.length;
        break;
      case prevKey:
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextTab = tabs[newIndex];
    this.selectTab(nextTab);
    nextTab.focus();
  }
}

if (!customElements.get('cad-tabs')) {
  customElements.define('cad-tabs', CadTabs);
}
