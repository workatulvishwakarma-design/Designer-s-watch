import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Designer World",
  description: "Read our Cookie Policy to understand how we use cookies and tracking technologies to personalize your horological journey.",
};

export default function CookiePolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
