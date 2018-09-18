import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Log',
  fields: {
    allowed: { type: new GraphQLNonNull(GraphQLBoolean) },
    confidence: { type: GraphQLFloat },
    datetime: { type: new GraphQLNonNull(GraphQLString) },
    id: { type: new GraphQLNonNull(GraphQLInt) },
    plateNumber: { type: new GraphQLNonNull(GraphQLString) },
    region: { type: new GraphQLNonNull(GraphQLString) },
  },
});
