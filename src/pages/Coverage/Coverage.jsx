"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// ----------------- Icons -----------------
const normalIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const activeIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// ----------------- Map Controller -----------------
const MapController = ({ target }) => {
  const map = useMap();

  useEffect(() => {
    if (target) {
      map.setView([target.latitude, target.longitude], 10, { animate: true });
    }
  }, [target, map]);

  return null;
};

// ----------------- Main Component -----------------
const Coverage = () => {
  const { scrollYProgress } = useScroll();
  const warehouses = useLoaderData();

  const [search, setSearch] = useState("");
  const [matchedWarehouse, setMatchedWarehouse] = useState(null);
  const markerRefs = useRef({});

  // Search logic: ignore case + partial match
  useEffect(() => {
    if (!search) {
      setMatchedWarehouse(null);
      return;
    }

    const found = warehouses.find((w) =>
      w.district.toLowerCase().includes(search.toLowerCase())
    );

    setMatchedWarehouse(found || null);
  }, [search, warehouses]);

  // Auto open popup when match found
  useEffect(() => {
    if (matchedWarehouse) {
      const ref = markerRefs.current[matchedWarehouse.district];
      if (ref) ref.openPopup();
    }
  }, [matchedWarehouse]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[6px] bg-primary origin-left z-50"
      />

      <div className="min-h-screen px-4 py-10">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
          We are available in 64 districts
        </h1>

        {/* Search box */}
        <div className="max-w-md mx-auto mb-6">
          <input
            type="text"
            placeholder="Search district (e.g. dha, syl)"
            className="input input-bordered w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Map Section */}
        <div className="max-w-5xl mx-auto rounded-xl overflow-hidden shadow-lg">
          <MapContainer
            center={[23.685, 90.3563]}
            zoom={8}
            scrollWheelZoom={false}
            className="h-[600px] w-full"
          >
            {matchedWarehouse && <MapController target={matchedWarehouse} />}

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {warehouses.map((warehouse) => (
              <Marker
                key={warehouse.id || warehouse.district}
                position={[warehouse.latitude, warehouse.longitude]}
                icon={
                  matchedWarehouse?.district === warehouse.district
                    ? activeIcon
                    : normalIcon
                }
                ref={(ref) => {
                  markerRefs.current[warehouse.district] = ref;
                }}
              >
                <Popup>
                  <strong>{warehouse.district}</strong>
                  <br />
                  {warehouse.covered_area.join(", ")}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Example Page Content */}
      <div className="max-w-xl mx-auto px-4 py-32 space-y-6">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Fringilla quam urna. Cras turpis elit, euismod eget ligula.</p>
        <h2 className="text-2xl font-bold">Sub-header</h2>
        <p>In eget sodales arcu, consectetur efficitur metus.</p>
        <p>Pellentesque id lacus pulvinar elit pulvinar pretium.</p>
      </div>
    </>
  );
};

export default Coverage;
