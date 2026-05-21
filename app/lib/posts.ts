export interface Post {
  slug: string;
  title: string;
  metaDescription: string;
  date: string;
  readingTime: string;
  category: "legal" | "banking" | "hiring" | "energy" | "strategy";
  excerpt: string;
  content: string; // HTML string
}

export const posts: Post[] = [
  {
    slug: "how-to-set-up-a-company-in-argentina",
    title: "How to Set Up a Company in Argentina as a Foreign Investor (2026 Guide)",
    metaDescription: "Step-by-step guide to incorporating in Argentina as a foreign company. SRL vs SA, IGJ registration, CUIT, timelines, and real costs in 2026.",
    date: "2026-05-21",
    readingTime: "8 min read",
    category: "legal",
    excerpt: "Operating in Argentina starts with one question: what legal structure do you need, and how long will it take? Here's the honest answer for 2026.",
    content: `
<p>Argentina is attracting serious foreign capital in 2026 — energy, tech nearshoring, and regional expansion are all driving demand. But setting up a legal entity here is not like incorporating in Delaware. It requires coordination across notaries, the IGJ (Argentina's company registry), AFIP (the tax authority), and local banks — each on its own timeline.</p>

<p>This guide covers what foreign investors actually need to know before they start the process.</p>

<h2>SRL vs SA: Which Structure for Foreign Companies?</h2>

<p>Most foreign operators entering Argentina choose one of two structures:</p>

<ul>
  <li><strong>SRL (Sociedad de Responsabilidad Limitada)</strong> — the Argentine equivalent of an LLC. Simpler governance, fewer formalities, and faster to incorporate. Ideal for operating subsidiaries, nearshoring teams, and service entities. Maximum 50 shareholders.</li>
  <li><strong>SA (Sociedad Anónima)</strong> — closer to a corporation. Required if you plan to issue shares publicly, have more than 50 investors, or are in regulated sectors like financial services. More paperwork upfront, but more flexibility at scale.</li>
</ul>

<p><strong>For most foreign tech and service companies entering Argentina:</strong> an SRL is the right call. It incorporates faster (30–45 days vs 45–60 for an SA), costs less to set up and maintain, and handles all standard operating needs.</p>

<p><strong>For energy projects (Vaca Muerta, lithium, renewables):</strong> an SA is often required by concession agreements or joint-venture structures. Consult your legal team early.</p>

<h2>Step-by-Step: How Incorporation Actually Works</h2>

<h3>1. Appoint a local representative</h3>
<p>At least one director must have an Argentine DNI (national ID) or be a legal resident. Foreign companies typically appoint a local proxy director — a common, legal practice — while maintaining control through the shareholder structure.</p>

<h3>2. Draft and notarize the statutes</h3>
<p>The founding statutes define the company's purpose, governance, and capital structure. They must be drafted in Spanish, reviewed by an Argentine lawyer, and certified by a public notary (<em>escribano</em>). This step typically takes 5–10 business days and costs between USD 800 and USD 1,500 in legal and notary fees.</p>

<h3>3. IGJ registration</h3>
<p>The Inspección General de Justicia (IGJ) is Buenos Aires province's company registry. Filing with the IGJ takes 15–30 business days, depending on workload and whether your statutes require corrections. There is also a national IGJ for companies operating across provinces.</p>

<h3>4. Obtain your CUIT</h3>
<p>Once registered with the IGJ, you apply for a CUIT (Código Único de Identificación Tributaria) from AFIP. This is Argentina's tax ID — you cannot open a bank account, issue invoices, or hire employees without it. Processing time: 5–10 business days.</p>

<h3>5. Open a bank account</h3>
<p>The hardest step. Argentine banks are conservative with new foreign-owned entities. You'll need the full incorporation documentation, CUIT, proof of registered address, and in most cases, a personal relationship with a bank officer. Plan for 15–30 additional business days. See our guide on <a href="/blog/how-to-open-a-bank-account-in-argentina-foreign-company">opening a bank account in Argentina as a foreign company</a>.</p>

<h2>Realistic Timeline</h2>

<table>
  <thead><tr><th>Step</th><th>Duration</th></tr></thead>
  <tbody>
    <tr><td>Statutes drafted and notarized</td><td>5–10 business days</td></tr>
    <tr><td>IGJ registration</td><td>15–30 business days</td></tr>
    <tr><td>CUIT from AFIP</td><td>5–10 business days</td></tr>
    <tr><td>Bank account opening</td><td>15–30 business days</td></tr>
    <tr><td><strong>Total (typical)</strong></td><td><strong>40–60 business days</strong></td></tr>
  </tbody>
</table>

<p>This assumes no corrections are requested by the IGJ and your bank relationship is already in place. With a strong local partner coordinating all steps simultaneously, 35–45 calendar days is achievable.</p>

<h2>Common Mistakes Foreign Companies Make</h2>

<ul>
  <li><strong>Underestimating the banking timeline.</strong> Companies often incorporate in 30 days and then spend 60 days waiting on banking. Start the bank relationship as early as legally possible.</li>
  <li><strong>Wrong corporate purpose.</strong> The IGJ scrutinizes the stated purpose of the entity. If it's too broad or too narrow, you'll receive corrections that add weeks. Have a local lawyer draft it with the final operation in mind.</li>
  <li><strong>Ignoring beneficial ownership filings.</strong> Argentina requires disclosure of the ultimate beneficial owner (UBO) to both the IGJ and AFIP. Failure to file correctly can block your CUIT issuance.</li>
  <li><strong>Using a single vendor.</strong> Most Argentine law firms handle incorporation but not banking or accounting setup. You end up managing three vendors at once. A coordinated approach (one project lead) saves 2–4 weeks.</li>
</ul>

<h2>Real Costs in 2026</h2>

<table>
  <thead><tr><th>Item</th><th>Cost (USD, approx.)</th></tr></thead>
  <tbody>
    <tr><td>Legal fees (statutes, IGJ filing)</td><td>1,500 – 3,000</td></tr>
    <tr><td>Notary fees</td><td>300 – 700</td></tr>
    <tr><td>IGJ registration fee</td><td>150 – 400</td></tr>
    <tr><td>Accounting setup (first 3 months)</td><td>600 – 1,200</td></tr>
    <tr><td>Bank account opening (fees vary by bank)</td><td>0 – 500</td></tr>
    <tr><td><strong>Total setup cost</strong></td><td><strong>USD 2,500 – 5,800</strong></td></tr>
  </tbody>
</table>

<p>These are direct out-of-pocket costs. The real cost of a slow incorporation is opportunity cost: every week without a CUIT is a week you can't invoice, hire, or receive funds locally.</p>

<h2>Frequently Asked Questions</h2>

<div class="faq-item">
  <h3>Can a foreign company be the sole shareholder of an Argentine SRL?</h3>
  <p>Yes. A foreign legal entity can hold 100% of an Argentine SRL. The entity must be duly registered in its home country and provide apostilled documentation. However, at least one director must be locally present.</p>
</div>

<div class="faq-item">
  <h3>Do I need a physical office address in Argentina?</h3>
  <p>Yes. The IGJ requires a registered address in Argentina. This can be a virtual office address — a common and accepted practice for initial incorporation.</p>
</div>

<div class="faq-item">
  <h3>Can I operate before the bank account is open?</h3>
  <p>Partially. You can invoice and conduct some operations with the CUIT alone. But receiving payments locally and paying Argentine employees requires a local bank account. Many companies use an EOR (Employer of Record) arrangement for early hires while the entity is being set up.</p>
</div>

<div class="faq-item">
  <h3>Is Argentina politically stable enough for long-term investment?</h3>
  <p>The honest answer: Argentina has structural economic volatility that is well-documented. Foreign investors who succeed here treat it as an operational risk to be managed — through entity structure, FX planning, and local partners — not ignored. The upside (talent cost, resource access, market position) is real. So is the complexity.</p>
</div>
    `,
  },

  {
    slug: "employer-of-record-argentina",
    title: "Employer of Record in Argentina: When It Makes Sense (And When It Doesn't)",
    metaDescription: "EOR vs own entity in Argentina. Real costs, legal risks, and when to switch. A practical guide for foreign companies hiring in Argentina in 2026.",
    date: "2026-05-22",
    readingTime: "6 min read",
    category: "hiring",
    excerpt: "An EOR lets you hire in Argentina in days instead of months. But it's not the right answer forever. Here's how to think about the decision.",
    content: `
<p>The fastest way to hire your first employee in Argentina as a foreign company is through an Employer of Record (EOR). The slowest way is to wait until your local entity is fully operational. Understanding when to use each — and when to switch — is one of the most practical decisions you'll make when entering the Argentine market.</p>

<h2>What Is an EOR in the Argentine Context?</h2>

<p>An EOR is a local entity that employs workers on your behalf. The worker works for you in practice — they follow your direction, use your tools, deliver your projects — but legally they are employed by the EOR. The EOR handles:</p>
<ul>
  <li>Employment contracts (compliant with Ley de Contrato de Trabajo)</li>
  <li>Monthly payroll and social security contributions (cargas sociales)</li>
  <li>Obra social (health insurance) registration</li>
  <li>Aguinaldo (mandatory 13th-month bonus) and vacation accrual</li>
  <li>Payslips and AFIP filings</li>
</ul>

<p>You pay the EOR a monthly fee per employee — typically USD 200–500 per person on top of the gross salary cost.</p>

<h2>When EOR Makes Sense</h2>

<p><strong>You need to hire fast, before your entity is ready.</strong> Argentine entity setup takes 40–60 business days minimum. If you have a key hire waiting, EOR lets you onboard them in 5–10 business days.</p>

<p><strong>You're running a pilot.</strong> Testing the Argentine market with 1–3 people before committing to a full entity setup is a legitimate strategy. EOR limits your fixed cost exposure.</p>

<p><strong>Your headcount is small and likely to stay that way.</strong> For 1–2 permanent remote employees, the overhead of maintaining a full Argentine entity (monthly accounting, annual filings, bank account management) may not be worth it.</p>

<h2>When EOR Doesn't Make Sense</h2>

<p><strong>You're scaling past 4–5 people.</strong> At that point, the EOR monthly fee per head starts to exceed the cost of running your own entity. Run the math: USD 400/employee/month × 5 employees = USD 2,000/month in EOR overhead. A local accounting firm costs USD 600–1,200/month for the same payroll complexity.</p>

<p><strong>You need to invoice locally.</strong> An EOR employs your people — it doesn't give you the ability to issue Argentine invoices, sign local contracts in your company name, or receive Argentine peso payments. For any of that, you need your own entity.</p>

<p><strong>Your sector requires it.</strong> Energy concessions, financial services, and some government contracts require the foreign company to have a registered Argentine entity. EOR doesn't satisfy that requirement.</p>

<h2>EOR vs Entity: Cost Comparison</h2>

<table>
  <thead><tr><th></th><th>EOR (3 employees)</th><th>Own Entity (3 employees)</th></tr></thead>
  <tbody>
    <tr><td>Setup cost</td><td>USD 0–500</td><td>USD 2,500–5,800</td></tr>
    <tr><td>Setup time</td><td>5–10 business days</td><td>40–60 business days</td></tr>
    <tr><td>Monthly overhead</td><td>USD 600–1,500 (EOR fees)</td><td>USD 600–1,200 (accounting)</td></tr>
    <tr><td>Can issue local invoices</td><td>No</td><td>Yes</td></tr>
    <tr><td>Break-even headcount</td><td colspan="2">~4–5 employees</td></tr>
  </tbody>
</table>

<h2>The Transition: EOR to Own Entity</h2>

<p>The cleanest path for most companies entering Argentina:</p>
<ol>
  <li>Start with EOR for initial hires while the entity is being incorporated</li>
  <li>Run entity setup in parallel (40–60 days)</li>
  <li>Transfer employees to the new entity once it's operational</li>
</ol>

<p>The transfer process requires new employment contracts under the new entity, but it does not legally constitute a termination — employee seniority and benefits carry over. A local HR consultant or labor lawyer should handle the paperwork.</p>

<h2>Frequently Asked Questions</h2>

<div class="faq-item">
  <h3>Is EOR legal in Argentina?</h3>
  <p>Yes, when structured correctly. The risk is "dependent contractor" misclassification — if the arrangement looks like disguised employment without proper EOR structure, AFIP and the labor courts may reclassify it. Use a proper EOR with compliant employment contracts, not a freelancer arrangement.</p>
</div>

<div class="faq-item">
  <h3>Can I use international payroll platforms (Deel, Remote, Rippling) in Argentina?</h3>
  <p>Yes. Several international EOR platforms operate in Argentina through local entities. Compare their local compliance track record, not just their global brand. Argentina's labor law is detailed and enforcement is real.</p>
</div>

<div class="faq-item">
  <h3>What happens if I need to let someone go while on EOR?</h3>
  <p>Termination costs in Argentina are significant regardless of whether the employee is on EOR or your own entity. Argentine labor law requires severance of one month's salary per year of service, plus 30 days' notice (or payment in lieu). Budget for this from day one.</p>
</div>
    `,
  },

  {
    slug: "how-to-open-a-bank-account-in-argentina-foreign-company",
    title: "How to Open a Bank Account in Argentina as a Foreign Company",
    metaDescription: "The real process for opening a corporate bank account in Argentina as a foreign entity. Which banks work, what documents you need, and how to navigate FX regulations in 2026.",
    date: "2026-05-23",
    readingTime: "7 min read",
    category: "banking",
    excerpt: "Banking is the most common bottleneck for foreign companies entering Argentina. Here's what actually works in 2026.",
    content: `
<p>Ask any foreign company that has set up operations in Argentina what surprised them most, and the answer is almost always the same: banking. The Argentine financial system is functional and sophisticated — but it is also heavily regulated, relationship-driven, and not designed to welcome new foreign entities quickly.</p>

<p>This guide covers what you actually need to know to open a corporate bank account in Argentina as a foreign company in 2026.</p>

<h2>Why Banking in Argentina Is Hard</h2>

<p>Three structural factors make this harder than most markets:</p>

<ul>
  <li><strong>KYC requirements are extensive.</strong> Argentine banks apply strict Know Your Customer procedures to corporate accounts, especially for foreign-owned entities. Expect to provide apostilled documents from your home country, UBO declarations, and proof of economic activity.</li>
  <li><strong>Relationships matter.</strong> Most Argentine banks prefer to open accounts for companies with existing connections — a referral from another client, a legal firm they know, or an accounting firm they've worked with. Cold applications fail more often than not.</li>
  <li><strong>FX regulations add complexity.</strong> Argentina's foreign exchange controls (the "cepo") mean that managing dollars and pesos in Argentina requires understanding two parallel systems. This shapes which banks are most useful depending on your operation.</li>
</ul>

<h2>Which Banks Work for Foreign Companies</h2>

<p>Not all Argentine banks are equally accessible to new foreign entities. The most pragmatic options in 2026:</p>

<ul>
  <li><strong>Banco Galicia</strong> — one of the most foreign-company-friendly private banks. Strong corporate banking team, reasonable KYC process if you come with proper documentation.</li>
  <li><strong>HSBC Argentina</strong> — familiar with international structures, useful if your HQ already banks with HSBC globally.</li>
  <li><strong>Banco Santander Argentina</strong> — good for companies with existing Santander relationships in Spain, Mexico, or Brazil.</li>
  <li><strong>ICBC Argentina</strong> — particularly useful for Chinese-invested operations given the relationship with Industrial and Commercial Bank of China.</li>
  <li><strong>Banco Macro</strong> — strong regional presence in Neuquén and Mendoza, useful for energy sector operations.</li>
</ul>

<p><strong>Avoid leading with Banco Nación or Banco Provincia</strong> as a foreign company. State banks are slower and more bureaucratic for new corporate accounts.</p>

<h2>ARS vs USD Accounts: What You Actually Need</h2>

<p>You will need both:</p>

<ul>
  <li><strong>ARS (peso) account:</strong> Required for payroll, local supplier payments, and receiving Argentine peso revenue. Pesos depreciate — keep your operating float here, not reserves.</li>
  <li><strong>USD account:</strong> Argentine banks offer USD accounts under two types: <em>cuenta corriente en dólares</em> (operational) and <em>caja de ahorro en dólares</em> (savings). These hold physical dollars within the Argentine banking system. Useful for receiving export payments and holding dollar reserves locally.</li>
</ul>

<h2>FX Regulations in 2026: The Basics</h2>

<p>Argentina's foreign exchange market has multiple layers. For a foreign operating company, the key concepts:</p>

<ul>
  <li><strong>Tipo de cambio oficial:</strong> The Central Bank's reference rate. Used for most formal commercial transactions and required for importing goods and services above certain thresholds.</li>
  <li><strong>MEP / CCL (dólar financiero):</strong> Legal FX operations using Argentine securities to convert pesos to dollars. Used by companies and individuals to access a market rate close to the informal rate, legally.</li>
  <li><strong>Dólar blue:</strong> The informal cash market. Do not use it for corporate transactions — it's illegal for entities and creates audit risk.</li>
</ul>

<p>For most foreign companies: your treasury strategy should be structured with a local accountant and lawyer from day one. The rules change frequently; what was optimal in 2024 may not be optimal in 2026.</p>

<h2>What Documents You Need</h2>

<ul>
  <li>Apostilled company registration documents from your home country</li>
  <li>Argentine company registration (IGJ) certificate</li>
  <li>CUIT from AFIP</li>
  <li>Statutes (<em>estatuto social</em>) in Spanish</li>
  <li>UBO declaration (beneficiario final)</li>
  <li>DNI or passport of all directors and authorized signatories</li>
  <li>Proof of registered address in Argentina</li>
  <li>Description of the company's economic activity and expected transaction volume</li>
</ul>

<h2>Realistic Timeline</h2>

<p>With all documents ready and a warm bank introduction: <strong>15–25 business days</strong>.<br/>
Without a prior relationship or with documentation gaps: <strong>30–60 business days or more</strong>.</p>

<p>The most common delay: missing or incorrectly apostilled home-country documents. Get these right before you start the bank process.</p>

<h2>Frequently Asked Questions</h2>

<div class="faq-item">
  <h3>Can I receive USD wire transfers from abroad into my Argentine company account?</h3>
  <p>Yes. Argentine companies can receive foreign currency transfers. The funds must be declared to AFIP and, depending on the nature of the payment, may be subject to mandatory conversion to pesos through the official FX market (within 5 business days for most export proceeds). Structure this correctly from the start.</p>
</div>

<div class="faq-item">
  <h3>Can I use fintech accounts (Mercado Pago, Naranja X) for my company?</h3>
  <p>For small-volume Argentine peso operations, yes. But fintech accounts are not equivalent to bank accounts for formal operations, international transfers, or large transaction volumes. Use them as supplementary, not primary.</p>
</div>

<div class="faq-item">
  <h3>What if the bank rejects my application?</h3>
  <p>It happens. Common reasons: incomplete documentation, insufficient economic justification of the operation, or no prior relationship. The solution is usually a referral from a local firm the bank trusts — not a better application.</p>
</div>
    `,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}
