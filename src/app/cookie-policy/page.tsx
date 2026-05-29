"use client";

import LegalPageShell, { type LegalSection } from "@/components/ui/LegalPageShell";

const SECTIONS: LegalSection[] = [
  {
    id: "understanding",
    title: "Understanding Cookies",
    iconType: "cookie",
    content: (
      <>
        <p>
          At <strong>Designer World</strong>, we believe in providing a seamless and personalized digital showroom experience. To do this, our platform utilizes cookies, tracking beacons, and local storage technologies when you navigate our site or purchase our timepieces.
        </p>
        <p>
          Cookies are small text files stored on your computer or mobile device by your web browser. They act as a memory bank, enabling the site to remember your actions, preferences, cart selections, and device parameters over a period of time.
        </p>
      </>
    ),
  },
  {
    id: "why-use",
    title: "Why We Use Cookies",
    iconType: "helpCircle",
    content: (
      <>
        <p>
          Cookies serve several crucial roles that enhance our luxury boutique platform:
        </p>
        <ul>
          <li><strong>Essential Performance:</strong> Keeping your selected watches in your cart as you navigate across different collection pages, maintaining security settings, and processing secure payments.</li>
          <li><strong>Preference Memory:</strong> Remembering your chosen brand filter (e.g. D'Signer vs Escort), dial size preferences, currency choices, and region settings.</li>
          <li><strong>Analytics & Improvement:</strong> Compiling aggregated anonymous data about page views, load times, and error rates to refine platform speed and styling layout.</li>
          <li><strong>Marketing & Curation:</strong> Serving premium, relevant suggestions for collections (e.g., Grandeur, Bolt, Serene) tailored to your horological interest.</li>
        </ul>
      </>
    ),
  },
  {
    id: "categories",
    title: "Cookie Classifications",
    iconType: "layers",
    content: (
      <>
        <p>
          We group our cookies into three functional blocks:
        </p>
        <ol>
          <li><strong>Essential / Strictly Necessary Cookies:</strong> These are mandatory for the core operation of our platform. They handle basic actions like secure login, cart caching, and payment processing. Deactivating these via browser settings will cause severe layout and checkout errors.</li>
          <li><strong>Functional & Preference Cookies:</strong> These enable enhanced usability, such as remembering your custom cursor preferences, filters, or showing custom greeting messages.</li>
          <li><strong>Performance & Analytics Cookies:</strong> These help us understand client interactions. We use secure analytics tools to observe paths, helping us optimize visual layouts and product load speeds.</li>
        </ol>
      </>
    ),
  },
  {
    id: "managing",
    title: "Managing Preferences",
    iconType: "settings",
    content: (
      <>
        <p>
          You have complete control over how cookies interact with your device:
        </p>
        <ul>
          <li><strong>Platform Controls:</strong> You can manage cookie consents at any time using the global Cookie Consent Banner at the bottom of our site. You may opt to accept all cookies or restrict us strictly to essential ones.</li>
          <li><strong>Browser Controls:</strong> Most modern browsers (Chrome, Safari, Firefox, Edge) allow you to block, delete, or review cookies within their settings/privacy panel.</li>
        </ul>
        <p>
          *Please note: restricting functional or preference cookies will degrade visual micro-animations, premium fonts, and cart persistence across sessions.
        </p>
      </>
    ),
  },
  {
    id: "updates",
    title: "Updates to Cookie Guidelines",
    iconType: "refreshCw",
    content: (
      <>
        <p>
          We may update this policy occasionally to adapt to tech or legal standards. Changes will be documented immediately via the &quot;Last updated&quot; tag at the top. For any questions regarding our cookie practices, please contact <strong>privacy@designerworld.in</strong>.
        </p>
      </>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPageShell
      title="Cookie Policy"
      subtitle="Transparency and Personalization of Your Digital Journey"
      iconType="cookie"
      lastUpdated="May 27, 2026"
      sections={SECTIONS}
    />
  );
}
