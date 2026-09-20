import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileCta } from "@/components/layout/mobile-cta";
import { PwaRegister } from "@/components/layout/pwa-register";
import { siteConfig } from "@/data/demo";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: { default: "Lion Fitness | La fuerza de la manada", template: "%s | Lion Fitness" },
  description: siteConfig.description,
  applicationName: "Lion Fitness",
  keywords: ["gimnasio en Wilde", "gimnasio en Sarandí", "gimnasio en Lanús", "Lion Fitness Box", "equipamiento de gimnasio"],
  openGraph: { title: "Lion Fitness — La fuerza de la manada", description: siteConfig.description, type: "website", locale: "es_AR", images: [{ url: "/images/instagram/gym-wilde.jpg", width: 360, height: 640, alt: "Lion Fitness, sede Wilde" }] },
  twitter: { card: "summary_large_image", title: "Lion Fitness", description: siteConfig.description, images: ["/images/instagram/gym-wilde.jpg"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0B0C0E", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationLd = { "@context": "https://schema.org", "@type": "SportsActivityLocation", name: siteConfig.name, slogan: siteConfig.tagline, telephone: siteConfig.phoneDisplay, url: siteConfig.baseUrl };
  return (
    <html lang="es" className={`${inter.variable} ${anton.variable}`}>
      <body>
        <a href="#contenido" className="fixed left-3 top-3 z-[100] -translate-y-20 bg-lion px-4 py-3 font-bold text-ink focus:translate-y-0">Saltar al contenido</a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <MobileCta />
        <PwaRegister />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
