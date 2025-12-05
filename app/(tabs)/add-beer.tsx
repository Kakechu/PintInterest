import { useTheme } from "@/contexts/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import { useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import BeerRating from "@/components/ui/beer-rating";
import CustomCheckbox from "@/components/ui/custom-checkbox";
import CustomInput from "@/components/ui/custom-input";
import CustomText from "@/components/ui/custom-text";
import CustomButton from "@/components/ui/custom_button";
import ImageViewer from "@/components/ui/image-viewer";

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useBeers } from "@/contexts/BeerContext";
import { NewBeer } from "@/types/beer";
import { useRouter } from "expo-router";

const PlaceholderImage = require("@/assets/images/placeholder.png");

export default function AddBeer({ editMode = false }) {
  const { styles } = useTheme();
  const { addBeer } = useBeers();
  const router = useRouter();

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [favorite, setFavorite] = useState(false);

  // BottomSheet setup
  const snapPoints = useMemo(() => ["40%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const openSheet = () => bottomSheetRef.current?.expand();
  const closeSheet = () => bottomSheetRef.current?.close();

  const CustomBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop {...props} appearsOnIndex={0} />
  );

  // Image picking
  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      closeSheet();
    } else {
      alert("You did not select any image.");
    }
  };

  // Save new beer
  const onSubmitHandler = async () => {
    try {
      const beerData: NewBeer = {
        name,
        rating,
        description,
        photo: selectedImage,
        favorite,
      };

      await addBeer(beerData);
      onFormClose();
    } catch (error) {
      console.log("Save error", error);
    }
  };

  // Edit existing beer (placeholder)
  const onEditHandler = async () => {
    try {
      console.log("Editing beer...");
      onFormClose();
    } catch (error) {
      console.error("Edit error", error);
    }
  };

  const onFormClose = () => {
    setName("");
    setDescription("");
    setRating(0);
    setSelectedImage(undefined);
    setFavorite(false);
    router.navigate("/my-beers");
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container} pointerEvents="box-none">
        <ScrollView>
          <View style={styles.formContainer}>
            <CustomText variant={"screenTitle"}>
              {editMode ? "Edit beer." : "Add a beer."}
            </CustomText>

            <CustomInput
              label="Name"
              secure={false}
              value={name}
              onUpdateValue={setName}
            />

            <BeerRating value={rating} onChange={setRating} />

            <CustomInput
              label="Description"
              secure={false}
              value={description}
              onUpdateValue={setDescription}
              long={true}
            />

            <ImageViewer
              imgSource={PlaceholderImage}
              selectedImage={selectedImage}
            />

            <CustomButton
              label="Choose a photo"
              onPress={openSheet}
              variant="large"
            />

            <CustomCheckbox
              checked={favorite}
              label="Mark as favorite"
              onValueChange={setFavorite}
            />

            {!editMode ? (
              <CustomButton label="Save" onPress={onSubmitHandler} />
            ) : (
              <CustomButton label="Save changes" onPress={onEditHandler} />
            )}
          </View>
        </ScrollView>

        {/* BottomSheet Menu */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enableContentPanningGesture={false}
          enableHandlePanningGesture={false}
          enablePanDownToClose={false}
          backgroundStyle={{ backgroundColor: "white" }}
          handleIndicatorStyle={{ backgroundColor: "white" }}
          backdropComponent={CustomBackdrop}
        >
          <BottomSheetView style={bottomSheetStyles.contentContainer}>
            <CustomButton
              label="Choose from gallery"
              onPress={pickImageAsync}
              variant="large"
            />
            <CustomButton
              label="Take a photo"
              onPress={closeSheet}
              variant="large"
            />
            <CustomButton
              label="Close menu"
              onPress={closeSheet}
              variant="large"
            />
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const bottomSheetStyles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    gap: 10,
  },
});
