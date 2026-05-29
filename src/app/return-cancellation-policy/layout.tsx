import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Cancellation Policy | Designer World",
  description: "Understand the terms governing our 7-day luxury return, refund, and cancellation policies.",
};

export default function ReturnCancellationPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
