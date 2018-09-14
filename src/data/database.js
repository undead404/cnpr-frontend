import sqlite from 'sqlite';
import config from 'config';
import readline from 'readline';
import { normalizePlateNumber } from 'functions';

export default class Database {
  constructor() {
    if (process.platform === 'win32') {
      readline
        .createInterface({
          input: process.stdin,
          output: process.stdout,
        })
        .on('SIGINT', () => {
          process.emit('SIGINT');
        });
    }

    process.on('SIGINT', async () => {
      if (this.isOpen()) {
        console.info('Closing database connection...');
        await this.close();
      }
    });
  }
  async close() {
    await this.db.close();
  }

  async deletePlate(plateId) {
    if (!this.isOpen()) {
      await this.init();
    }
    return this.db.run('DELETE FROM plates WHERE id = ?', plateId);
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

  async getPersistentConfig() {
    if (!this.persistentConfig) {
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
            persistentConfig[configRecord.key] = parseInt(
              configRecord.value,
              10,
            );
            break;
          default:
            persistentConfig[configRecord.key] = configRecord.value;
        }
      });
      this.persistentConfig = persistentConfig;
    }
    return this.persistentConfig;
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

  async registerEncounter(number) {
    console.info(`registerEncounter(${number})`);
    if (!this.isOpen()) {
      await this.init();
    }
    const plate = await this.getPlateByNumber(number);
    if (plate) {
      await this.db.run(
        "UPDATE plates ON number = ? SET last_seen = DATETIME('NOW')",
        number,
      );
    } else {
      await this.db.run(
        "INSERT INTO plates (number, last_seen) VALUES (?, DATETIME('NOW'))",
        number,
      );
    }
  }
}
