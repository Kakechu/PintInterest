import { useTheme } from "@/contexts/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

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

import { Beer, NewBeer } from "@/types/beer";
import { router } from "expo-router";

const PlaceholderImage = require("@/assets/images/placeholder.png");

type BeerFormProps = {
  initialValues?: Beer;
  onSubmit: (beer: NewBeer) => void;
  submitLabel: string;
};

export default function BeerForm({
  initialValues,
  onSubmit,
  submitLabel = "Save",
}: BeerFormProps) {
  const { styles } = useTheme();

  // Form state
  const [name, setName] = useState(initialValues?.name ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? ""
  );
  const [rating, setRating] = useState(initialValues?.rating ?? 0);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    initialValues?.photo
  );
  const [favorite, setFavorite] = useState(initialValues?.favorite ?? false);

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

  const takePhotoAsync = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      closeSheet();
    }
  };

  //Camera Permission
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Camera permission is required to take a photo.");
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name ?? "");
      setDescription(initialValues.description ?? "");
      setRating(initialValues.rating ?? 0);
      setSelectedImage(initialValues.photo);
      setFavorite(initialValues.favorite ?? false);
    }
  }, [initialValues]);

  const onSubmitHandler = () => {
    onSubmit({
      name,
      description,
      rating,
      favorite,
      photo: selectedImage,
    });
    onFormClose();
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
              {initialValues ? "Edit beer." : "Add a beer."}
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
            <Pressable
              onPress={openSheet}
              accessible
              accessibilityLabel="Select or change beer image"
            >
              <ImageViewer
                imgSource={PlaceholderImage}
                selectedImage={selectedImage}
              />
            </Pressable>
            <CustomButton
              label="Choose a photo"
              onPress={openSheet}
              variant="small"
            />

            <CustomCheckbox
              checked={favorite}
              label="Mark as favorite"
              onValueChange={setFavorite}
            />
            <CustomButton label={submitLabel} onPress={onSubmitHandler} />
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
          backgroundStyle={{
            backgroundColor: "white",
          }}
          handleIndicatorStyle={{ backgroundColor: "white" }}
          backdropComponent={CustomBackdrop}
        >
          <BottomSheetView style={styles.bottomSheetContainer}>
            <CustomButton
              label="Choose from gallery"
              onPress={pickImageAsync}
              variant="large"
            />
            <CustomButton
              label="Take a photo"
              onPress={takePhotoAsync}
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
