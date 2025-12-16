import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";

import CustomText from "@/components/ui/custom-text";
import { BeerProvider } from "@/contexts/BeerContext";
import { useAuthStore } from "@/store/authStore";
import { StatusBar } from "expo-status-bar";

function ThemedLayout() {
  const { isDark, styles } = useTheme();
  const { isLoggedIn, shouldCreateAccount, hasCompletedOnboarding, logOut } =
    useAuthStore();
  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack>
        {/* Logged in users */}
        <Stack.Protected guard={isLoggedIn && !shouldCreateAccount}>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: true,
              headerTitleAlign: "center",
              headerTitle: () => (
                <CustomText variant="headerText">PintInterest 🍺</CustomText>
              ),
            }}
          />
        </Stack.Protected>
        {/* Not logged in */}
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
