import CustomText from "@/components/ui/custom-text";
import { useTheme } from "@/contexts/ThemeContext";
import { View } from "react-native";

const SignUpScreen = () => {
  const { styles } = useTheme();
  return (
    <View style={styles.container}>
      <CustomText variant="screenTitle">Sign up</CustomText>
    </View>
  );
};

export default SignUpScreen;
