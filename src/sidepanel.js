import React from 'react';
import './sidepanel.css';

export default function SidePanel({ ride, onClose }) {
  if (!ride) return null;

  return (
    <div className="route-info-panel">
      <button className="close-btn" onClick={onClose}>×</button>
      <h2>{ride.name || "Unnamed Ride"}</h2>
      <p><strong>Distance:</strong> ~{ride.distance || '--'} miles</p>
      <p><strong>Description:</strong> {ride.description || "No description available."}</p>
    </div>
  );
}
