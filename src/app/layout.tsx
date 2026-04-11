import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import CartDrawer from "@/components/ui/CartDrawer";
import { PublicShell } from "@/components/PublicShell";
import { prisma } from "@/lib/db";
import { Toaster } from "sonner";

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
          <PublicShell
            customCursor={<CustomCursor />}
            announcement={showAnnouncement ? <AnnouncementBar text={settings!.announcementText!} /> : null}
            header={<Header hasAnnouncement={showAnnouncement} />}
            cartDrawer={<CartDrawer />}
            footer={<Footer />}
          >
            {children}
          </PublicShell>
          <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
