"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

export default function MapInner({ activities, selectedDay, dayColors }: {
  activities: any[];
  selectedDay: number | null;
  dayColors: string[];
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || activities.length === 0) return;
    if (instanceRef.current) {
      instanceRef.current.remove();
      instanceRef.current = null;
    }

    const map = L.map(mapRef.current, { zoomControl: true }).setView(
      [activities[0].lat, activities[0].lng], 13
    );
    instanceRef.current = map;

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);

    // Draw route line between activities of the same day
    const byDay: Record<number, any[]> = {};
    for (const a of activities) {
      if (!byDay[a.day]) byDay[a.day] = [];
      byDay[a.day].push(a);
    }

    for (const [day, acts] of Object.entries(byDay)) {
      const color = dayColors[(Number(day) - 1) % dayColors.length];
      const coords = acts.map((a) => [a.lat, a.lng] as [number, number]);
      if (coords.length > 1) {
        L.polyline(coords, {
          color,
          weight: 2,
          opacity: 0.5,
          dashArray: "6, 6",
        }).addTo(map);
      }
    }

    // Add markers
    activities.forEach((act) => {
      const color = dayColors[(act.day - 1) % dayColors.length];
      const icon = L.divIcon({
        html: `<div style="
          background:${color};color:white;border-radius:50%;
          width:30px;height:30px;display:flex;align-items:center;
          justify-content:center;font-size:11px;font-weight:700;
          border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4);
        ">${act.order}</div>`,
        iconSize: [30, 30],
        className: "",
      });

      L.marker([act.lat, act.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<b style="color:#111">${act.title}</b><br/>` +
          `<small style="color:#666">Dia ${act.day}${act.startTime ? " · " + act.startTime : ""}</small>` +
          (act.estimatedCost != null ? `<br/><b style="color:#f97316">$${act.estimatedCost}</b>` : "") +
          (act.location ? `<br/><small style="color:#888">📍 ${act.location}</small>` : "")
        );
    });

    // Fit bounds
    if (activities.length > 1) {
      const bounds = L.latLngBounds(activities.map((a) => [a.lat, a.lng]));
      map.fitBounds(bounds, { padding: [30, 30] });
    }

    return () => {
      instanceRef.current?.remove();
      instanceRef.current = null;
    };
  }, [activities, selectedDay]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}
