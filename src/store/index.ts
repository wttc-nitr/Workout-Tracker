// responsible for Storing data only, everything else should be moved to appropriate folders.

import type { WorkoutWithExercises } from "@/types/models";
import { create } from "zustand";
import { createNewWorkout, finishWorkout } from "@/services/workoutService";
import { createNewExercise } from "@/services/exerciseService";
import { immer } from "zustand/middleware/immer";

type State = {
  currentWorkout: WorkoutWithExercises | null;
  workouts: WorkoutWithExercises[];
};

type Actions = {
  startWorkout: () => void;
  endWorkout: () => void;
  addExercise: (name: string) => void;
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
          state.workouts.unshift(finishedWorkout);
        });
      },

      addExercise: (name: string) => {
        const { currentWorkout } = get();
        if (!currentWorkout) return;
        const newExercise = createNewExercise(name, currentWorkout.id);

        set((state) => {
          state.currentWorkout?.exercises.push(newExercise);
        });
      },
    };
  }),
);
