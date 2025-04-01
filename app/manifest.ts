import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SQLBIT",
    short_name: "SQLBIT",
    description: "No Fuss SQL Playground with prebuilt queries and tables.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/img/192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/img/512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    "screenshots": [
        {
          "src": "img/sqlbit.png",
          "sizes": "830x603",
          "type": "image/png",
          "form_factor": "wide"
        },
        {
          "src": "img/sqlbit.png",
          "sizes": "830x603",
          "type": "image/png"
        }
      ]
  }
}