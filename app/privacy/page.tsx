import Link from "next/link";
import type { Metadata } from "next";
import { SITE_NAME, SITE_EMAIL } from "../lib/site";

// Política de privacidad — honesta y específica a lo que el sitio realmente
// hace (leads → HubSpot/Formspree, suscripción → Supabase, analytics
// cookieless de Vercel, chat Crisp). Sin boilerplate inflado.

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Inteligenci·AR collects, uses and protects the information you share with us — contact form, radar subscription, analytics and live chat.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="legal wrap">
      <header className="legal-head">
        <Link href="/" className="legal-back">← {SITE_NAME}</Link>
        <h1>Privacy Policy</h1>
        <p className="lede">
          Last updated: June 11, 2026. This page explains what information we
          collect on this site, why, and what we do with it. Short version: we
          only collect what you give us, we use it to respond to you, and we
          don&apos;t sell it.
        </p>
      </header>

      <section>
        <h2>Who we are</h2>
        <p>
          {SITE_NAME} is a Buenos Aires-based service that helps foreign
          companies set up and operate in Argentina. For anything related to
          your data, write to <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
        </p>
      </section>

      <section>
        <h2>What we collect, and why</h2>
        <ul>
          <li>
            <strong>Contact form.</strong> If you complete the contact wizard we
            collect your name, work email, company country, the services you
            are interested in and your timeline. We use it to review your
            situation and reply with a plan. It is stored in HubSpot (our CRM)
            and relayed through Formspree as a backup channel.
          </li>
          <li>
            <strong>Radar subscription.</strong> If you subscribe to the
            regulatory radar we store your email address in our database
            (Supabase) to send you the updates you asked for. Every email we
            send will include a way to unsubscribe.
          </li>
          <li>
            <strong>Analytics.</strong> We use Vercel Analytics and Speed
            Insights, which are cookieless and collect aggregated, anonymized
            usage data (pages visited, performance metrics). We cannot identify
            you from this data.
          </li>
          <li>
            <strong>Live chat.</strong> The chat widget is provided by Crisp
            and loads only after you interact with the page. If you use it,
            Crisp processes the conversation and may set its own cookies. See
            Crisp&apos;s privacy policy for details.
          </li>
        </ul>
      </section>

      <section>
        <h2>What we don&apos;t do</h2>
        <ul>
          <li>We don&apos;t sell or rent your information. Ever.</li>
          <li>We don&apos;t send marketing you didn&apos;t ask for.</li>
          <li>We don&apos;t use advertising trackers or third-party ad cookies.</li>
        </ul>
      </section>

      <section>
        <h2>When we share information</h2>
        <p>
          Our service consists of coordinating vetted providers — lawyers,
          accountants, banks, payroll. We only share the information needed to
          scope or execute your project, with context, and never before
          you&apos;ve engaged with us. Regulated advice is always provided by
          licensed professionals.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          You can ask us at any time to access, correct or delete the personal
          data we hold about you — just email{" "}
          <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a> and we&apos;ll act on
          it within a reasonable time. If you are in the EU/EEA, these rights
          are backed by the GDPR; in Argentina, by Law 25.326 on Personal Data
          Protection.
        </p>
      </section>

      <section>
        <h2>Data retention &amp; security</h2>
        <p>
          We keep lead and subscriber data only while it is useful for the
          purpose you gave it to us. Data lives in the systems named above
          (HubSpot, Formspree, Supabase, Crisp), each with its own security
          practices; this site is served over HTTPS with strict security
          headers.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          If this policy changes, we&apos;ll update this page and the date at the
          top. Questions? <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>.
        </p>
      </section>
    </main>
  );
}
