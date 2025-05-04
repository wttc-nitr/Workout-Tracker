// responsible for Storing data only, everything else should be moved to appropriate folders.

import type { ExerciseSet, WorkoutWithExercises } from "@/types/models";
import { create } from "zustand";
import { createNewWorkout, finishWorkout } from "@/services/workoutService";
import { createNewExercise } from "@/services/exerciseService";
import { immer } from "zustand/middleware/immer";
import { createNewSet, updateSet } from "@/services/setService";

type State = {
  currentWorkout: WorkoutWithExercises | null;
  workouts: WorkoutWithExercises[];
};

type Actions = {
  startWorkout: () => void;
  endWorkout: () => void;
  addExercise: (name: string) => void;
  addSet: (exerciseId: string) => void;
  updateSet: (
    setId: string,
    updatedFields: Pick<ExerciseSet, "reps" | "weight">,
  ) => void;
  deleteSet: (setId: string) => void;
};

export const useWorkouts = create<State & Actions>()(
  immer((set, get) => {
    return {
      // State
      currentWorkout: null,
      workouts: [],

      // Actions
      startWorkout: () => {
        set(() => ({ currentWorkout: createNewWorkout() }));
      },

      endWorkout: () => {
        // end this current workout -> currentWorkout to null, push this workout to the list
        const { currentWorkout } = get();
        if (!currentWorkout) return;

        const finishedWorkout = finishWorkout(currentWorkout);

        set((state) => {
          state.currentWorkout = null;

          if (finishedWorkout.exercises.length !== 0)
            state.workouts.unshift(finishedWorkout);
        });
      },

      addExercise: (name) => {
        const { currentWorkout } = get();
        if (!currentWorkout) return;
        const newExercise = createNewExercise(name, currentWorkout.id);

        set((state) => {
          state.currentWorkout?.exercises.push(newExercise);
        });
      },

      addSet: (exerciseId) => {
        const newSet = createNewSet(exerciseId);

        set(({ currentWorkout }) => {
          if (!currentWorkout) return;
          const exercise = currentWorkout.exercises.find(
            (e) => e.id === exerciseId,
          );
          exercise?.sets?.push(newSet);
        });
      },

      updateSet: (setId, updatedFields) => {
        set(({ currentWorkout }) => {
          const exercise = currentWorkout?.exercises.find((e) =>
            e.sets.some((set) => set.id === setId),
          );

          const setIndex = exercise?.sets.findIndex((set) => set.id === setId);

          if (!exercise || setIndex === undefined || setIndex < 0) return;

          const updatedSet = updateSet(exercise?.sets[setIndex], updatedFields);
          exercise.sets[setIndex] = updatedSet;
        });
      },

      deleteSet: (setId) => {
        set(({ currentWorkout }) => {
          if (!currentWorkout) return;

          const exercise = currentWorkout?.exercises.find((e) =>
            e.sets.some((set) => set.id === setId),
          );

          if (!exercise) return;

          exercise.sets = exercise.sets.filter((set) => set.id !== setId);

          if (exercise.sets.length === 0) {
            currentWorkout.exercises = currentWorkout?.exercises.filter(
              (e) => e.id !== exercise.id,
            );
          }
        });
      },
    };
  }),
);
