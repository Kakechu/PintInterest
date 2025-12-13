import { useTheme } from "@/contexts/ThemeContext";
import { useAuthStore } from "@/store/authStore";
import { signUpService } from "@/utils/authentication";
import { useState } from "react";
import { Alert } from "react-native";
import CustomInput from "../ui/custom-input";
import CustomText from "../ui/custom-text";
import CustomButton from "../ui/custom_button";
import FormContainer from "../ui/form-container";

export const SignUpForm = () => {
  const { styles } = useTheme();
  const { createAccount } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const signUpData = {
        email,
        password,
      };

      console.log(signUpData);

      await signUpService(signUpData);

      createAccount();
      Alert.alert("Sign up successful!");
    } catch (error: any) {
      Alert.alert("Sign up failed:", error.message ?? "unknown error");
    }
  };

  return (
    <FormContainer style={styles.formContainer}>
      <CustomText variant="screenTitle">Sign up!</CustomText>
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
      <CustomInput
        label="Confirm password"
        secure={true}
        value={confirmPassword}
        onUpdateValue={setConfirmPassword}
      />
      <CustomButton label="Sign up" onPress={onSignUp} />
    </FormContainer>
  );
};
