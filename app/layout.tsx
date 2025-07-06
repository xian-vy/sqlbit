import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "SQLBIT",
  description: "No Fuss SQL Playground with prebuilt queries and tables.",
  openGraph: {
    title: "SQLBIT",
    description: "No Fuss SQL Playground with prebuilt queries and tables.",
    url: "https://sqlbit.vercel.app",
    siteName: "SQLBIT",
    images: [
      {
        url: "/img/sqlbit.png",
        width: 830,
        height: 603,
        alt: "SQLBIT - SQL Playground"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "SQLBIT",
    description: "No Fuss SQL Playground with prebuilt queries and tables.",
    images: ["/img/sqlbit.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('ServiceWorker registration successful');
                    },
                    function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
