import type { ListRenderItemInfo } from "react-native";
import { FlatList, View } from "react-native";

import { useTheme } from "@/contexts/ThemeContext";
import { Beer } from "@/types/beer";

import BeerItem from "./beer-item";

type Props = { items: Beer[] };

function BeerList({ items }: Props) {
  const { styles } = useTheme();

  function renderBeerItem(itemData: ListRenderItemInfo<Beer>) {
    const item = itemData.item;

    const beerProps = {
      id: item.id,
      name: item.name,
      rating: item.rating,
      description: item.description,
      photo: item.photo,
      favorite: item.favorite,
    };
    return <BeerItem {...beerProps} />;
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderBeerItem}
      />
    </View>
  );
}

export default BeerList;
