import CustomText from "@/components/ui/custom-text";
import { useTheme } from "@/contexts/ThemeContext";
import { View } from "react-native";

export default function BeerList() {
  const { styles } = useTheme();
  return (
    <View style={styles.container}>
      <CustomText variant="screenTitle">My beers</CustomText>
      <CustomText>This is the front page with a list of beers.</CustomText>
      <CustomText>Filters for the list:</CustomText>
      <CustomText>- names</CustomText>
      <CustomText>- amount of stars</CustomText>
      <CustomText>- favorites</CustomText>
    </View>
  );
}
