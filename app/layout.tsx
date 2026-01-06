import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import LightRays from '@/components/LightRays';

const schibsted_Grotesk = Schibsted_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const martian_Mono = Martian_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Event",
  description: "The hub for every hub event you must not miss!!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${schibsted_Grotesk.variable} ${martian_Mono.variable} min-h-screen antialiased`}
      >
        <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
          <LightRays
            raysColor="#5dfeca"
            raysSpeed={0.5}
            lightSpread={0.9}
            rayLength={1.4}
            followMouse={true}
            mouseInfluence={0.02}
            noiseAmount={0.0}
            distortion={0.01}
            className="custom-rays"
          />
        </div>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
