"use client";

import LegalPageShell, { type LegalSection } from "@/components/ui/LegalPageShell";

const SECTIONS: LegalSection[] = [
  {
    id: "commitment",
    title: "Commitment to Discretion",
    iconType: "shield",
    content: (
      <>
        <p>
          At <strong>Designer World</strong> (a part of the <strong>Nagpal Group</strong>), your privacy is the cornerstone of our service. As a four-generation watchmaking institution, we treat your personal information with the same level of care and precision that goes into our timepieces.
        </p>
        <p>
          This Privacy Policy outlines how we collect, utilize, and protect your personal, transaction, and browsing data when you interact with our boutique platform, our mobile services, or our retail environments.
        </p>
      </>
    ),
  },
  {
    id: "collect",
    title: "Information We Collect",
    iconType: "database",
    content: (
      <>
        <p>
          We collect only the essential information needed to fulfill your horological acquisitions and provide a personalized experience:
        </p>
        <ul>
          <li><strong>Identity & Contact:</strong> Full name, billing and shipping address, email address, and phone number.</li>
          <li><strong>Financial Details:</strong> Payment tokens processed securely by authorized partners (e.g., Cashfree). We <em>never</em> store your raw credit card or bank credentials.</li>
          <li><strong>Transaction History:</strong> Details of the timepieces and services you purchase, order values, and dates.</li>
          <li><strong>Technical & Usage Data:</strong> IP address, device telemetry, browser type, and interaction metrics across our platform.</li>
        </ul>
      </>
    ),
  },
  {
    id: "purpose",
    title: "Purpose of Processing Data",
    iconType: "fileText",
    content: (
      <>
        <p>
          Your data is processed strictly under legal and legitimate grounds for the following purposes:
        </p>
        <ol>
          <li>To process, fulfill, ship, and track your watch orders.</li>
          <li>To manage warranties, repairs, customer care, and after-sales horological maintenance.</li>
          <li>To protect against fraudulent transactions and ensure purchase integrity.</li>
          <li>To communicate essential updates about our services or curated collections (only with your explicit consent).</li>
        </ol>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies & Personalization",
    iconType: "cookie",
    content: (
      <>
        <p>
          We use cookies and similar technologies to enhance platform responsiveness, maintain your luxury cart, and remember display choices. You can control cookie behaviors directly via your browser or customize preferences using our global Cookie Consent Banner. For full details, please refer to our <a href="/cookie-policy">Cookie Policy</a>.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Shared Information & Protection",
    iconType: "lock",
    content: (
      <>
        <p>
          Designer World does <strong>not</strong> sell, rent, or trade your personal data to third parties. We share details solely with essential operational partners:
        </p>
        <ul>
          <li><strong>Delivery Partners:</strong> Premium courier services (e.g., Blue Dart, DHL) to deliver your watches.</li>
          <li><strong>Payment Processors:</strong> Certified, encrypted gateways (e.g., Cashfree Payments) for secure transactions.</li>
          <li><strong>Legal Mandate:</strong> Only if required by governing laws, search warrants, or court summons.</li>
        </ul>
      </>
    ),
  },
  {
    id: "security",
    title: "Security Controls",
    iconType: "key",
    content: (
      <>
        <p>
          We implement rigorous cryptographic protocols (AES-256 encryption, SSL/TLS transport) to safeguard your files and data. Access to client records is strictly restricted to authorized staff requiring information for direct servicing of your orders.
        </p>
      </>
    ),
  },
  {
    id: "rights",
    title: "Your Rights & Sovereignty",
    iconType: "userCheck",
    content: (
      <>
        <p>
          Under applicable data protection frameworks, you hold absolute rights to your personal records:
        </p>
        <ul>
          <li>You may request a copy of all personal information we maintain.</li>
          <li>You may request correction of any inaccurate records.</li>
          <li>You may request complete deletion of your customer profile, subject to statutory tax and auditing mandates.</li>
          <li>You can withdraw consent for brand communications at any moment.</li>
        </ul>
      </>
    ),
  },
  {
    id: "updates",
    title: "Policy Updates & Contact",
    iconType: "mail",
    content: (
      <>
        <p>
          We may update this policy periodically to align with legal or operating shifts. Any updates will be noted via the &quot;Last updated&quot; tag at the top. For all privacy inquiries, please contact our Compliance Desk at <strong>privacy@designerworld.in</strong>.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      subtitle="Discretion, Trust, and Data Sovereignty"
      iconType="shield"
      lastUpdated="May 27, 2026"
      sections={SECTIONS}
    />
  );
}
