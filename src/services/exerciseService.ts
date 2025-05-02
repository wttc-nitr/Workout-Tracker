import type { ExerciseWithSets } from "@/types/models";
import { getSetTotalWeight } from "@/services/setService";
import * as Crypto from "expo-crypto";

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

  return newExercise;
};
