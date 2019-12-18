import { gql } from 'apollo-server-express';

export const typeDef = gql`
  type LocationType {
    locationId: ID!
    organizationId: ID
    organization: OrganizationType
    locationNme: String!
    locationContactNme: String
    locationContactEmail: String
    locationAddress: String
  }

  type OrganizationType {
    organizationId: ID!
    organizationNme: String!
    organizationReadOnly: Boolean
  }

  type UserType {
    userId: ID!
    organizationId: ID
    locationId: ID
    userFirstNme: String!
    userLastNme: String!
    userEmailAddress: String!
    location: LocationType
    dataloaderLocation: LocationType
    organization: OrganizationType
  }

  input UserInsert {
    organizationId: ID
    locationId: ID
    userFirstNme: String!
    userEmailAddress: String!
    userIamType: Int!
  }

  input UpdateUserInput {
    userFirstNme: String
    userLastNme: String
    userEmailAddress: String
  }

  input UpdateLocationInput {
    locationNme: String
    locationContactNme: String
  }
`;
