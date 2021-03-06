"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nullFilter = (data) => {
    const mod = data;
    Object.entries(mod).forEach(([key, val]) => {
        if (val == null) {
            delete mod[key];
        }
        if (val instanceof Object) {
            mod[key] = exports.nullFilter(val);
        }
    });
    return mod;
};
//# sourceMappingURL=helper.js.map