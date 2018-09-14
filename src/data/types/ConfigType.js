import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Config',
  fields: {
    recognitionDelay: { type: new GraphQLNonNull(GraphQLInt) },
    minConfidence: { type: new GraphQLNonNull(GraphQLInt) },
    minNumberLength: { type: new GraphQLNonNull(GraphQLInt) },
    configVersion: { type: new GraphQLNonNull(GraphQLString) },
  },
});
