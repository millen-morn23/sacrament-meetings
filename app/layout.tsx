import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavLinks from "../components/NavLinks";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "Sacrament Meeting Planner",
    template: "%s | Sacrament Meeting Planner",
  },
  description:
    "Plan and review sacrament meeting programs for the Nairobi Ward.",
  openGraph: {
    title: "Sacrament Meeting Planner",
    description:
      "Plan and review sacrament meeting programs for the Nairobi Ward.",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Sacrament Meeting Planner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sacrament Meeting Planner",
    description:
      "Plan and review sacrament meeting programs for the Nairobi Ward.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} min-h-screen bg-slate-100 text-slate-900 antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />

          <div className="border-b bg-white">
            <div className="mx-auto max-w-6xl px-6 py-3">
              <NavLinks />
            </div>
          </div>

          <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}