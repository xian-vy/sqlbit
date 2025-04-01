import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "SQLBIT",
  description: "No Fuss SQL Playground with prebuilt queries and tables.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
            {children}
      </body>
    </html>
  );
}
