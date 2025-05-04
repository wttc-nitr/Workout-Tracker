import WorkoutExerciseItem from "@/components/logger/WorkoutExerciseItem";
import WorkoutHeader from "@/components/logger/WorkoutHeader";
import SelectExerciseModal from "@/components/logger/SelectExerciseModal";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { useWorkouts } from "@/store";
import { Redirect } from "expo-router";
import { FlatList, Platform } from "react-native";

export default function CurrentWorkoutScreen() {
  const currentWorkout = useWorkouts((state) => state.currentWorkout);
  const addExercise = useWorkouts((state) => state.addExercise);
  if (!currentWorkout) {
    return <Redirect href={"/"} />;
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
