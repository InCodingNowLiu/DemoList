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
const apollo_server_express_1 = require("apollo-server-express");
const connection_1 = require("../../database/connection");
const conversion = require("../../util/caseConversion");
exports.typeDef = apollo_server_express_1.gql `
  extend type Mutation {
    updateLocationById(id: String, location: UpdateLocationInput): LocationType
  }
`;
exports.resolvers = {
    Mutation: { updateLocationById },
};
function updateLocationById(_, { id, location }, context) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.connection.from('LOCATION')
            .where('location_id', id)
            .update(conversion.decamelizeKeys(location))
            .returning('*')
            .get(0)
            .then(conversion.camelizeKeys);
    });
}
//# sourceMappingURL=mutations.js.map