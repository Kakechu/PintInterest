import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";

import CustomIconButton from "@/components/ui/custom-icon-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { BeerProvider } from "@/contexts/BeerContext";
import { useAuthStore } from "@/store/authStore";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

function ThemedLayout() {
  const { isDark, styles } = useTheme();
  const { isLoggedIn, shouldCreateAccount, hasCompletedOnboarding, logOut } =
    useAuthStore();
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
                <View style={styles.ratingContainer}>
                  <ThemeToggle />
                  <CustomIconButton
                    icon="exit"
                    color={styles.iconButton.color}
                    size={24}
                    onPress={logOut}
                  />
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
        {/* Visible only when onboarding has not been completed */}
        <Stack.Protected guard={!hasCompletedOnboarding}></Stack.Protected>
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
