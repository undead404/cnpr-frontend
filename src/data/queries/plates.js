import { GraphQLList } from 'graphql';
import PlateType from 'data/types/PlateType';
import Database from 'data/database';

let items = [];
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);
const db = new Database();

export default {
  type: new GraphQLList(PlateType),
  async resolve() {
    if (lastFetchTask) {
      return lastFetchTask;
    }

    if (new Date() - lastFetchTime > 1000 /* 1 sec */) {
      lastFetchTime = new Date();
      try {
        items = await db.getPlates();
      } catch (error) {
        console.error(error);
      }
    }
    return items;
  },
};
