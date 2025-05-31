import { useState, useEffect } from "react";
import { calculateDistance } from "../loc.js";
import { getImageUrl } from "../utils/cloudinary.js";

export default function Places({
  title,
  places,
  fallbackText,
  onSelectPlace,
  isLoading,
  loadingText,
  userLocation,
}) {
  if (isLoading) {
    return <p className="loading-text">{loadingText}</p>;
  }

  return (
    <section className="places-category">
      <h2>{title}</h2>
      {places.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {places.length > 0 && (
        <ul className="places">
          {places.map((place) => {
            // Calculate distance if user location is available
            let distance = null;
            if (userLocation && place.lat && place.lon) {
              distance = calculateDistance(
                userLocation.lat,
                userLocation.lon,
                place.lat,
                place.lon
              );
            }

            return (
              <li key={place.id} className="place-item">
                <button onClick={() => onSelectPlace(place)}>
                  <img
                    src={getImageUrl(place.image)}
                    alt={place.image.alt || place.title}
                  />
                  <h3>{place.title}</h3>
                  {distance !== null && (
                    <p className="place-distance">
                      {distance.toFixed(1)} km away
                    </p>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
