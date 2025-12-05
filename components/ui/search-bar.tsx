import { View } from "react-native";
import CustomInput from "./custom-input";

type Props = {
  value: string;
  onSearchChange: (text: string) => void;
};

const SearchBar = ({ value, onSearchChange }: Props) => {
  return (
    <View>
      <CustomInput
        label={""}
        secure={false}
        value={value}
        onUpdateValue={onSearchChange}
        search
      />
    </View>
  );
};

export default SearchBar;
