import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mob'in | List Your Property, Fill Your Rooms",
  description:
    "Mob'in helps landlords list boarding houses, dormitories and apartments, receive tenant inquiries in one place and keep rooms occupied. Sign in free with 2 posts included.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={`${inter.variable} min-h-full bg-cream font-sans text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
