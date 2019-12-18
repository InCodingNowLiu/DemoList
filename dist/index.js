"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_1 = require("./schema");
const logger_1 = require("./util/logger");
function main() {
    const server = new apollo_server_1.ApolloServer({
        schema: schema_1.schema,
    });
    return server;
}
exports.default = main;
(() => {
    const server = main();
    const port = process.env.PORT || 8000;
    server.listen(port, () => {
        logger_1.default.info(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    });
})();
//# sourceMappingURL=index.js.map