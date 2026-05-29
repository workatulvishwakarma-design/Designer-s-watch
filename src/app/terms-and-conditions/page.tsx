"use client";

import LegalPageShell, { type LegalSection } from "@/components/ui/LegalPageShell";

const SECTIONS: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction & Acceptance",
    iconType: "fileText",
    content: (
      <>
        <p>
          Welcome to the e-commerce showroom of <strong>Designer World</strong>. This platform is owned and operated by the <strong>Nagpal Group</strong>. Throughout the site, the terms &quot;we&quot;, &quot;us&quot; and &quot;our&quot; refer to Designer World.
        </p>
        <p>
          By visiting our site or purchasing timepieces from us, you engage in our &quot;Service&quot; and agree to be bound by the following terms and conditions (&quot;Terms of Service&quot;, &quot;Terms&quot;), including those additional terms and policies referenced herein and/or available by hyperlink. These Terms apply to all users of the site, including without limitation browser users, vendors, clients, and merchants.
        </p>
      </>
    ),
  },
  {
    id: "store-terms",
    title: "Online Store Terms",
    iconType: "shoppingBag",
    content: (
      <>
        <p>
          By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you have given us your consent to allow any of your minor dependents to use this site.
        </p>
        <p>
          You may not use our luxury watches or services for any illegal or unauthorized purpose, nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright or trademark laws).
        </p>
      </>
    ),
  },
  {
    id: "display-integrity",
    title: "Products & Display Integrity",
    iconType: "sparkles",
    content: (
      <>
        <p>
          We make every possible effort to display as accurately as possible the colors, casing details, and dial textures of our watches that appear at the store. We cannot guarantee that your computer monitor's display of any color will be completely accurate.
        </p>
        <p>
          We reserve the right to limit the sales of our watches or Services to any person, geographic region, or jurisdiction. We may exercise this right on a case-by-case basis. All descriptions of products or product pricing are subject to change at any time without notice, at our sole discretion. We reserve the right to discontinue any model at any time.
        </p>
      </>
    ),
  },
  {
    id: "billing-accuracy",
    title: "Pricing & Billing Accuracy",
    iconType: "creditCard",
    content: (
      <>
        <p>
          Prices for our watches are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
        </p>
        <p>
          We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we will attempt to notify you by contacting the email and/or billing address/phone number provided at the time the order was made.
        </p>
      </>
    ),
  },
  {
    id: "gateways",
    title: "Payment Terms & Gateways",
    iconType: "shieldCheck",
    content: (
      <>
        <p>
          Acquiring a timepiece from our site requires secure online payment. Transactions are processed via encrypted third-party payment systems (e.g. Cashfree Payments). By confirming a purchase, you authorize our processing partner to charge the specified amount to your selected card, bank account, UPI, or wallet. In case of Cash on Delivery (COD), order verification via phone or SMS is required before shipping.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    iconType: "bookmark",
    content: (
      <>
        <p>
          All content, including watch graphics, brand layouts, logs, copywriting, illustrations, product designs, and 3D modeling assets displayed on this website is the exclusive intellectual property of Designer World / Nagpal Group. Any replication, distribution, or unauthorized use of these assets without written permission from us is strictly prohibited.
        </p>
      </>
    ),
  },
  {
    id: "prohibited-uses",
    title: "Prohibited Uses",
    iconType: "alertTriangle",
    content: (
      <>
        <p>
          In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content:
        </p>
        <ul>
          <li>For any unlawful purpose.</li>
          <li>To solicit others to perform or participate in any unlawful acts.</li>
          <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances.</li>
          <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others.</li>
          <li>To upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service.</li>
        </ul>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    iconType: "activity",
    content: (
      <>
        <p>
          We do not guarantee, represent, or warrant that your use of our service will be uninterrupted, timely, secure, or error-free. We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.
        </p>
        <p>
          In no case shall Designer World, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers, or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law",
    iconType: "globe",
    content: (
      <>
        <p>
          These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of <strong>India</strong>, and any legal filings or disputes shall fall under the exclusive jurisdiction of the courts of <strong>New Delhi, India</strong>.
        </p>
      </>
    ),
  },
  {
    id: "contact-info",
    title: "Contact & Regulatory Info",
    iconType: "mail",
    content: (
      <>
        <p>
          Questions about the Terms of Service should be sent to us at <strong>legal@designerworld.in</strong>.
        </p>
      </>
    ),
  },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalPageShell
      title="Terms & Conditions"
      subtitle="The Legal Framework of Our Horological Maison"
      iconType="terms"
      lastUpdated="May 27, 2026"
      sections={SECTIONS}
    />
  );
}
