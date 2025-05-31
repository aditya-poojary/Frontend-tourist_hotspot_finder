import { useMemo } from "react";

import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { fetchAvailablePlaces } from "../http.js";
import useFetch from "../hooks/useFetch.js";
import useGeoLocation from "../hooks/useGeoLocation.js";
import { sortPlacesByDistance } from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
  } = useFetch(fetchAvailablePlaces, []);

  const {
    isLoading: isLocLoading,
    userLocation,
    error: locError,
  } = useGeoLocation();

  // Sort places by distance when we have both places and location
  const sortedPlaces = useMemo(() => {
    if (!availablePlaces || !userLocation) return availablePlaces || [];
    return sortPlacesByDistance(
      availablePlaces,
      userLocation.lat,
      userLocation.lon
    );
  }, [availablePlaces, userLocation]);

  return (
    <section className="available-places">
      {error && <Error title="An error occurred!" message={error.message} />}
      {locError && <Error title="Location error!" message={locError} />}
      {!error && (
        <Places
          title="Available Places"
          places={sortedPlaces}
          isLoading={isFetching || isLocLoading}
          loadingText={
            isLocLoading ? "Getting your location..." : "Fetching place data..."
          }
          fallbackText="No places available."
          onSelectPlace={onSelectPlace}
          userLocation={userLocation}
        />
      )}
    </section>
  );
}
