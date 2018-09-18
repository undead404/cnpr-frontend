import { GraphQLList } from 'graphql';
import LogType from 'data/types/LogType';
import db from 'data/database';

let items = [];
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);

export default {
  type: new GraphQLList(LogType),
  async resolve() {
    console.info('queries/logs/resolve()');
    if (lastFetchTask) {
      return lastFetchTask;
    }

    if (new Date() - lastFetchTime > 1000 /* 1 sec */) {
      lastFetchTime = new Date();
      try {
        items = await db.getLogs();
      } catch (error) {
        console.error(error);
      }
    }
    return items;
  },
};
