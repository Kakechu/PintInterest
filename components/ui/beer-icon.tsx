import { useTheme } from "@/contexts/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";

type BeerIconProps = {
  selected: boolean;
  onPress?: () => void;
};

const BeerIcon = ({ selected, onPress }: BeerIconProps) => {
  const { styles } = useTheme();
  return (
    <Pressable onPress={onPress}>
      <Ionicons
        name={selected ? "beer" : "beer-outline"}
        size={22}
        color={styles.beerIconColor.color}
      />
    </Pressable>
  );
};

export default BeerIcon;
