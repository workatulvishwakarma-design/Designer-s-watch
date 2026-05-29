"use client";

import LegalPageShell, { type LegalSection } from "@/components/ui/LegalPageShell";

const SECTIONS: LegalSection[] = [
  {
    id: "secure-shipping",
    title: "Premium Secure Transit",
    iconType: "shieldCheck",
    content: (
      <>
        <p>
          At <strong>Designer World</strong>, we recognize that a timepiece is not merely a purchase—it is an investment. Hence, we treat the shipping process with maximum vigilance. Every single watch leaves our headquarters in premium secure packaging, fully insured, and handled exclusively by elite logistics networks.
        </p>
      </>
    ),
  },
  {
    id: "timelines",
    title: "Delivery Timelines",
    iconType: "clock",
    content: (
      <>
        <p>
          We dispatch all orders within 24 to 48 business hours of order validation.
        </p>
        <ul>
          <li><strong>Metropolitan Regions (Delhi NCR, Mumbai, Bengaluru, etc.):</strong> Delivery takes 3 to 5 business days from dispatch.</li>
          <li><strong>Tier-2 & Tier-3 Cities:</strong> Delivery takes 5 to 7 business days from dispatch.</li>
          <li><strong>Remote Regions:</strong> Delivery may take up to 8-10 business days depending on logistics access.</li>
        </ul>
        <p>
          *Please note: dispatches are suspended on Sundays and national public holidays.
        </p>
      </>
    ),
  },
  {
    id: "rates",
    title: "Shipping Rates & COD",
    iconType: "creditCard",
    content: (
      <>
        <p>
          Our shipping rate structure is simple and transparent:
        </p>
        <ul>
          <li><strong>Free Shipping:</strong> All prepaid orders above **₹5,000** are eligible for free secure delivery across India.</li>
          <li><strong>Standard Shipping Fee:</strong> Orders below ₹5,000 will have a nominal secure shipping fee of **₹150** applied at checkout.</li>
          <li><strong>Cash on Delivery (COD):</strong> COD is available for orders up to **₹25,000**. For security reasons, COD orders will undergo phone/SMS validation prior to package dispatch.</li>
        </ul>
      </>
    ),
  },
  {
    id: "packaging",
    title: "Packaging & Insurance",
    iconType: "package",
    content: (
      <>
        <p>
          Each timepiece is securely mounted inside its official luxury presentation box, wrapped in defensive padding, and sealed in an **opaque, tamper-proof courier bag** showing no branding or price details. This reduces package profiling during transit.
        </p>
        <p>
          Additionally, **all shipments are 100% insured** against loss, theft, or damage during transit. In the highly unlikely event that a package is lost or arrives compromised, we will dispatch a replacement immediately or process a full priority refund.
        </p>
      </>
    ),
  },
  {
    id: "tracking",
    title: "Tracking & Alerts",
    iconType: "mapPin",
    content: (
      <>
        <p>
          Upon package dispatch, you will receive an automated email and SMS notification containing a direct link and a tracking number from our logistics partners (e.g. Blue Dart, Delhivery, or DHL). You will be able to monitor the real-time location of your watch in transit.
        </p>
      </>
    ),
  },
  {
    id: "protocols",
    title: "Delivery Protocols",
    iconType: "userCheck",
    content: (
      <>
        <p>
          To ensure secure hand-off of valuable horological assets:
        </p>
        <ul>
          <li>A signature and identity verification (OTP) may be required from the recipient upon delivery.</li>
          <li>Courier partners will make a maximum of **three delivery attempts** before returning the package to our New Delhi center.</li>
          <li>If a package is returned to us due to non-availability or wrong delivery details, a reshipping fee of ₹250 will be charged to schedule a subsequent delivery.</li>
        </ul>
      </>
    ),
  },
];

export default function ShippingPolicyPage() {
  return (
    <LegalPageShell
      title="Shipping Policy"
      subtitle="Secure, Tracked Transit of Luxury Horology"
      iconType="shipping"
      lastUpdated="May 27, 2026"
      sections={SECTIONS}
    />
  );
}
