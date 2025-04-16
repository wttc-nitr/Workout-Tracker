import { Link } from "expo-router";
import { Text, View } from "@/components/general/Themed";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", gap: 10 }}>
      <Link href={"/workout/current"}>
        <Text>Resume current workout</Text>
      </Link>
      <Link href={"/workout/abc"}>
        <Text>open workout with id abc</Text>
      </Link>
      <Text>Home Screen !!</Text>
    </View>
  );
}
