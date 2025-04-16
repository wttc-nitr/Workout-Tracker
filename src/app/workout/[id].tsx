import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function WorkoutScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Workout screen: {id}</Text>
    </View>
  );
}
