"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const main_1 = require("./main");
const environments_1 = require("./environments/environments");
describe('MainServer', () => {
    const server = new main_1.MainServer();
    ;
    it(`should create express app`, () => {
        chai_1.expect(!!server.app).to.equal(true);
    });
    it(`should create http server`, () => {
        chai_1.expect(!!server.server).to.equal(true);
    });
    it(`should be listening on ${environments_1.environment.name} env at port ${environments_1.environment.port}`, () => {
        chai_1.expect(server.port).to.equal(environments_1.environment.port);
    });
});
//# sourceMappingURL=main.spec.js.map