import { GraphQLFloat, GraphQLInt, GraphQLNonNull } from 'graphql';
import ConfigType from 'data/types/ConfigType';
import db from 'data/database';

export default {
  args: {
    minConfidence: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    minNumberLength: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    recognitionDelay: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: (value, configData) => db.editConfig(configData),
  type: ConfigType,
};
