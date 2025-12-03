import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { Pressable, View } from "react-native";
import BeerIcon from "./beer-icon";
import CustomText from "./custom-text";

type RatingProps = {
  value: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
};

const BeerRating: React.FC<RatingProps> = ({
  value = 0,
  onChange,
  readOnly = false,
}: RatingProps) => {
  const { styles } = useTheme();
  const totalBeers = 5;

  const handlePress = (index: number) => {
    if (readOnly) return;
    onChange?.(index + 1);
    console.log(index);
  };

  const handleClear = () => {
    if (readOnly) return;
    onChange?.(0);
  };

  return (
    <View>
      {!readOnly && <CustomText variant={"label"}>Rating (1-5):</CustomText>}
      <View style={styles.ratingContainer}>
        {Array.from({ length: totalBeers }, (_, index) => (
          <BeerIcon
            key={index}
            selected={index < value}
            onPress={() => handlePress(index)}
          />
        ))}
      </View>
      {!readOnly && (
        <Pressable onPress={handleClear}>
          <CustomText variant="pressable">Reset</CustomText>
        </Pressable>
      )}
    </View>
  );
};

export default BeerRating;

/*
Inspiration from here: https://dev.to/yousufdev702/building-a-custom-star-rating-component-in-react-native-with-sliding-and-press-interactions-49i
 */
