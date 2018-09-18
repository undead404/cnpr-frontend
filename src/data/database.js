import sqlite from 'sqlite';
import config from 'config';
// import readline from 'readline';
import { normalizePlateNumber } from 'functions';

class Database {
  // constructor() {
  //   if (process.platform === 'win32') {
  //     readline
  //       .createInterface({
  //         input: process.stdin,
  //         output: process.stdout,
  //       })
  //       .on('SIGINT', () => {
  //         process.emit('SIGINT');
  //       });
  //   }

  //   process.on('SIGINT', async () => {
  //     if (this.isOpen()) {
  //       console.info('Closing database connection...');
  //       await this.close();
  //     }
  //   });
  // }

  async addPlate(number) {
    if (!this.isOpen()) {
      await this.init();
    }
    await this.db.run('INSERT INTO plates (number) VALUES (?)', number);
    return this.getPlateByNumber(number);
  }
  async close() {
    await this.db.close();
  }

  async deletePlate(plateId) {
    if (!this.isOpen()) {
      await this.init();
    }
    const plate = await this.getPlateById(plateId);
    await this.db.run('DELETE FROM plates WHERE id = ?', plateId);
    return plate;
  }

  async editConfig(configData) {
    const currentConfig = await this.getPersistentConfig();
    const updateData = [];
    ['minConfidence', 'minNumberLength', 'recognitionDelay'].forEach(
      configKey => {
        if (
          configData[configKey] &&
          configData[configKey] !== currentConfig[configKey]
        ) {
          updateData.push([configKey, configData[configKey]]);
        }
      },
    );
    await Promise.all(
      updateData.map(updateRecord =>
        this.db.run(
          'UPDATE config SET value = ? WHERE key = ?',
          updateRecord[1],
          updateRecord[0],
        ),
      ),
    );
    return this.getPersistentConfig();
  }

  async init() {
    if (Database.db) {
      this.db = Database.db;
    } else {
      console.info(config.dbFileName);
      this.db = await sqlite.open(config.dbFileName);
      Database.db = this.db;
      console.info(this.db ? 'DB is ready.' : 'DB NOT READY');
    }
  }

  async getLogs() {
    console.info(`getLogs()`);
    if (!this.isOpen()) {
      await this.init();
    }
    const items = await this.db.all(
      'SELECT id, plateNumber, datetime, confidence, region, allowed FROM logs',
    );
    console.info('logs', items);
    return items;
  }

  async getPersistentConfig() {
    if (!this.isOpen()) {
      await this.init();
    }
    const configRows = await this.db.all('SELECT key, value FROM config');
    const persistentConfig = {};
    configRows.forEach(configRecord => {
      switch (configRecord.key) {
        case 'minConfidence':
        case 'minNumberLength':
        case 'recognitionDelay':
          persistentConfig[configRecord.key] = parseInt(configRecord.value, 10);
          break;
        default:
          persistentConfig[configRecord.key] = configRecord.value;
      }
    });
    return persistentConfig;
  }

  async getPlateById(id) {
    if (!this.isOpen()) {
      await this.init();
    }
    return this.db.get('SELECT * FROM plates WHERE id = ?', id);
  }

  async getPlateByNumber(number) {
    if (!this.isOpen()) {
      await this.init();
    }
    return this.db.get(
      'SELECT * FROM plates WHERE number = ?',
      normalizePlateNumber(number),
    );
  }

  async getPlates() {
    if (!this.isOpen()) {
      await this.init();
    }
    console.info('db', this.db);
    return this.db.all('SELECT id, number, last_seen, allowed FROM plates');
  }

  isOpen() {
    return !!this.db;
  }

  async setPlateAllowedness(plateId, value) {
    if (!this.isOpen()) {
      await this.init();
    }
    await this.db.run(
      'UPDATE plates SET allowed = ? WHERE id = ?',
      value ? 1 : 0,
      plateId,
    );
    return this.getPlateById(plateId);
  }
}

export default new Database();
