import BeerList from "@/components/ui/beer-list";
import CustomCheckbox from "@/components/ui/custom-checkbox";
import CustomText from "@/components/ui/custom-text";
import SearchBar from "@/components/ui/search-bar";
import { useBeers } from "@/contexts/BeerContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Beer } from "@/types/beer";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function MyBeers() {
  const { styles } = useTheme();
  const { beers } = useBeers();

  const [beersToShow, setBeersToShow] = useState<Beer[]>(beers);
  const [searchText, setSearchText] = useState("");

  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  useEffect(() => {
    let filtered = beers;

    if (searchText) {
      filtered = filtered.filter((beer) =>
        beer.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (showOnlyFavorites) {
      filtered = filtered.filter((beer) => beer.favorite);
    }

    setBeersToShow(filtered);
  }, [beers, searchText, showOnlyFavorites]);

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <CustomText variant="screenTitle">My beers</CustomText>
        <SearchBar value={searchText} onSearchChange={setSearchText} />
        <CustomCheckbox
          checked={showOnlyFavorites}
          label={"Show only favorite beers"}
          onValueChange={setShowOnlyFavorites}
        />
        <CustomText>Show only beers with the minimum rating of...</CustomText>
      </View>
      <BeerList items={beersToShow} />
    </View>
  );
}
