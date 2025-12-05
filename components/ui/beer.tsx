import { useTheme } from "@/contexts/ThemeContext";
import { Beer } from "@/types/beer";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import BeerRating from "./beer-rating";
import CustomText from "./custom-text";

function BeerItem(beerData: Beer) {
  const { styles } = useTheme();

  function beerItemHandler() {
    console.log("pressed");
    console.log("id:", beerData.id, beerData.name);
    router.navigate({
      pathname: "/beer-view/[id]",
      params: { id: beerData.id },
    });
  }

  return (
    <View style={styles.beerItem}>
      <Pressable
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
        onPress={beerItemHandler}
      >
        <CustomText variant="label">{beerData.name}</CustomText>
        <BeerRating value={beerData.rating} readOnly />
        {beerData.favorite && <CustomText variant="body">Favorite</CustomText>}
      </Pressable>
    </View>
  );
}

export default BeerItem;
