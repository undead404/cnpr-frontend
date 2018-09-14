import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'Plate',
  fields: {
    allowed: { type: new GraphQLNonNull(GraphQLBoolean) },
    id: { type: new GraphQLNonNull(GraphQLID) },
    last_seen: { type: new GraphQLNonNull(GraphQLString) },
    number: { type: new GraphQLNonNull(GraphQLString) },
  },
});
