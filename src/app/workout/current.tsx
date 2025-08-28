import WorkoutExerciseItem from "@/components/logger/WorkoutExerciseItem";
import WorkoutHeader from "@/components/logger/WorkoutHeader";
import SelectExerciseModal from "@/components/logger/SelectExerciseModal";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { useWorkouts } from "@/store";
import { Redirect, router, useFocusEffect } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useCallback } from "react";

export default function CurrentWorkoutScreen() {
  const currentWorkout = useWorkouts((state) => state.currentWorkout);
  const addExercise = useWorkouts((state) => state.addExercise);
  useFocusEffect(
    useCallback(() => {
      if (!currentWorkout) router.dismissAll();
    }, [currentWorkout]),
  );

  if (!currentWorkout) {
    return <ActivityIndicator />;
  }
  return (
    <KeyboardAwareFlatList
      data={currentWorkout.exercises}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      renderItem={({ item }) => <WorkoutExerciseItem exercise={item} />}
      ListHeaderComponent={<WorkoutHeader />}
      ListFooterComponent={
        <SelectExerciseModal onSelectExercise={(name) => addExercise(name)} />
      }
      enableOnAndroid
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={60}
    />
  );
}
