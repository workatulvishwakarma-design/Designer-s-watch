import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import CartDrawer from "@/components/ui/CartDrawer";
import { PublicShell } from "@/components/PublicShell";
import { prisma } from "@/lib/db";
import { Toaster } from "sonner";
import CookieConsent from "@/components/ui/CookieConsent";
import CelebrationPopup from "@/components/ui/CelebrationPopup";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  let settings: any = null;
  try {
    settings = await prisma.storeSettings.findUnique({
      where: { id: "singleton" }
    }).catch(() => null);
  } catch {
    settings = null;
  }

    return {
        title: settings?.defaultSeoTitle || "Designer World | Four Generations of Horological Expertise",
        description: settings?.defaultSeoDescription || "A four-generation integrated watch enterprise offering OEM manufacturing and premium D2C timepieces.",
        openGraph: {
            title: settings?.defaultSeoTitle || "Designer World | Horological Excellence",
            description: settings?.defaultSeoDescription || "Premier watch manufacturing and retail legacy.",
            type: "website",
            locale: "en_IN",
            siteName: "Designer World",
        },
        twitter: {
            card: "summary_large_image",
            title: settings?.defaultSeoTitle || "Designer World",
            description: settings?.defaultSeoDescription || "Four Generations of Watchmaking.",
        },
        robots: "index, follow",
    }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings: any = null;
  try {
    settings = await prisma.storeSettings.findUnique({
      where: { id: "singleton" }
    }).catch(() => null);
  } catch {
    settings = null;
  }

  const showAnnouncement = !!(settings?.announcementActive && settings.announcementText);

  return (
    <html lang="en" className={`${montserrat.variable} font-sans`}>
       <body suppressHydrationWarning className="antialiased bg-background text-primaryText overflow-x-hidden">
          <PublicShell
            customCursor={<CustomCursor />}
            announcement={showAnnouncement ? <AnnouncementBar text={settings!.announcementText!} /> : null}
            header={<Header hasAnnouncement={showAnnouncement} />}
            cartDrawer={<CartDrawer />}
            footer={<Footer />}
          >
            <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-[#FAF8F4]"><Loader2 className="w-8 h-8 text-[#003926] animate-spin" /></div>}>
              {children}
            </Suspense>
          </PublicShell>
          <Toaster richColors position="top-center" />
          <CookieConsent />
          <CelebrationPopup />
      </body>
    </html>
  );
}
