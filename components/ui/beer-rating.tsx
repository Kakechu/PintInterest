import { useTheme } from "@/contexts/ThemeContext";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import BeerIcon from "./beer-icon";
import CustomText from "./custom-text";

type RatingProps = {
  value?: number;
  onChange: (rating: number) => void;
};

const BeerRating: React.FC<RatingProps> = ({
  value = 0,
  onChange,
}: RatingProps) => {
  const { styles } = useTheme();
  const [rating, setRating] = useState(0);

  const totalBeers = 5;

  const handlePress = (index: number) => {
    setRating(index + 1);
    onChange(index + 1);
    console.log(index);
  };

  const handleClear = () => {
    setRating(0);
    onChange(0);
    console.log("clearing");
  };

  return (
    <View>
      <CustomText variant={"label"}>Rating (1-5):</CustomText>
      <View style={styles.ratingContainer}>
        {Array.from({ length: totalBeers }, (_, index) => (
          <BeerIcon
            key={index}
            selected={index < rating}
            onPress={() => handlePress(index)}
          />
        ))}
      </View>
      <Pressable onPress={handleClear}>
        <CustomText variant="pressable">Reset</CustomText>
      </Pressable>
    </View>
  );
};

export default BeerRating;

/*
Inspiration from here: https://dev.to/yousufdev702/building-a-custom-star-rating-component-in-react-native-with-sliding-and-press-interactions-49i
 */
