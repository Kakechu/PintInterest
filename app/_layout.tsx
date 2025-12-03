import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { BeerProvider } from "@/contexts/BeerContext";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

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
          headerRight: () => (
            <View>
              <ThemeToggle />
              <Text>Signup/Login</Text>
            </View>
          ),
        }}
      />
    </>
  );
};

export default function RootLayout() {
  return (
    // Wrap the layout with ThemeProvider
    <BeerProvider>
      <ThemeProvider>
        <ThemedLayout />
      </ThemeProvider>
    </BeerProvider>
  );
}
