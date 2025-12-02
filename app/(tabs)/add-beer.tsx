import { useTheme } from "@/contexts/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { View } from "react-native";

import BeerRating from "@/components/ui/beer-rating";
import CustomInput from "@/components/ui/custom-input";
import CustomText from "@/components/ui/custom-text";
import CustomButton from "@/components/ui/custom_button";

export default function AddBeer() {
  const { styles } = useTheme();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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
        <CustomText variant="body">This is where you put a photo.</CustomText>

        <CustomButton
          label="Choose a photo"
          onPress={pickImageAsync}
          variant="large"
        />
        <CustomText variant="body">Mark as favorite</CustomText>
      </View>
    </View>
  );
}
