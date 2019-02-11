"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const drone_template_1 = require("./drone.template");
const drone_style_1 = require("./drone.style");
const custom_element_1 = require("./../../../shared/decorators/custom-element");
let HTMLDrone = class HTMLDrone extends HTMLElement {
    constructor() {
        super();
    }
    get id() { return this._id; }
    set id(position) {
        if (this._id !== position) {
            this._id = position;
        }
    }
    get quadrant() { return this._quadrant; }
    set quadrant(position) {
        if (this._quadrant !== position) {
            this._quadrant = position;
        }
    }
    get positionX() { return this._positionX; }
    set positionX(position) {
        if (this._positionX !== position) {
            this._positionX = position;
            setTimeout(() => {
                if (this.shadowRoot && position >= 0) {
                    const droneWrapper = this.shadowRoot.getElementById('drone-wrapper');
                    droneWrapper && (droneWrapper.style.left = `${position / 10}%`);
                }
            }, 0);
        }
    }
    get positionY() { return this._positionY; }
    set positionY(position) {
        if (this._positionY !== position) {
            this._positionY = position;
            setTimeout(() => {
                if (this.shadowRoot && position >= 0) {
                    const droneWrapper = this.shadowRoot.getElementById('drone-wrapper');
                    droneWrapper && (droneWrapper.style.top = `${position / 10}%`);
                }
            }, 0);
        }
    }
};
HTMLDrone = __decorate([
    custom_element_1.CustomElement({
        selector: 'drone-g',
        template: drone_template_1.template,
        style: drone_style_1.style,
        useShadow: true
    }),
    __metadata("design:paramtypes", [])
], HTMLDrone);
exports.HTMLDrone = HTMLDrone;
//# sourceMappingURL=drone.js.map