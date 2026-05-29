import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Designer World",
  description: "Read the official terms, rules, and conditions governing the purchase of luxury watches from Designer World.",
};

export default function TermsAndConditionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
