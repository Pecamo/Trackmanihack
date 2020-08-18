"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalState = void 0;
class GlobalState {
    constructor() {
        this.stringStorage = [];
        this.state = {
            isFirstLookback: true,
            version: undefined,
            stringStorage: [],
            isEof: false,
        };
        // Clone state into InitState
        this.initState = Object.assign({}, this.state);
    }
    static getInstance() {
        if (typeof this.instance === "undefined") {
            this.instance = new GlobalState();
        }
        return this.instance;
    }
    reset() {
        this.state = Object.assign({}, this.initState);
    }
}
exports.GlobalState = GlobalState;
//# sourceMappingURL=GlobalState.js.map