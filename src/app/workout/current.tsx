import WorkoutExerciseItem from "@/components/logger/WorkoutExerciseItem";
import { FlatList } from "react-native";
import WorkoutHeader from "@/components/logger/WorkoutHeader";
import SelectExerciseModal from "@/components/logger/SelectExerciseModal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useWorkouts } from "@/store";
import { Redirect } from "expo-router";

export default function CurrentWorkoutScreen() {
  const currentWorkout = useWorkouts((state) => state.currentWorkout);

  if (!currentWorkout) {
    return <Redirect href={"/"} />;
  }
  return (
    <KeyboardAwareScrollView>
      <FlatList
        data={[1, 2, 3]}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={() => <WorkoutExerciseItem />}
        ListHeaderComponent={<WorkoutHeader />}
        ListFooterComponent={
          <SelectExerciseModal
            onSelectExercise={(name) =>
              console.warn("Exercise seleted: ", name)
            }
          />
        }
      />
    </KeyboardAwareScrollView>
  );
}
