import { GraphQLInt, GraphQLNonNull } from 'graphql';
import PlateType from 'data/types/PlateType';
import db from 'data/database';

export default {
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: (value, { id }) => db.deletePlate(id),
  type: PlateType,
};
