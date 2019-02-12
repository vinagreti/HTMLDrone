

const validateSelector = (selector: string) => {

  if (selector.indexOf('-') <= 0) {

    throw new Error('You need at least 1 dash in the custom element name!');

  }

};

const validateTemplate = (template: string) => {

  if (!template) {

    throw new Error('You need to pass a template for the element');

  }

};

const injectStyle = (template: string, style: string) => {

  if (style) {

    template += `<style>${style}</style>`;

  }

  return template;

};

const connectCallback = (
  template: HTMLTemplateElement,
  config: CustomElementConfig,
  connectedCallback: Function,
  customElementOnInit: Function,
) => {

  return function (this: any) {

    const clone = document.importNode(template.content, true);

    if (config.useShadow && !this.shadowRoot) {

      this.attachShadow({ mode: 'open' }).appendChild(clone);

    } else {

      this.appendChild(clone);

    }

    connectedCallback.call(this);

    customElementOnInit.call(this);

  };

}

export interface CustomElementConfig {
  selector: string;
  template: string;
  style?: string;
  useShadow?: boolean;
}

export const CustomElement = (config: CustomElementConfig) => (componentClassRef: Function) => {

  const template = document.createElement('template');

  const connectedCallback = componentClassRef.prototype.connectedCallback || function () { };

  const customElementOnInit = componentClassRef.prototype.customElementOnInit || function () { };

  validateSelector(config.selector);

  validateTemplate(config.template);

  template.innerHTML = injectStyle(config.template, config.style || '');

  componentClassRef.prototype.connectedCallback = connectCallback(template, config, connectedCallback, customElementOnInit);

  window.customElements.define(config.selector, componentClassRef);

};

export interface CustomElementOnInit {

  customElementOnInit: Function;

}