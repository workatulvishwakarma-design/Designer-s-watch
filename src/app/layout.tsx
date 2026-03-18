import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScrolling from "@/components/SmoothScrolling";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import CartDrawer from "@/components/ui/CartDrawer";
import { prisma } from "@/lib/db";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.storeSettings.findUnique({
    where: { id: "singleton" }
  }).catch(() => null);

  return {
    title: settings?.defaultSeoTitle || "Designer World | Four Generations of Horological Expertise",
    description: settings?.defaultSeoDescription || "A four-generation integrated watch enterprise offering OEM manufacturing and premium D2C timepieces.",
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await prisma.storeSettings.findUnique({
    where: { id: "singleton" }
  }).catch(() => null);

  const showAnnouncement = !!(settings?.announcementActive && settings.announcementText);

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
       <body suppressHydrationWarning className="antialiased bg-background text-primaryText overflow-x-hidden">
          <CustomCursor />
          {showAnnouncement && (
            <AnnouncementBar text={settings!.announcementText!} />
          )}
          <Header hasAnnouncement={showAnnouncement} />
          <CartDrawer />
          <SmoothScrolling>
            {children}
          </SmoothScrolling>
          <Footer />
      </body>
    </html>
  );
}
