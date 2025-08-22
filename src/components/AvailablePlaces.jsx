import { useEffect, useState } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setisFetching] = useState(false);
  const [availablePlaces, setavailablePlaces] = useState([]);

  useEffect(() => {
    async function fetchPlaces() {
      setisFetching(true);
      const response = await fetch("http://localhost:3000/places");
      const resData = await response.json();
      setavailablePlaces(resData.places);
      setisFetching(false);
    }
    fetchPlaces();
  }, []);
  return (
    <Places
      title="Available Places"
      isLoading={isFetching}
      loadingText="Fetching place data ...."
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
