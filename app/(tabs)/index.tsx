import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const { styles } = useTheme();

  return (
    <View style={styles.container}>
      <Text>Welcome to PintInterest</Text>
      <Link href="/add-beer">Add a beer (link to the add-beer screen)</Link>
      <Text>This is where you can see the main stats:</Text>
      <Link href="/beer-list">
        - You&apos;ve tried 15 beers (this could be a link that takes you to the
        listing)
      </Link>
      <Text>- Average rating: 4</Text>
      <Text>- You have 4 favorites</Text>
    </View>
  );
}
