import type { WorkoutWithExercises } from "@/types/models";
import { getExerciseTotalWeight } from "@/services/exerciseService";
import * as Crypto from "expo-crypto";

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

  return newWorkout;
};

export const finishWorkout = (workout: WorkoutWithExercises) => {
  const finishedWorkout: WorkoutWithExercises = {
    ...workout,
    finishedAt: new Date(),
  };

  return finishedWorkout;
};
