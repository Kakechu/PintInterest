import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { BeerProvider } from "@/contexts/BeerContext";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

const isLoggedIn = true;
const shouldCreateAccount = false;

function ThemedLayout() {
  const { isDark } = useTheme();
  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack>
        {/* Visible only when logged in */}
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: true,
              headerTitle: () => <Text>PintInterest </Text>,
              headerRight: () => (
                <View>
                  <ThemeToggle />
                  <Text>Logout</Text>
                </View>
              ),
            }}
          />
        </Stack.Protected>
        {/* Visible only when not logged in and account has been created */}
        <Stack.Protected guard={!isLoggedIn && !shouldCreateAccount}>
          <Stack.Screen
            name={"auth/login"}
            options={{ title: "Login", headerShown: false }}
          />
        </Stack.Protected>
        {/* Visible only when not logged in and account has not been created */}
        <Stack.Protected guard={!isLoggedIn && shouldCreateAccount}>
          <Stack.Screen
            name={"auth/signup"}
            options={{ title: "Sign Up", headerShown: false }}
          />
        </Stack.Protected>
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <BeerProvider>
      <ThemeProvider>
        <ThemedLayout />
      </ThemeProvider>
    </BeerProvider>
  );
}
