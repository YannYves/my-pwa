"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";

const DynamicMapContainer = dynamic(
  () => import("react-leaflet").then((module) => module.MapContainer),
  {
    ssr: false,
  }
);

const Map: React.FC = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [tracking, setTracking] = useState(false);
  const [journey, setJourney] = useState<[number, number][]>([]);

  useEffect(() => {
    if (tracking) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPosition: [number, number] = [latitude, longitude];
          setJourney((prevJourney) => [...prevJourney, newPosition]);
          setUserLocation(newPosition);
        },
        (error) => {
          console.log("Error getting user location:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
        }
      );
    }
  }, [tracking]);

  const handleStartTracking = () => {
    setJourney([]);
    setTracking(true);
  };

  const handleStopTracking = () => {
    setTracking(false);
  };

  return (
    <div>
      <div id='map' style={{ height: "400px" }}>
        {typeof window !== "undefined" && (
          <DynamicMapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: "100%" }}
          >
            {userLocation && <Marker position={userLocation} />}
            {journey.length > 1 && (
              <Polyline positions={journey} color='lime' />
            )}
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          </DynamicMapContainer>
        )}
      </div>
      <div>
        {tracking ? (
          <button onClick={handleStopTracking}>Stop Tracking</button>
        ) : (
          <button onClick={handleStartTracking}>Start Tracking</button>
        )}
      </div>
      <div>
        <h2>Journey</h2>
        <ul>
          {journey.map((position, index) => (
            <li key={index}>
              Latitude: {position[0]}, Longitude: {position[1]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Map;
