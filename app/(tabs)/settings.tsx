import CustomIconButton from "@/components/ui/custom-icon-button";
import CustomText from "@/components/ui/custom-text";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuthStore } from "@/store/authStore";
import { View } from "react-native";

const SettingsScreen = () => {
  const { styles } = useTheme();
  const { logOut, deleteUser } = useAuthStore();

  return (
    <View style={styles.container}>
      <CustomText variant="screenTitle">Settings</CustomText>
      <View style={styles.rowContainer}>
        <ThemeToggle />
        <CustomText variant="label">Switch mode</CustomText>
      </View>
      <View style={styles.rowContainer}>
        <CustomIconButton
          icon="exit"
          color={styles.iconButton.color}
          size={24}
          onPress={logOut}
        />
        <CustomText variant="label">Logout</CustomText>
      </View>
      <View style={styles.rowContainer}>
        <CustomIconButton
          icon="person-remove"
          color={styles.iconButton.color}
          size={24}
          onPress={deleteUser}
        />
        <CustomText variant="label">Delete user</CustomText>
      </View>
    </View>
  );
};

export default SettingsScreen;
