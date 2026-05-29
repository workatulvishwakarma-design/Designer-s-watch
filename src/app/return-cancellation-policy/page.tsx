"use client";

import LegalPageShell, { type LegalSection } from "@/components/ui/LegalPageShell";

const SECTIONS: LegalSection[] = [
  {
    id: "guarantee",
    title: "Maison Guarantee",
    iconType: "sparkles",
    content: (
      <>
        <p>
          We believe that acquiring a luxury timepiece is a significant decision. To ensure your complete peace of mind, <strong>Designer World</strong> offers a premium <strong>7-day hassle-free return and exchange policy</strong> for all pristine, unworn watches purchased through our digital showroom.
        </p>
        <p>
          If you are not entirely satisfied with your timepiece, or if the case size/dial color does not match your expectations, we will gladly facilitate a return or swap within 7 days from the date of delivery.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility Criteria",
    iconType: "checkSquare",
    content: (
      <>
        <p>
          To preserve the value of our high-end horological collections, returned watches must satisfy the following strict criteria without exception:
        </p>
        <ul>
          <li>The watch must be completely **unworn**, **unaltered**, and **undamaged**.</li>
          <li>All protective plastics, static films, or shrink-wrap layers on the glass, bezel, casing, and strap must be **perfectly intact** and **unremoved**.</li>
          <li>The watch must be returned in its **original luxury presentation gift box**, including the outer protective sleeve.</li>
          <li>All accompanying documentation, including the **stamped warranty card**, **instruction manuals**, and any **tamper-proof security tags** must be present.</li>
          <li>The strap must not show any signs of creasing, buckle indentation, or sizing link removal.</li>
        </ul>
      </>
    ),
  },
  {
    id: "processing",
    title: "Processing & Pickups",
    iconType: "truck",
    content: (
      <>
        <p>
          To initiate a return or exchange, please follow this step-by-step luxury process:
        </p>
        <ol>
          <li>Send an email to <strong>concierge@designerworld.in</strong> with your Order Number and photos of the watch displaying its pristine condition.</li>
          <li>Once approved, our concierge team will schedule a **secure pickup** via our premium courier partners. A courier agent will package the timepiece in a tamper-evident box.</li>
          <li>Upon receipt at our Quality Assurance Lab in New Delhi, our certified watchmakers will audit the timepiece within 48 business hours to verify that it meets the eligibility criteria.</li>
        </ol>
      </>
    ),
  },
  {
    id: "refunds",
    title: "Refund Methods & Timelines",
    iconType: "creditCard",
    content: (
      <>
        <p>
          Once the watch passes our horological audit, your refund will be processed immediately:
        </p>
        <ul>
          <li><strong>Prepaid Orders:</strong> The refund will be credited directly to the original bank account, credit card, or wallet used during purchase within 5-7 business days.</li>
          <li><strong>Cash on Delivery (COD) Orders:</strong> The refund will be settled via a secure Bank Transfer (NEFT/IMPS) to an account matching the purchaser's name. You will be requested to provide bank details securely through our concierge desk. COD refunds are settled within 7-10 business days.</li>
        </ul>
      </>
    ),
  },
  {
    id: "cancellations",
    title: "Cancellation Guidelines",
    iconType: "xCircle",
    content: (
      <>
        <p>
          We strive to ship our timepieces swiftly. You may cancel your order at any time before it leaves our fulfillment facility:
        </p>
        <ul>
          <li>To request a cancellation, please call our support desk immediately or email <strong>concierge@designerworld.in</strong>.</li>
          <li>If the order has already been dispatched from our facility, it cannot be canceled. In this event, you can refuse the shipment upon delivery or accept it and request a standard 7-day return.</li>
          <li>A full refund will be processed for all valid cancellations according to the refund timelines listed above.</li>
        </ul>
      </>
    ),
  },
  {
    id: "damaged",
    title: "Transit Issues & Defects",
    iconType: "alertOctagon",
    content: (
      <>
        <p>
          Every Designer World timepiece undergoes a triple-tier inspection before dispatch. However, if your watch arrives damaged or has a transit defect:
        </p>
        <p>
          Please report the issue within <strong>24 hours</strong> of delivery with photos of the transit box and the timepiece. We will arrange an immediate replacement or process a full priority refund.
        </p>
      </>
    ),
  },
];

export default function ReturnCancellationPolicyPage() {
  return (
    <LegalPageShell
      title="Return & Cancellation"
      subtitle="Our 7-Day Luxury Assurance Guarantee"
      iconType="returns"
      lastUpdated="May 27, 2026"
      sections={SECTIONS}
    />
  );
}
