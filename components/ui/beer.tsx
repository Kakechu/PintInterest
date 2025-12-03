import { useTheme } from "@/contexts/ThemeContext";
import { Beer } from "@/types/beer";
import { View } from "react-native";
import BeerRating from "./beer-rating";
import CustomText from "./custom-text";

function BeerItem(beerData: Beer) {
  const { styles } = useTheme();

  return (
    <View style={styles.beerItem}>
      <CustomText variant="label">{beerData.name}</CustomText>
      <BeerRating value={beerData.rating} readOnly />
    </View>
  );
}

export default BeerItem;
