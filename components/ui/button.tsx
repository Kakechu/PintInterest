import { useTheme } from "@/contexts/ThemeContext";
import { Pressable, Text, View } from 'react-native';


type Props = {
  label: string;
  onPress?: () => void;
};

export default function Button({ label, onPress }: Props) {

  const { styles } = useTheme();
  
  return (
    <View style={[styles.buttonContainer]}>
      <Pressable style={[styles.button]} onPress={onPress}>
        <Text style={[styles.buttonLabel]}>{label}</Text>
      </Pressable>
    </View>
  );
}