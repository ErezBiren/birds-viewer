const ZAPARI_API = "https://zapari.any.do/birds/";

const useFetchNextBirds = () => {
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

      return data.items;
    } catch (error) {
      console.error(error);
    }
  }

  return { fetchNextBirds };
};

export default useFetchNextBirds;
