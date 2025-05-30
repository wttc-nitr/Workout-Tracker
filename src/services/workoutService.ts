import type { Workout, WorkoutWithExercises } from "@/types/models";
import {
  addSetsToExercise,
  cleanExercise,
  getExerciseTotalWeight,
} from "@/services/exerciseService";
import * as Crypto from "expo-crypto";
import {
  getCurrentWorkout,
  saveWorkout,
  getWorkouts,
  deleteWorkout,
} from "@/db/workouts";
import { getExercises } from "@/db/exercises";

export const getWorkoutTotalWeight = (workout: WorkoutWithExercises) => {
  return workout.exercises.reduce(
    (total, exercise) => total + getExerciseTotalWeight(exercise),
    0,
  );
};

export const createNewWorkout = () => {
  const newWorkout: WorkoutWithExercises = {
    id: Crypto.randomUUID(),
    createdAt: new Date(),
    finishedAt: null,
    exercises: [],
  };

  // save to db
  saveWorkout(newWorkout);

  return newWorkout;
};

export const finishWorkout = (workout: WorkoutWithExercises) => {
  const cleanedWorkout = cleanWorkout(workout);

  if (!cleanedWorkout) {
    return null;
  }

  const finishedWorkout: WorkoutWithExercises = {
    ...cleanedWorkout,
    finishedAt: new Date(),
  };

  // save to db
  saveWorkout(finishedWorkout);

  return finishedWorkout;
};

export const cleanWorkout = (workout: WorkoutWithExercises) => {
  // remove all the exercises (from a Workout) with no sets
  const cleanedExercises = workout.exercises
    .map(cleanExercise)
    .filter((ex) => ex !== null);

  if (cleanedExercises.length === 0) {
    deleteWorkout(workout.id);
    return null;
  }

  return {
    ...workout,
    exercises: cleanedExercises,
  };
};

const addExercisesToWorkout = async (
  workout: Workout,
): Promise<WorkoutWithExercises> => {
  const exercises = await getExercises(workout.id);
  const exercisesWithSets = await Promise.all(exercises.map(addSetsToExercise));

  return {
    ...workout,
    exercises: exercisesWithSets,
  };
};

export const getCurrentWorkoutWithExercises =
  async (): Promise<WorkoutWithExercises | null> => {
    const workout = await getCurrentWorkout();

    if (!workout) return null;

    return await addExercisesToWorkout(workout);
  };

export const getWorkoutsWithExercises = async (): Promise<
  WorkoutWithExercises[]
> => {
  const workouts = await getWorkouts();

  return await Promise.all(workouts.map(addExercisesToWorkout));
};
