import BeerRating from "@/components/ui/beer-rating";
import CustomText from "@/components/ui/custom-text";
import CustomButton from "@/components/ui/custom_button";
import ImageViewer from "@/components/ui/image-viewer";
import { useBeers } from "@/contexts/BeerContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, View } from "react-native";

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
    router.navigate({
      pathname: "/edit-beer/[id]",
      params: { id: beerId },
    });
  }

  async function handleDelete(beerId: string) {
    try {
      await deleteBeer(beerId);
      router.replace("/my-beers");
    } catch (error) {
      Alert.alert("Failed to delete beer");
      console.error(error);
    }
  }

  function confirmDelete(beerId: string) {
    Alert.alert(
      "Confirm deletion",
      "Are you sure you want to delete this beer?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => console.log("Canceling deletion"),
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDelete(beerId),
        },
      ]
    );
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
          onPress={() => confirmDelete(beer.id)}
        />
      </View>
    </View>
  );
}
