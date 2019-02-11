"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const custom_element_1 = require("./../../decorators/custom-element");
const quadrant_template_1 = require("./quadrant.template");
const quadrant_style_1 = require("./quadrant.style");
let HTMLQuadrantViewer = class HTMLQuadrantViewer extends HTMLElement {
    appendDrone(drone) {
        if (this.shadowRoot) {
            const quadrantWrapper = this.shadowRoot.getElementById('quadrant-wrapper');
            quadrantWrapper && quadrantWrapper.appendChild(drone);
        }
    }
    clear() {
        if (this.shadowRoot) {
            const quadrantWrapper = this.shadowRoot.getElementById('quadrant-wrapper');
            if (quadrantWrapper) {
                while (quadrantWrapper.firstChild)
                    quadrantWrapper.removeChild(quadrantWrapper.firstChild);
            }
        }
    }
};
HTMLQuadrantViewer = __decorate([
    custom_element_1.CustomElement({
        selector: 'quadrant-viewer',
        template: quadrant_template_1.template,
        style: quadrant_style_1.style,
        useShadow: true
    })
], HTMLQuadrantViewer);
exports.HTMLQuadrantViewer = HTMLQuadrantViewer;
//# sourceMappingURL=quadrant.js.map