import type { ExerciseWithSets, WorkoutWithExercises } from "@/types/models";
import {
  cleanExercise,
  getExerciseTotalWeight,
} from "@/services/exerciseService";
import * as Crypto from "expo-crypto";
import { getCurrentWorkout, getWorkouts, saveWorkout } from "@/db/workouts";

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

  return {
    ...workout,
    exercises: cleanedExercises,
  };
};
