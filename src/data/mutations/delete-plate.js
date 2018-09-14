import { GraphQLInt, GraphQLNonNull } from 'graphql';
import PlateType from 'data/types/PlateType';
import Database from 'data/database';

const db = new Database();

export default {
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: (value, { id }) => db.deletePlate(id) && id,
  type: PlateType,
};
