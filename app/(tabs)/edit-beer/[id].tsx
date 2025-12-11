import BeerForm from "@/components/ui/beer-form";
import CustomText from "@/components/ui/custom-text";
import { useBeers } from "@/contexts/BeerContext";
import { useTheme } from "@/contexts/ThemeContext";
import { NewBeer } from "@/types/beer";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";

export default function EditBeer() {
  const { styles } = useTheme();
  const router = useRouter();
  const { getBeerById, editBeer } = useBeers();
  const { id } = useLocalSearchParams();
  const beerId = Array.isArray(id) ? id[0] : id;

  const beer = getBeerById(beerId);

  if (!beer) {
    return (
      <View style={styles.container}>
        <CustomText>Could not find beer</CustomText>
      </View>
    );
  }

  const handleSaveChanges = async (beerId: string, beerToSave: NewBeer) => {
    console.log("editing", beerId);
    console.log("beer to save", beerToSave);
    const beerData = { id: beerId, ...beerToSave };
    console.log(beerData);
    await editBeer(beerData);
    router.replace("/(tabs)/my-beers");
  };

  return (
    <BeerForm
      initialValues={beer}
      submitLabel="Save Changes"
      onSubmit={(beerToSave) => handleSaveChanges(beerId, beerToSave)}
    />
  );
}
