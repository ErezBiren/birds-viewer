import { Bird } from "../types/bird";
import { v4 } from "uuid";

const ZAPARI_API = "https://zapari.any.do/birds/";

async function fetchNextBirds(amount: number) {
  try {
    const response = await fetch(ZAPARI_API + amount);
    if (!response.ok) {
      throw new Error("Failed to fetch bird data");
    }

    const data = await response.json();

    if (!data.items) {
      throw new Error("No bird items found");
    }

    // add Unique Ids to the birds 
    const withIds = data.items.map((item: Bird) => ({ ...item, id: v4() }));

    return withIds;
  } catch (error) {
    console.error(error);
  }
}
export default fetchNextBirds;
