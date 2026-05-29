import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | Designer World",
  description: "Learn about our shipping rates, delivery timelines, premium secure packaging, and transit insurance policies.",
};

export default function ShippingPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
