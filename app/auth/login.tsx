import { LoginForm } from "@/components/auth/login-form";
import { useTheme } from "@/contexts/ThemeContext";
import { View } from "react-native";

const LoginScreen = () => {
  const { styles } = useTheme();

  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
};

export default LoginScreen;
