import CustomText from "@/components/ui/custom-text";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const { styles } = useTheme();

  return (
    <View style={styles.container}>
      <CustomText variant="screenTitle">Welcome to PintInterest</CustomText>
      <CustomText variant="link">
        <Link href="/add-beer">Add a beer (link to the add-beer screen)</Link>
      </CustomText>

      <CustomText variant="body">
        This is where you can see the main stats:
      </CustomText>
      <CustomText variant="link">
        <Link href="/my-beers">
          - You&apos;ve tried 15 beers (this could be a link that takes you to
          the listing)
        </Link>
      </CustomText>

      <CustomText>- Average rating: 4</CustomText>
      <CustomText>- You have 4 favorites</CustomText>
    </View>
  );
}
