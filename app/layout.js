// app/layout.js
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  // Keep the brand; corrected casing
  title: "Vertex Global Agency",
  description: "We build digital experiences that transform businesses.",
};

/**
 * Note:
 * We set <html lang="da"> since Danish is the default.
 * The Header updates the URL to /da or /en and the UI reads that segment.
 * (If you later move to app/[locale]/..., you can set this dynamically.)
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
