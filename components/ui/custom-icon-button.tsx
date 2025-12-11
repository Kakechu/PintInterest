import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

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
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={icon} color={color} size={size} />
    </Pressable>
  );
};

export default CustomIconButton;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 18,
  },
  pressed: {
    opacity: 0.72,
  },
});
