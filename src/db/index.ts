import * as SQLite from "expo-sqlite";

export const dbName = "workoutTracker.db";

let db: SQLite.SQLiteDatabase | null = null;

const createWorkoutsTableQuery = `
  CREATE TABLE IF NOT EXISTS workouts (
    id TEXT PRIMARY KEY,
    created_at TEXT,
    finished_at TEXT
  );`;

const createExercisesTableQuery = `
  CREATE TABLE IF NOT EXISTS exercises (
    id TEXT PRIMARY KEY,
    workout_id TEXT,
    name TEXT,
    FOREIGN KEY (workout_id) REFERENCES workouts (id)
  )`;

export const getDB = async () => {
  if (db) {
    return db;
  }

  console.log("Opening database...");
  db = await SQLite.openDatabaseAsync(dbName);
  console.log("Database opened");

  console.log("Creating tables...");
  await db.withTransactionAsync(async () => {
    if (!db) return;
    await db.execAsync(createWorkoutsTableQuery);
    await db.execAsync(createExercisesTableQuery);
  });
  console.log("Tables created");

  return db;
};
