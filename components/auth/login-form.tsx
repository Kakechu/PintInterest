import { useTheme } from "@/contexts/ThemeContext";
import { useAuthStore } from "@/store/authStore";
import { loginService } from "@/utils/authentication";
import { useState } from "react";
import { Alert } from "react-native";
import CustomInput from "../ui/custom-input";
import CustomText from "../ui/custom-text";
import CustomButton from "../ui/custom_button";
import FormContainer from "../ui/form-container";

export const LoginForm = () => {
  const { styles } = useTheme();
  const { logIn } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const loginData = {
        email,
        password,
      };
      const loginResult = await loginService(loginData);
      logIn(loginResult.idToken, loginResult.localId);
    } catch (error: any) {
      Alert.alert("Sign up failed:", error.message ?? "unknown error");
    }
  };

  return (
    <FormContainer style={styles.formContainer}>
      <CustomText variant="screenTitle">Log in!</CustomText>
      <CustomInput
        label="Email"
        secure={false}
        value={email}
        onUpdateValue={setEmail}
      />
      <CustomInput
        label="Password"
        secure={true}
        value={password}
        onUpdateValue={setPassword}
      />
      <CustomButton label="Log in" onPress={handleLogin} />
    </FormContainer>
  );
};
