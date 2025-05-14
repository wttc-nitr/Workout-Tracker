import * as SQLite from "expo-sqlite";

export const dbName = "workoutTracker.db";

let db: SQLite.SQLiteDatabase | null = null;

const createWorkoutsTableQuery = `
  CREATE TABLE IF NOT EXISTS workouts (
    id TEXT PRIMARY KEY,
    created_at TEXT,
    finished_at TEXT
  );`;

export const getDB = async () => {
  if (db) {
    return db;
  }

  console.log("Opening database...");
  db = await SQLite.openDatabaseAsync(dbName);
  console.log("Database opened");

  console.log("Creating tables...");
  await db.execAsync(createWorkoutsTableQuery);
  console.log("Tables created");

  return db;
};
