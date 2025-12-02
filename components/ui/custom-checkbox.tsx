import { useTheme } from "@/contexts/ThemeContext";
import { Checkbox } from "expo-checkbox";
import { View } from "react-native";
import CustomText from "./custom-text";

type Props = {
  checked: boolean;
  onValueChange: (newValue: boolean) => void;
};

const CustomCheckbox = ({ checked, onValueChange }: Props) => {
  const { styles } = useTheme();
  return (
    <View style={styles.checkBoxContainer}>
      <Checkbox
        value={checked}
        onValueChange={onValueChange}
        color={checked ? styles.checkBox.color : undefined}
      ></Checkbox>
      <CustomText variant="label">Mark as favorite</CustomText>
    </View>
  );
};

export default CustomCheckbox;

// Source: https://docs.expo.dev/versions/latest/sdk/checkbox/
