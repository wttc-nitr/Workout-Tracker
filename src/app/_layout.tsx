import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import {
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// DarkTheme.colors.primary = Colors.dark.tint;
// DefaultTheme.colors.primary = Colors.light.tint;
// not working on android

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
          <Stack.Screen name="workout/current" options={{ title: "Workout" }} />
          <Stack.Screen name="workout/[id]" options={{ title: "Workout" }} />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
