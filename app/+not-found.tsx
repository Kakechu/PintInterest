import CustomText from "@/components/ui/custom-text";
import { useTheme } from "@/contexts/ThemeContext";
import { Link, Stack } from "expo-router";
import { View } from "react-native";

export default function NotFoundScreen() {
  const { styles } = useTheme();
  return (
    <>
      <Stack.Screen options={{ title: "Oops! Not found" }} />
      <View style={styles.container}>
        <Link href="/">
          <CustomText variant="link">Go back to Home screen!</CustomText>
        </Link>
      </View>
    </>
  );
}
