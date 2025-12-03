import BeerList from "@/components/ui/beer-list";
import CustomText from "@/components/ui/custom-text";
import { useBeers } from "@/contexts/BeerContext";
import { useTheme } from "@/contexts/ThemeContext";
import { View } from "react-native";

export default function MyBeers() {
  const { styles } = useTheme();
  const { beers } = useBeers();

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <CustomText variant="screenTitle">My beers</CustomText>
        <CustomText>This is the front page with a list of beers.</CustomText>
        <CustomText>Filters for the list:</CustomText>
        <CustomText>- names</CustomText>
        <CustomText>- amount of stars</CustomText>
        <CustomText>- favorites</CustomText>
      </View>
      <BeerList items={beers} />
    </View>
  );
}
