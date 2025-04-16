import { useLocalSearchParams } from "expo-router";
import { Text, View } from "@/components/general/Themed";

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1 }}>
      <Text>Workout screen: {id}</Text>
    </View>
  );
}
