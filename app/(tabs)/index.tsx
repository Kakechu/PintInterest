import CustomText from "@/components/ui/custom-text";
import { useBeers } from "@/contexts/BeerContext";
import { useTheme } from "@/contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const { styles } = useTheme();
  const { beers } = useBeers();

  const totalBeers = beers.length;

  const averageRating =
    beers.reduce((total, next) => total + next.rating, 0) / beers.length;

  const favorites = beers.filter((beer) => beer.favorite).length;

  return (
    <View style={styles.container}>
      <CustomText variant="screenTitle">Welcome to PintInterest</CustomText>
      <View style={styles.frontPageSectionContainer}>
        <Ionicons name={"beer"} size={28} color={styles.beerIconColor.color} />
        <CustomText variant="body">
          <Link href="/add-beer">Add a beer</Link>
        </CustomText>
      </View>
      <View style={styles.frontPageSectionContainer}>
        <Ionicons name="list" size={28} color={styles.beerIconColor.color} />
        <CustomText variant="body">
          <Link href="/my-beers">My beers</Link>
        </CustomText>
      </View>
      <CustomText variant="title">Statistics</CustomText>

      <CustomText variant="body">
        <Link href="/my-beers">- You&apos;ve rated {totalBeers} beers</Link>
      </CustomText>

      <CustomText variant="body">- Average rating: {averageRating}</CustomText>
      <CustomText variant="body">- You have {favorites} favorites</CustomText>
    </View>
  );
}
