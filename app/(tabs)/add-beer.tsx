import { useTheme } from "@/contexts/ThemeContext";
import { Text, View } from "react-native";

export default function AddBeer() {
  const { styles } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a beer.</Text>
      <Text>Name: [input]</Text>
      <Text>Stars (1-5)</Text>
      <Text>Description: [input]</Text>
      <Text>This is where you put a photo.</Text>
      <Text>Mark as favorite.</Text>
    </View>
  );
}
