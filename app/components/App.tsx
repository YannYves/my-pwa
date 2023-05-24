"use client";

import React, { useEffect } from "react";

const Map: React.FC = () => {
  useEffect(() => {
    import("leaflet").then((L) => {
      const map = L.map("map").setView([51.505, -0.09], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([51.505, -0.09]).addTo(map).bindPopup("A sample marker.");

      return () => {
        map.remove();
      };
    });
  }, []);

  return <div id='map' style={{ height: "400px" }}></div>;
};

export default Map;
