import { useTheme } from "@/contexts/ThemeContext";
import * as ImagePicker from 'expo-image-picker';
import { Text, View } from "react-native";

import Button from '@/components/ui/button';

export default function AddBeer() {
  const { styles } = useTheme();

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a beer.</Text>
      <Text>Name: [input]</Text>
      <Text>Stars (1-5)</Text>
      <Text>Description: [input]</Text>
      <Text>This is where you put a photo.</Text>
      <Text>Mark as favorite.</Text>
      <Button label="Choose a photo" onPress={pickImageAsync} />
    </View>
  );
}
