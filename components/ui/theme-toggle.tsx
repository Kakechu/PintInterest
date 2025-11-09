import { useTheme } from "@/contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  const onPress = () => {
    toggleTheme();
  };
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={isDark ? "sunny" : "moon"} size={22} />
    </Pressable>
  );
};
