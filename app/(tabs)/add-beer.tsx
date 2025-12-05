import { useTheme } from "@/contexts/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { View } from "react-native";

import BeerRating from "@/components/ui/beer-rating";
import CustomCheckbox from "@/components/ui/custom-checkbox";
import CustomInput from "@/components/ui/custom-input";
import CustomText from "@/components/ui/custom-text";
import CustomButton from "@/components/ui/custom_button";
import ImageViewer from "@/components/ui/image-viewer";
import { NewBeer } from "@/types/beer";

import { useBeers } from "@/contexts/BeerContext";
import { useRouter } from "expo-router";

const PlaceholderImage = require("@/assets/images/placeholder.png");

export default function AddBeer() {
  const { styles } = useTheme();
  const { addBeer } = useBeers();
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [favorite, setFavorite] = useState(false);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
    } else {
      alert("You did not select any image.");
    }
  };

  const onSubmitHandler = async () => {
    try {
      const beerData: NewBeer = {
        name,
        rating,
        description,
        photo: selectedImage,
        favorite,
      };
      console.log(beerData);
      await addBeer(beerData);
      resetForm();
      router.navigate("/my-beers");
    } catch (error) {
      console.log("oopsie", error);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setRating(0);
    setSelectedImage(undefined);
    setFavorite(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <CustomText variant={"screenTitle"}>Add a beer.</CustomText>

        <CustomInput
          label="Name"
          secure={false}
          value={name}
          onUpdateValue={(value) => setName(value)}
        />
        <BeerRating value={rating} onChange={(value) => setRating(value)} />
        <CustomInput
          label="Description"
          secure={false}
          value={description}
          onUpdateValue={(value) => setDescription(value)}
          long={true}
        />
        <ImageViewer
          imgSource={PlaceholderImage}
          selectedImage={selectedImage}
        />

        <CustomButton
          label="Choose a photo"
          onPress={pickImageAsync}
          variant="large"
        />
        <CustomCheckbox
          checked={favorite}
          label="Mark as favorite"
          onValueChange={setFavorite}
        />
        <CustomButton label="Save" onPress={onSubmitHandler} />
      </View>
    </View>
  );
}
