"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateSelector = (selector) => {
    if (selector.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
};
const validateTemplate = (template) => {
    if (!template) {
        throw new Error('You need to pass a template for the element');
    }
};
const injectStyle = (template, style) => {
    if (style) {
        template += `<style>${style}</style>`;
    }
    return template;
};
const connectCallback = (template, config, connectedCallback) => {
    return function () {
        const clone = document.importNode(template.content, true);
        if (config.useShadow && !this.shadowRoot) {
            this.attachShadow({ mode: 'open' }).appendChild(clone);
        }
        else {
            this.appendChild(clone);
        }
        connectedCallback.call(this);
    };
};
exports.CustomElement = (config) => (componentClassRef) => {
    const template = document.createElement('template');
    const connectedCallback = componentClassRef.prototype.connectedCallback || function () { };
    validateSelector(config.selector);
    validateTemplate(config.template);
    template.innerHTML = injectStyle(config.template, config.style || '');
    componentClassRef.prototype.connectedCallback = connectCallback(template, config, connectedCallback);
    window.customElements.define(config.selector, componentClassRef);
};
//# sourceMappingURL=custom-element.js.map