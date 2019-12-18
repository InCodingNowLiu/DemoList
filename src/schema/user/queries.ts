import { gql } from 'apollo-server-express';
import * as DataLoader from 'dataloader';

import { connection as Knex } from '../../database/connection';
import * as conversion from '../../util/caseConversion';
import logger from '../../util/logger';

export const typeDef = gql`
  extend type Query {
    getUsersByIds(ids: [String]): [UserType]
  }
`;
const dataloader = {
  location: new DataLoader(ids =>
    Knex.from('LOCATION')
      .whereIn('location_id', ids as string[])
      .select()
      .then(conversion.camelizeKeys)
      .then(locations => ids.map(id => locations.find(location => location.locationId === id))),
  ),
};
export const resolvers = {
  Query: {
    getUsersByIds,
  },
  UserType: {
    location: async (obj, args, context) => {
      return await findLocationById(obj.locationId);
    },
    dataloaderLocation: async (obj, args, context) => {
      if (obj.locationId) {
        const result = await dataloader.location.load(obj.locationId);
        return result;
      }
    },
  },
};

async function findLocationById(id: number): Promise<any> {
  return await Knex.from('LOCATION')
    .where('location_id', id)
    .select()
    .first()
    .then(dealWithQueryResult);
}

async function getUsersByIds(_, { ids }, context) {
  return await Knex.from('USER')
    .whereIn('user_id', ids)
    .select()
    .then(dealWithQueryResult);
}

function dealWithQueryResult(result: any) {
  return conversion.camelizeKeys(result);
}

function dealWithQueryParameters(param: any) {
  return conversion.decamelizeKeys(param);
}
