import { useTheme } from "@/contexts/ThemeContext";
import { Text, View } from "react-native";

export default function BeerList() {
  const { styles } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My beers</Text>
      <Text>This is the front page with a list of beers.</Text>
      <Text>Filters for the list:</Text>
      <Text>- names</Text>
      <Text>- amount of stars</Text>
      <Text>- favorites</Text>
    </View>
  );
}
