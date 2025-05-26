import type { Workout } from "@/types/models";
import { getDB } from ".";
import type { DbWorkout } from "@/types/db";

export const saveWorkout = async (workout: Workout) => {
  // save or update to db
  try {
    const db = await getDB();
    const res = await db.runAsync(
      "INSERT OR REPLACE INTO workouts (id, created_at, finished_at) VALUES(?, ?, ?)",
      workout.id,
      workout.createdAt.toISOString(),
      workout.finishedAt?.toISOString() || null,
    );

    console.log(res, "saved successfully, ...");
  } catch (e) {
    console.log(e);
  }
};

const parseWorkout = (workout: DbWorkout): Workout => {
  return {
    id: workout.id,
    createdAt: new Date(workout.created_at),
    finishedAt: workout.finished_at ? new Date(workout.finished_at) : null,
  };
};

export const getCurrentWorkout = async (): Promise<Workout | null> => {
  try {
    const db = await getDB();

    const workout = await db.getFirstAsync<DbWorkout>(`
      SELECT * FROM workouts
      WHERE finished_at IS NULL
      ORDER BY created_at DESC
      LIMIT 1
    `);

    if (!workout) return null;
    console.log("in src > db > workouts.ts > getCurrentWorkout", workout);

    return parseWorkout(workout);
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getWorkouts = async (): Promise<Workout[]> => {
  try {
    const db = await getDB();
    const workout = await db.getAllAsync<DbWorkout>(`
      SELECT * FROM workouts
      WHERE finished_at IS NOT NULL
      ORDER BY created_at DESC
    `);

    return workout.map(parseWorkout);
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const deleteWorkout = async (id: string) => {
  try {
    const db = await getDB();

    await db.runAsync("DELETE FROM workouts WHERE id=?", id);
  } catch (e) {
    console.log(e);
  }
};
