import { GraphQLNonNull, GraphQLString } from 'graphql';
import PlateType from 'data/types/PlateType';
import db from 'data/database';

export default {
  args: {
    number: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: (value, { number }) => db.addPlate(number),
  type: PlateType,
};
