import ConfigType from 'data/types/ConfigType';
import Database from 'data/database';

const db = new Database();

export default {
  type: ConfigType,
  resolve() {
    return db.getPersistentConfig();
  },
};
