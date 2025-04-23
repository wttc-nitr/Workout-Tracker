export type Workout = {
  id: string;
  createdAt: Date;
  finishedAt: Date | null;
};

export type Exercise = {
  id: string;
  workoutId: string;
  name: string;
};

export type ExerciseSet = {
  id: string;
  exerciseId: string;
  reps?: number;
  weight?: number;
  oneRM?: number;
};

// extras, for nested structure
export type ExerciseWithSets = Exercise & {
  sets: ExerciseSet[];
};

/*
id: string;
workoutId: string;
name: string;
sets: [
  {
    id: string;
    exerciseId: string;
    reps?: number;
    weight?: number;
    oneRM?: number;
  },
  {
    id: string;
    exerciseId: string;
    reps?: number;
    weight?: number;
    oneRM?: number;
  }
]
*/

export type WorkoutWithExercises = Workout & {
  exercises: ExerciseWithSets[];
};

/**
id: string;
createdAt: Date;
finishedAt: Date | null;

exercises: [
  {
    id: string;
    workoutId: string;
    name: string;
    sets: [
      {
        id: string;
        exerciseId: string;
        reps?: number;
        weight?: number;
        oneRM?: number;
      },
      {
        id: string;
        exerciseId: string;
        reps?: number;
        weight?: number;
        oneRM?: number;
      }
    ]
  },
  {
    id: string;
    workoutId: string;
    name: string;
    sets: [
      {
        id: string;
        exerciseId: string;
        reps?: number;
        weight?: number;
        oneRM?: number;
      },
      {
        id: string;
        exerciseId: string;
        reps?: number;
        weight?: number;
        oneRM?: number;
      }
    ]
  }
]
*/
