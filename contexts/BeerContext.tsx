import { Beer, NewBeer } from "@/types/beer";
import { addBeerApi, getBeersApi } from "@/utils/http";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface BeerContextType {
  beers: Beer[];
  isLoading: boolean;
  error: string;
  refreshBeers: () => Promise<void>;
  addBeer: (beerData: NewBeer) => Promise<void>;
}

const BeerContext = createContext<BeerContextType | undefined>(undefined);

export function BeerProvider({ children }: { children: ReactNode }) {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const refreshBeers = async () => {
    setIsLoading(true);
    setError("");

    try {
      const fetchedBeers = await getBeersApi();
      setBeers(fetchedBeers);
    } catch (err) {
      setError("Failed to fetch beers.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const addBeer = async (beerData: NewBeer) => {
    setError("");
    try {
      const response = await addBeerApi(beerData);
      const generatedId = response.data.name;

      if (generatedId) {
        console.log("yay, success");
        const newBeer: Beer = { id: generatedId, ...beerData };
        setBeers((prev) => [...prev, newBeer]);
      } else {
        setError("Failed to add beer.");
      }
    } catch (err) {
      setError("Failed to add beer.");
      console.error(err);
      throw err;
    }
  };
  useEffect(() => {
    refreshBeers();
  }, []);

  const value = {
    beers,
    isLoading,
    error,
    refreshBeers,
    addBeer,
  };

  return <BeerContext.Provider value={value}>{children}</BeerContext.Provider>;
}

export function useBeers() {
  const context = useContext(BeerContext);
  if (context === undefined) {
    throw new Error("useBeers must be used within a BeerProvider");
  }
  return context;
}
