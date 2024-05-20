"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
test("It returns true for a valid address", () => {
    const alice = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";
    expect((0, _1.isValidAddress)(alice)).toBe(true);
});
test("It returns false for a wrong string", () => {
    const wrong = "Hello from the other side";
    expect((0, _1.isValidAddress)(wrong)).toBe(false);
});
