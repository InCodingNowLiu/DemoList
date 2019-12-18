"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types = require("./types");
const queries = require("./queries");
const mutations = require("./mutations");
exports.resolvers = [queries, mutations].reduce((state, m) => {
    if (!m.resolvers) {
        return state;
    }
    return Object.assign(Object.assign({}, state), m.resolvers);
}, {});
exports.typeDef = [types, queries, mutations].map(m => m.typeDef).filter(res => !!res);
//# sourceMappingURL=index.js.map