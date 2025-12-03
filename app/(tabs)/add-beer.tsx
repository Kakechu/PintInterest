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

const PlaceholderImage = require("@/assets/images/placeholder.png");

export default function AddBeer() {
  const { styles } = useTheme();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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
        <BeerRating onChange={() => {}} />
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
        <CustomCheckbox checked={favorite} onValueChange={setFavorite} />
        <CustomButton label="Save" />
      </View>
    </View>
  );
}
