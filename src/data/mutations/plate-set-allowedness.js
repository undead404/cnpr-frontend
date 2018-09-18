import { GraphQLBoolean, GraphQLInt, GraphQLNonNull } from 'graphql';
import PlateType from 'data/types/PlateType';
import db from 'data/database';

export default {
  args: {
    allowed: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: (value, { allowed, id }) => db.setPlateAllowedness(id, allowed),
  type: PlateType,
};
