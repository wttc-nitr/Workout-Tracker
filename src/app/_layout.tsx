import { Stack } from "expo-router";
import { useColorScheme, View } from "react-native";
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
import { useEffect } from "react";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const db = SQLite.openDatabaseSync(dbName);
// getDB();

// SQLite.deleteDatabaseSync(dbName);

export default function RootLayout() {
  useDrizzleStudio(db);
  const colorScheme = useColorScheme();
  const finishWorkout = useWorkouts((state) => state.endWorkout);
  const loadWorkouts = useWorkouts((state) => state.loadWorkouts);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    loadWorkouts();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <View style={{ height: insets.top }} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
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
                    style={{
                      padding: 7,
                      paddingHorizontal: 15,
                      width: "auto",
                    }}
                  />
                ),
              }}
            />
            <Stack.Screen name="workout/[id]" options={{ title: "Workout" }} />
          </Stack>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
