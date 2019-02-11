"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomFromZero = (n) => {
    return Math.floor((Math.random() * n));
};
exports.chooseOneRandomly = (a, b) => {
    return exports.randomFromZero(10) > 5 ? a : b;
};
//# sourceMappingURL=random.js.map