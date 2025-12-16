import BeerForm from "@/components/ui/beer-form";
import { useBeers } from "@/contexts/BeerContext";
import { NewBeer } from "@/types/beer";
import { useRouter } from "expo-router";

export default function AddBeer() {
  const { addBeer } = useBeers();
  const router = useRouter();

  // Save new beer
  const onSubmitHandler = async (beerToSave: NewBeer) => {
    try {
      await addBeer(beerToSave);
      router.replace("/my-beers");
    } catch (error) {
      console.log("Save error", error);
    }
  };

  return (
    <BeerForm
      submitLabel="Save"
      onSubmit={(beerToSave) => {
        onSubmitHandler(beerToSave);
      }}
    />
  );
}
