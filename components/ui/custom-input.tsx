import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { TextInput, View } from "react-native";
import CustomIconButton from "./custom-icon-button";
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
  const [showContents, setShowContents] = useState(!secure);

  const toggleVisibility = () => {
    console.log("secure", secure);
    console.log("show password:", showContents);

    setShowContents((prev) => !prev);
  };

  return (
    <View style={styles.inputContainer}>
      <CustomText variant={"label"}>{label}</CustomText>
      <View style={styles.inputWrapper}>
        <TextInput
          autoCapitalize="none"
          secureTextEntry={secure && !showContents}
          value={value}
          placeholder={search ? "Search" : ""}
          placeholderTextColor={styles.textPlaceholder.color}
          onChangeText={onUpdateValue}
          style={[
            styles.inputBase,
            secure && styles.inputWithIcon,
            long && styles.inputLong,
          ]}
          multiline={long}
          maxLength={250}
        />
        {secure && (
          <View style={styles.iconOverlay}>
            <CustomIconButton
              icon={showContents ? "eye-off" : "eye"}
              size={styles.textBase.fontSize}
              onPress={toggleVisibility}
              color={styles.iconButton.color}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default CustomInput;
