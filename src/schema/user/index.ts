import * as types from './types';
import * as queries from './queries';
import * as mutations from './mutations';

export const resolvers = [queries, mutations].reduce((state, m) => {
  if (!m.resolvers) {
    return state;
  }

  return {
    ...state,
    ...m.resolvers,
  };
}, {});

export const typeDef = [types, queries, mutations].map(m => m.typeDef).filter(res => !!res);
