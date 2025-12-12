import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";

interface CustomIconButtonProps {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  size: number;
  onPress: () => void;
}

const CustomIconButton = ({
  icon,
  color,
  size,
  onPress,
}: CustomIconButtonProps) => {
  const { styles } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.iconButton,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
    >
      <Ionicons name={icon} color={color} size={size} />
    </Pressable>
  );
};

export default CustomIconButton;
