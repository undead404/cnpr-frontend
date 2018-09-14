import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import config from 'data/queries/config';
import plates from 'data/queries/plates';
import deletePlate from 'data/mutations/delete-plate';

export default new GraphQLSchema({
  mutation: new GraphQLObjectType({
    fields: {
      deletePlate,
    },
    name: 'Mutation',
  }),
  query: new GraphQLObjectType({
    fields: {
      config,
      plates,
    },
    name: 'Query',
  }),
});
