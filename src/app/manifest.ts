import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Siva Engineering — Gear Job Work, Coimbatore",
    short_name: "Siva Engineering",
    description: "Gear hobbing, shaping, slotting, broaching and cutter grinding job work in Coimbatore.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f5f3",
    theme_color: "#1b1b1d",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
