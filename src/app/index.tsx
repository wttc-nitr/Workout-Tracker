import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", gap: 10 }}>
      <Link href={"/workout/current"}>Resume current workout</Link>
      <Link href={"/workout/abc"}>open workout with id abc</Link>
      <Text>Home Screen !!</Text>
    </View>
  );
}
