import type { ExerciseSet } from "@/types/models";
import * as Crypto from "expo-crypto";

export const getBestSet = (sets: ExerciseSet[]) => {
  return sets.reduce((bestSet: ExerciseSet | null, set) => {
    return (set?.oneRM || 0) > (bestSet?.oneRM || 0) ? set : bestSet;
  }, null);
};

export const getSetTotalWeight = (set: ExerciseSet) => {
  return (set.weight || 0) * (set.reps || 0);
};

export const createNewSet = (exerciseId: string) => {
  const newSet: ExerciseSet = {
    id: Crypto.randomUUID(),
    exerciseId,
  };

  return newSet;
};
