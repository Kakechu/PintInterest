import CustomText from "@/components/ui/custom-text";
import { useBeers } from "@/contexts/BeerContext";
import { useTheme } from "@/contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, router } from "expo-router";
import { Pressable, View } from "react-native";

export default function Index() {
  const { styles } = useTheme();
  const { beers } = useBeers();

  const totalBeers = beers.length;

  const averageRating =
    totalBeers > 0
      ? beers.reduce((total, next) => total + next.rating, 0) / beers.length
      : 0;

  const favorites = beers.filter((beer) => beer.favorite).length;

  return (
    <View style={styles.container}>
      <CustomText variant="screenTitle">Welcome to PintInterest</CustomText>
      <Pressable onPress={() => router.navigate("/add-beer")}>
        <View style={styles.frontPageSectionContainer}>
          <Ionicons
            name={"beer"}
            size={28}
            color={styles.beerIconColor.color}
          />
          <CustomText variant="body">Add a beer</CustomText>
        </View>
      </Pressable>
      <Pressable onPress={() => router.navigate("/my-beers")}>
        <View style={styles.frontPageSectionContainer}>
          <Ionicons
            name={"list"}
            size={28}
            color={styles.beerIconColor.color}
          />
          <CustomText variant="body">My beers</CustomText>
        </View>
      </Pressable>
      <CustomText variant="title">Statistics</CustomText>
      <CustomText variant="body">
        <Link href="/my-beers">- You&apos;ve rated {totalBeers} beers</Link>
      </CustomText>
      <CustomText variant="body">- Average rating: {averageRating}</CustomText>
      <CustomText variant="body">- You have {favorites} favorites</CustomText>
    </View>
  );
}
