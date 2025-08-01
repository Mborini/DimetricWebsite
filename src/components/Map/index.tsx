"use client";

import { useState, useEffect, useRef } from "react";
import SectionTitle from "../Common/SectionTitle";
import mapboxgl from "mapbox-gl";  // Import Mapbox library
import "mapbox-gl/dist/mapbox-gl.css"; // Ensure Mapbox CSS is included

// Your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibW9oYm9yaW5pIiwiYSI6ImNtMDNzajUyczAxMHYycnM0cTE4cTV4amoifQ.0KnW_JhYY7pcTx9NVVWFXg';

const Map = () => {
  const mapContainer = useRef(null);  // Reference to the map container
  const map = useRef(null);  // Reference to the map instance
  const markerRef = useRef(null);  // Reference to the marker instance
  const [lng, setLng] = useState(35.882182653793464);  // Default longitude
  const [lat, setLat] = useState(31.97223872985602);  // Default latitude
  const [zoom, setZoom] = useState(15);  // Default zoom level for 3D buildings

  useEffect(() => {
    if (map.current) return;  // Initialize map only once

    // Initialize Mapbox map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",  // Map style with 3D buildings
      center: [lng, lat],  // Center the map based on the coordinates
      zoom: zoom,
      pitch: 60,  // Tilt the map for 3D effect
      bearing: -17.6,  // Rotate for better 3D view
    });

    // Add 3D buildings using a 'fill-extrusion' layer
    map.current.on('load', () => {
      map.current.addLayer({
        id: '3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        type: 'fill-extrusion',
        minzoom: 15,  // 3D visible at zoom 15+
        paint: {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': [
            'interpolate', ['linear'], ['zoom'],
            15, 0,
            16, ['get', 'height']
          ],
          'fill-extrusion-base': [
            'interpolate', ['linear'], ['zoom'],
            15, 0,
            16, ['get', 'min_height']
          ],
          'fill-extrusion-opacity': 0.6
        }
      });
    });

    // Create a marker at the specified coordinates
    markerRef.current = new mapboxgl.Marker()
      .setLngLat([35.882182653793464, 31.97223872985602])  // Your specified location
      .addTo(map.current);

    // Add zoom and rotation controls to the map
    map.current.addControl(new mapboxgl.NavigationControl());

  }, [lng, lat, zoom]);

  return (
<section className="relative z-10 overflow-hidden min-h-[600px] py-10 md:py-20 lg:py-24">
  {/* خلفية الصورة */}
  <div
    className="absolute inset-0 bg-center bg-cover opacity-20 z-0"
    style={{
      backgroundImage: "url('/images/hero/m6.png')",
    }}
  />

  {/* المحتوى */}
  <div className="relative z-10 container">
    <SectionTitle
      title="where we are ?"
      paragraph="We are located in the heart of Amman city, where you can easily find us."
      center
      mb="80px"
    />

    <div className="-mx-4 flex flex-wrap">
      <div className="w-full px-4">
        <div className="mx-auto max-w-[850px] shadow-xl overflow-hidden rounded-xl">
          <div className="relative aspect-[77/40] items-center justify-center border-8 border-gray-300">
            <div ref={mapContainer} className="w-full h-[450px] rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


  );
};

export default Map;
