import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] bg-[#FAF8F4] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="font-cormorant italic text-[120px] leading-none" style={{ background: "linear-gradient(135deg, #003926 30%, #B8935A 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          404
        </p>
        <h1 className="font-cormorant text-[32px] text-[#1A1918] mt-4 mb-3">
          Page Not Found
        </h1>
        <p className="font-dm text-[14px] text-[#9C9690] mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Our curated collections await your discovery.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-dm text-[12px] tracking-[0.15em] uppercase text-white"
            style={{ background: "linear-gradient(135deg, #0B3D2E, #003926)" }}>
            Return Home
          </Link>
          <Link href="/collections/dsigner"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-dm text-[12px] tracking-[0.15em] uppercase text-[#003926] border border-[#003926]/30 hover:bg-[#003926]/5 transition-colors">
            Browse Collections
          </Link>
        </div>
      </div>
    </main>
  );
}
