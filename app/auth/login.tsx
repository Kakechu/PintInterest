import CustomText from "@/components/ui/custom-text";
import { useTheme } from "@/contexts/ThemeContext";
import { View } from "react-native";

const LoginScreen = () => {
  const { styles } = useTheme();
  return (
    <View style={styles.container}>
      <CustomText variant="screenTitle">Login</CustomText>
    </View>
  );
};

export default LoginScreen;
