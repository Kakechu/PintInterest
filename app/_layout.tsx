import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";

import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";

const ThemedLayout = () => {
  // use theme hook here
  const { isDark } = useTheme();
  // Add StatusBar below before the Stack

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: true,
          headerTitle: () => <Text>PintInterest </Text>,
          headerRight: () => <Text>Signup</Text>,
        }}
      />
    </>
  );
};

export default function RootLayout() {
  return (
    // Wrap the layout with ThemeProvider
    <ThemeProvider>
      <ThemedLayout />
    </ThemeProvider>
  );
}
