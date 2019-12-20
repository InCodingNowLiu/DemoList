import { gql } from 'apollo-server-express';
import { connection as Knex } from '../../database/connection';
import * as conversion from '../../util/caseConversion';
import logger from '../../util/logger';
import { dataloader } from './queries';
interface UserInsertInput {
  organizationId: number;
}

interface UpdateUserInput {
  userFirstNme: string;
  userLastNme: string;
  userEmailAddress: String;
}

interface UpdateLocationInput {
  locationNme: string;
  locationContactNme: string;
}

export const typeDef = gql`
  extend type Mutation {
    updateLocationById(id: String, location: UpdateLocationInput): LocationType
    updateLocationByIdWithClearCache(id: String, location: UpdateLocationInput): LocationType
  }
`;

export const resolvers = {
  Mutation: { updateLocationById, updateLocationByIdWithClearCache },
};

async function updateLocationById(_, { id, location }, context) {
  return await Knex.from('LOCATION')
    .where('location_id', id)
    .update(conversion.decamelizeKeys(location))
    .returning('*')
    .get(0)
    .then(conversion.camelizeKeys);
}

async function updateLocationByIdWithClearCache(_, { id, location }, context) {
  const result = await Knex.from('LOCATION')
    .where('location_id', id)
    .update(conversion.decamelizeKeys(location))
    .returning('*')
    .get(0)
    .then(conversion.camelizeKeys);
  dataloader.location.clear(+id);
  return result;
}
