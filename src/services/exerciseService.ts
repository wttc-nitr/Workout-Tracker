import type { ExerciseWithSets } from "@/types/models";
import {
  cleanSets,
  createNewSet,
  getSetTotalWeight,
} from "@/services/setService";
import * as Crypto from "expo-crypto";
import { deleteExercise, saveExercise } from "@/db/exercises";

export const getExerciseTotalWeight = (exercise: ExerciseWithSets) => {
  return exercise.sets.reduce(
    (totalSetWeight, set) => totalSetWeight + getSetTotalWeight(set),
    0,
  );
};

export const createNewExercise = (name: string, workoutId: string) => {
  const newExercise: ExerciseWithSets = {
    id: Crypto.randomUUID(),
    name,
    workoutId,
    sets: [],
  };

  // save to db
  saveExercise(newExercise);
  // add one empty set
  newExercise.sets.push(createNewSet(newExercise.id));

  return newExercise;
};

export const cleanExercise = (exercise: ExerciseWithSets) => {
  // remove empty sets -> sets with zero/no reps
  const cleanedSets = cleanSets(exercise.sets);

  if (cleanedSets.length === 0) {
    deleteExercise(exercise.id);
    return null;
  }

  return {
    ...exercise,
    sets: cleanedSets,
  };
};
