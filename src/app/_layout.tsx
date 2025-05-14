import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import {
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "@/components/general/CustomButton";
import { useWorkouts } from "@/store";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import * as SQLite from "expo-sqlite";
import { dbName } from "@/db";

const db = SQLite.openDatabaseSync(dbName);

export default function RootLayout() {
  useDrizzleStudio(db);
  const colorScheme = useColorScheme();
  const finishWorkout = useWorkouts((state) => state.endWorkout);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerTintColor: "blue",
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen
            name="workout/current"
            options={{
              title: "Workout",
              headerRight: () => (
                <CustomButton
                  onPress={finishWorkout}
                  title="Finish"
                  style={{ padding: 7, paddingHorizontal: 15, width: "auto" }}
                />
              ),
            }}
          />
          <Stack.Screen name="workout/[id]" options={{ title: "Workout" }} />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
