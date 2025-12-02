import { useTheme } from "@/contexts/ThemeContext";
import { Text, View } from "react-native";

type TextVariant = "screenTitle" | "label" | "body" | "pressable";

type Props = {
  children?: React.ReactNode;
  variant?: TextVariant;
};

const CustomText = ({ children, variant }: Props) => {
  const { styles } = useTheme();
  return (
    <View>
      <Text
        style={[
          styles.textBase,
          variant === "screenTitle" && styles.textScreenTitle,
          variant === "label" && styles.textLabel,
          variant === "body" && styles.textBody,
          variant === "pressable" && styles.textPressable,
        ]}
      >
        {children}
      </Text>
    </View>
  );
};

export default CustomText;
