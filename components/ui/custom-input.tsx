import { useTheme } from "@/contexts/ThemeContext";
import { TextInput, View } from "react-native";
import CustomText from "./custom-text";

type Props = {
  label: string;
  secure: boolean;
  value: string;
  onUpdateValue: (filledInValue: string) => void;
  long?: boolean;
  search?: boolean;
};

const CustomInput = ({
  label,
  secure,
  value,
  onUpdateValue,
  long,
  search,
}: Props) => {
  const { styles } = useTheme();

  return (
    <View style={styles.inputContainer}>
      <CustomText variant={"label"}>{label}</CustomText>
      <TextInput
        autoCapitalize="none"
        secureTextEntry={secure}
        value={value}
        placeholder={search ? "Search" : ""}
        placeholderTextColor={styles.textPlaceholder.color}
        onChangeText={onUpdateValue}
        style={[styles.inputBase, long && styles.inputLong]}
        multiline={long}
        maxLength={250}
      />
    </View>
  );
};

export default CustomInput;
