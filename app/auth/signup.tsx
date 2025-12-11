import { SignUpForm } from "@/components/auth/signup-form";
import { useTheme } from "@/contexts/ThemeContext";

import { View } from "react-native";

const SignUpScreen = () => {
  const { styles } = useTheme();

  return (
    <View style={styles.container}>
      <SignUpForm />
    </View>
  );
};

export default SignUpScreen;
