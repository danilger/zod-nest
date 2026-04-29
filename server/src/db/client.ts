import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import Database = require('better-sqlite3');

const sqliteFilePath = resolve(process.cwd(), 'data', 'pokemon-demo.sqlite');
mkdirSync(dirname(sqliteFilePath), { recursive: true });

const sqlite = new Database(sqliteFilePath);

export const db = drizzle({ client: sqlite, schema });
export type DbClient = typeof db;
