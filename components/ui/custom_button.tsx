import { useTheme } from "@/contexts/ThemeContext";
import { Pressable, Text } from "react-native";

type Props = {
  label: string;
  onPress?: () => void;
  variant?: "small" | "large";
  secondary?: boolean;
};

export default function CustomButton({
  label,
  onPress,
  variant,
  secondary,
}: Props) {
  const { styles } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        secondary ? styles.secondaryButton : styles.button,
        variant === "small" ? styles.buttonSmall : styles.buttonLarge,

        pressed && styles.buttonPressed,
      ]}
    >
      <Text
        style={[secondary ? styles.buttonLabelSecondary : styles.buttonLabel]}
      >
        {label}
      </Text>
    </Pressable>
  );
}
