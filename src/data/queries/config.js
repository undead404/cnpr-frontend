import ConfigType from 'data/types/ConfigType';
import db from 'data/database';

export default {
  type: ConfigType,
  resolve() {
    return db.getPersistentConfig();
  },
};
