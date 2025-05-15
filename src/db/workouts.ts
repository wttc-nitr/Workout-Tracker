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
