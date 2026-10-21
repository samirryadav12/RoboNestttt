import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "RoboNest - Learn Robotics Step by Step | Beginner Friendly",
  description: "Learn robotics step by step. Beginner-friendly robot projects, clear wiring diagrams, easy build instructions, and live help for anyone building their first robot.",
  keywords: ["Robotics", "STEM Education", "Arduino", "Line Follower", "ESP32", "Maker", "DIY Robots", "Beginner Robotics"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#181A1C] antialiased selection:bg-brand-100 selection:text-brand-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
