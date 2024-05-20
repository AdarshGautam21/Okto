"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
test("It connects to the default network", () => __awaiter(void 0, void 0, void 0, function* () {
    const api = yield (0, _1.initialize)();
    const chain = yield api.rpc.system.chain();
    expect(chain).toBeDefined();
    expect((0, _1.isConnected)()).toBe(true);
}));
test("It fetches the latest block", () => __awaiter(void 0, void 0, void 0, function* () {
    const api = yield (0, _1.initialize)();
    const block = yield api.rpc.chain.getBlock();
    console.log("Latest block number: ", block.block.header.number.toNumber());
    expect(block).toBeDefined();
    yield (0, _1.disconnect)();
}));
test("It gets the correct number of decimals", () => __awaiter(void 0, void 0, void 0, function* () {
    const api = yield (0, _1.initialize)();
    const decimals = (0, _1.getDecimals)(api);
    expect(decimals).toEqual(18);
}));
