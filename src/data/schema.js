import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import config from 'data/queries/config';
import logs from 'data/queries/logs';
import plates from 'data/queries/plates';
import addPlate from 'data/mutations/plate-add';
import deletePlate from 'data/mutations/plate-delete';
import editConfig from 'data/mutations/config-edit';
import setPlateAllowedness from 'data/mutations/plate-set-allowedness';

export default new GraphQLSchema({
  mutation: new GraphQLObjectType({
    fields: {
      addPlate,
      deletePlate,
      editConfig,
      setPlateAllowedness,
    },
    name: 'Mutation',
  }),
  query: new GraphQLObjectType({
    fields: {
      config,
      logs,
      plates,
    },
    name: 'Query',
  }),
});
