import BeerRating from "@/components/ui/beer-rating";
import CustomText from "@/components/ui/custom-text";
import CustomButton from "@/components/ui/custom_button";
import ImageViewer from "@/components/ui/image-viewer";
import { useBeers } from "@/contexts/BeerContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";

export default function BeerView() {
  const { styles } = useTheme();
  const router = useRouter();
  const { getBeerById, deleteBeer } = useBeers();
  const { id } = useLocalSearchParams();
  const beerId = Array.isArray(id) ? id[0] : id;

  const beer = getBeerById(beerId);
  const PlaceholderImage = require("@/assets/images/placeholder-beer.png");

  if (!beer) {
    return (
      <View style={styles.container}>
        <CustomText>Could not find beer</CustomText>
      </View>
    );
  }

  function handleEdit(beerId: string) {
    console.log("editing", beerId);
    router.push("/add-beer");
  }

  function handleDelete(beerId: string) {
    console.log("deleting", beerId);
    deleteBeer(beerId);
    router.replace("/my-beers");
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <ImageViewer
          imgSource={beer.photo ? beer.photo : PlaceholderImage}
        ></ImageViewer>
        <CustomText variant="screenTitle">{beer.name}</CustomText>
        <BeerRating value={beer.rating} readOnly></BeerRating>
        <CustomText variant="body">{beer.description}</CustomText>
        {beer.favorite && <CustomText>This is a favorite</CustomText>}
        <CustomButton
          variant="small"
          label="Edit"
          onPress={() => handleEdit(beer.id)}
        />
        <CustomButton
          variant="small"
          label="Delete"
          onPress={() => handleDelete(beer.id)}
        />
      </View>
    </View>
  );
}
