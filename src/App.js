import React, { useEffect, useRef, useState } from "react";
import { maptilerLayer, MapStyle } from "@maptiler/leaflet-maptilersdk";
import data from './rides.json' with { type: 'json' };
import "leaflet/dist/leaflet.css";
import Navbar from "./navbar";
import SidePanel from "./sidepanel";
import L from 'leaflet';
import 'leaflet-gpx';
import { LocateControl } from "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import './App.css';

function App() {
  const mapRef = useRef(null);
  const map = useRef(null);
  const [selectedRide, setSelectedRide] = useState(null);

  useEffect(() => {
    const bounds = [
      [33.4, -84.6], // Southwest corner
      [34.1, -84.1]  // Northeast corner
    ];
    if (map.current) return;

    map.current = L.map(mapRef.current, {
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
      zoom: 14,
      minZoom: 11
    }).setView([33.7, -84.4], 13);
    maptilerLayer({
      apiKey: "sxH76Q5I5xokVHVdbJev",
      style: MapStyle.STREETS.LIGHT
    }).addTo(map.current);


    new LocateControl({
      position: "topleft",
      setView: true,
      initialZoomLevel: 13,
      flyTo: false,
      circlePadding: [10, 10],
      onLocationError: (err) => {
        console.error('Location error:', err.message);
        map.current.setView([33.7, -84.4], 13);
      }
    }).addTo(map.current);

    //Iter thru each ride and populate in map with a random color
    data.forEach(ride => {
      const randColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      if (ride.route) {
        const gpx = new L.GPX(ride.route, {
          async: true,
          polyline_options: {
            color: randColor,
            weight: 3,
            opacity: 0.8,
            className: 'gpx-track'
          },
          markers: {
            startIcon: null,
            endIcon: null
          }
        })

        const originalWeight = gpx.options.weight || 3;

        gpx.on('loaded', function (e) {
          const points = e.target.getLayers()[0].getLatLngs();
          
          if (!points.length) return;

          const start = points[0];
          const end = points[points.length - 1];

          // Add large circle at start
          L.circle(start, {
            radius: 5,
            color: randColor,
            fillColor: randColor,
            fillOpacity: 1
          }).addTo(map.current);

          L.marker(end, {
            icon: L.divIcon({
              className: "custom-end-icon",
              html: `
        <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="24px" fill="${randColor}">
          <path d="M0 0h24v24H0z" fill="none"/><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
        </svg>
      `,
              iconSize: [24, 24],
              iconAnchor: [12, 12],
            })
          }).addTo(map.current);

          gpx.bindPopup(`
            <div class="popup">
              <strong>${ride.name ? `Name: ${ride.name}</strong><br/>` : ''}
              Distance: ~${Math.round(3 * (gpx.get_distance() / (1000 * 5)))} miles
            </div>
          `);
        }).on('mouseover', function () {
          this.setStyle({ weight: originalWeight + 10 });
          gpx.openPopup();

        }).on('mouseout', function () {
          this.setStyle({ weight: originalWeight });
          gpx.closePopup();
        })
          .on('click', function () {
          const distance = Math.round(3 * (gpx.get_distance() / (1000 * 5))); // your calc logic
                      setSelectedRide({
                        name: ride.name,
                        distance,
                        description: ride.description || "No description provided."
                      });})
          .addTo(map.current);



      } else {

        const no_route = L.circle(ride.start_location, {
          radius: 100,
          color: randColor,
          fillColor: randColor,
          fillOpacity: 1
        }).addTo(map.current);

        const originalRadius = no_route.getRadius(); // safer and more direct

        no_route.bindPopup(`
          <strong>${ride.name ? `Name: ${ride.name}</strong><br/>` : ''}
        `);

        no_route.on('mouseover', function () {
          this.setRadius(originalRadius + 500);
          this.openPopup();
        })
          .on('mouseout', function () {
            this.setRadius(originalRadius);
          })
          .on('click', function () {
            setSelectedRide({
              name: ride.name,
              distance: "alternating route",
              description: ride.description || "No description provided.",
                });})

      }
    });


  }, []);


  return (
    <div className="App">
      <Navbar />
      <div ref={mapRef} style={{ height: '94vh' }}>
      <SidePanel ride={selectedRide} onClose={() => setSelectedRide(null)} />
        </div>
    </div>
  );
}

export default App;
