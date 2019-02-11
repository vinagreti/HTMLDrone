"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const express = __importStar(require("express"));
class MainRoutes {
    constructor(app) {
        this.app = app;
        this.registerRoutes();
    }
    registerRoutes() {
        this.app.use(express.static(path.join(__dirname + '/../client/')));
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname + '/../client/index.html'));
        });
    }
}
exports.MainRoutes = MainRoutes;
//# sourceMappingURL=routes.js.map