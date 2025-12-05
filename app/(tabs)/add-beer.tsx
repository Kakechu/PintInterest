import { useTheme } from "@/contexts/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";


import BeerRating from "@/components/ui/beer-rating";
import CustomCheckbox from "@/components/ui/custom-checkbox";
import CustomInput from "@/components/ui/custom-input";
import CustomText from "@/components/ui/custom-text";
import CustomButton from "@/components/ui/custom_button";
import ImageViewer from "@/components/ui/image-viewer";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';


const PlaceholderImage = require("@/assets/images/placeholder.png");

export default function AddBeer() {
  const { styles } = useTheme();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [favorite, setFavorite] = useState(false);

  const snapPoint = useMemo(() => ['40%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const CustomBackdrop = (props: BottomSheetBackdropProps) => {
    return (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        //disappearsOnIndex={-1}
        // optionally other props like opacity, enableTouchThrough, pressBehavior
      />
    );
  };

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
    <GestureHandlerRootView>
    <View style={styles.container} pointerEvents="box-none">
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
          onPress={handleOpenPress}
          variant="large"
        />
        
        <CustomCheckbox checked={favorite} onValueChange={setFavorite} />
        
        <BottomSheet
            ref={bottomSheetRef}
            index={-1} // closed by default
            snapPoints={snapPoint}
            enableContentPanningGesture={false} // disable drag
            enableHandlePanningGesture={false}  // disable handle drag
            enablePanDownToClose={false}        // disable swipe to close
            backgroundStyle={{ backgroundColor: 'white'}}
            handleIndicatorStyle={{backgroundColor:"white"}}
            onChange={handleSheetChanges}
            backdropComponent={CustomBackdrop}>
            <BottomSheetView style={stylesSheet.contentContainer}>
              <CustomButton
                label="Choose from gallery"
                onPress={pickImageAsync}
                variant="large"
              />
              <CustomButton
                label="Take a photo"
                onPress={handleClosePress}
                variant="large"
              />
              <CustomButton
                label="Close menu"
                onPress={handleClosePress}
                variant="large"
              />
            </BottomSheetView>
        </BottomSheet>
        <CustomButton label="Save" />
      </View>
    </View>
    </GestureHandlerRootView>
  );
}

const stylesSheet = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
});