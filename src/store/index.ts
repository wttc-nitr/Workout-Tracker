// responsible for Storing data only, everything else should be moved to appropriate folders.

import type { WorkoutWithExercises } from "@/types/models";
import { create } from "zustand";
import { createNewWorkout, finishWorkout } from "@/services/workoutService";

type State = {
  currentWorkout: WorkoutWithExercises | null;
  workouts: WorkoutWithExercises[];
};

type Actions = {
  startWorkout: () => void;
  endWorkout: () => void;
};

export const useWorkouts = create<State & Actions>()((set, get) => {
  return {
    // State
    currentWorkout: null,
    workouts: [],

    // Actions
    startWorkout: () => {
      set((state) => ({ currentWorkout: createNewWorkout() }));
    },

    endWorkout: () => {
      // end this current workout -> currentWorkout to null, push this workout to the list
      const { currentWorkout } = get();
      if (!currentWorkout) return;

      const finishedWorkout = finishWorkout(currentWorkout);

      set((state) => ({
        currentWorkout: null,
        workouts: [...state.workouts, finishedWorkout],
      }));
    },
  };
});
