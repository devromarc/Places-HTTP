import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import ErrorPage from "./ErrorPage.jsx";
import { sortPlacesByDistance } from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {
  // loading state - to tell the user that you are currently fetching the data
  const [isFetching, setisFetching] = useState(false);
  // data state - storing the data you're fetching
  const [availablePlaces, setavailablePlaces] = useState([]);
  // error state - show potential errors.
  const [error, seterror] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setisFetching(true);

      try {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch places");
        }

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            resData.places,
            position.coords.latitude,
            position.coords.longitude
          );
          setavailablePlaces(sortedPlaces);
          setisFetching(false);
        });
      } catch (error) {
        seterror(error);
        setisFetching(false);
      }
    }
    fetchPlaces();
  }, []);

  if (error) {
    return <ErrorPage title="An error occured" message={error.message} />;
  }
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
