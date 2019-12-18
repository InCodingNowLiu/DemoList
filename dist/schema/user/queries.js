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
const DataLoader = require("dataloader");
const connection_1 = require("../../database/connection");
const conversion = require("../../util/caseConversion");
exports.typeDef = apollo_server_express_1.gql `
  extend type Query {
    getUsersByIds(ids: [String]): [UserType]
  }
`;
const dataloader = {
    location: new DataLoader(ids => connection_1.connection.from('LOCATION')
        .whereIn('location_id', ids)
        .select()
        .then(conversion.camelizeKeys)
        .then(locations => ids.map(id => locations.find(location => location.locationId === id)))),
};
exports.resolvers = {
    Query: {
        getUsersByIds,
    },
    UserType: {
        location: (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield findLocationById(obj.locationId);
        }),
        dataloaderLocation: (obj, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (obj.locationId) {
                const result = yield dataloader.location.load(obj.locationId);
                return result;
            }
        }),
    },
};
function findLocationById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.connection.from('LOCATION')
            .where('location_id', id)
            .select()
            .first()
            .then(dealWithQueryResult);
    });
}
function getUsersByIds(_, { ids }, context) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield connection_1.connection.from('USER')
            .whereIn('user_id', ids)
            .select()
            .then(dealWithQueryResult);
    });
}
function dealWithQueryResult(result) {
    return conversion.camelizeKeys(result);
}
function dealWithQueryParameters(param) {
    return conversion.decamelizeKeys(param);
}
//# sourceMappingURL=queries.js.map