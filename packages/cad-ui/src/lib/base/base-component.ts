export abstract class BaseComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  protected abstract getTemplate(): string;
  protected abstract getStyles(): string;

  protected render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: inline-block;
            box-sizing: border-box;
          }
          ${this.getStyles()}
        </style>
        ${this.getTemplate()}
      `;
    }
  }
}
