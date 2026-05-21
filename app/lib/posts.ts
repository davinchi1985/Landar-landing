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
  {
    slug: "hiring-employees-argentina-foreign-company",
    title: "Hiring Employees in Argentina: A Complete Guide for Foreign Companies (2026)",
    metaDescription: "How to hire employees in Argentina as a foreign company. Labor law basics, contract types, payroll costs, mandatory benefits, and termination rules explained.",
    date: "2026-05-24",
    readingTime: "7 min read",
    category: "hiring",
    excerpt: "Argentine labor law is generous to employees and demanding on employers. Here's what every foreign company needs to understand before making their first hire.",
    content: `
<p>Argentina has one of the most employee-protective labor frameworks in Latin America. For foreign companies entering the market, understanding what you're committing to before you hire your first person is not optional — it's the difference between a predictable cost structure and a surprise that derails your operation.</p>

<h2>The Legal Framework: Ley de Contrato de Trabajo</h2>

<p>Argentine employment is governed primarily by the Ley de Contrato de Trabajo (LCT) — Law 20.744. It establishes minimum rights for all employees in a relationship of dependency, regardless of what the employment contract says. You cannot contract below the LCT minimum. Any clause that does so is null and void; the LCT provision applies instead.</p>

<p>Key principle: in Argentine labor law, doubt is resolved in favor of the employee (<em>in dubio pro operario</em>). This shapes everything from contract interpretation to termination disputes.</p>

<h2>Contract Types</h2>

<h3>Relación de dependencia (employment contract)</h3>
<p>The standard form for employees. The employer pays full social security contributions (<em>cargas sociales</em>) on top of the gross salary. This includes:</p>
<ul>
  <li>ANSES (pension): 10.77% employer contribution</li>
  <li>ANSES (family allowances): 4.44%</li>
  <li>ART (workplace accident insurance): 1.5–3% depending on activity</li>
  <li>Obra social (health insurance): 6%</li>
  <li>ANSSAL: 0.15%</li>
</ul>
<p>Total employer burden above gross salary: approximately <strong>24–27%</strong>.</p>

<h3>Monotributo (self-employed contractor)</h3>
<p>A simplified tax regime for self-employed workers. The contractor issues invoices and pays their own taxes. Cheaper for the company in the short term — but carries misclassification risk. AFIP and labor courts look at the substance of the relationship, not the label. If the work looks like employment (fixed hours, supervision, exclusivity), you may be reclassified as an employer with retroactive obligations.</p>

<h3>Trial period</h3>
<p>The first three months of any indefinite employment contract are considered a probationary period. During this time, either party can terminate without severance (standard notice still applies). After the trial period, full termination rights attach.</p>

<h2>Mandatory Benefits Under the LCT</h2>

<table>
  <thead><tr><th>Benefit</th><th>Details</th></tr></thead>
  <tbody>
    <tr><td>Aguinaldo (13th month)</td><td>One month's salary paid in two installments: June and December. Equal to 50% of the highest monthly salary in each semester.</td></tr>
    <tr><td>Paid vacation</td><td>14 days/year (up to 5 years seniority), 21 days (5–10 years), 28 days (10–20 years), 35 days (20+ years).</td></tr>
    <tr><td>Obra social</td><td>Employer must register the employee with an approved health insurance provider (obra social). Employee contributes 3%, employer 6% of gross salary.</td></tr>
    <tr><td>ART</td><td>Employer must hold workplace accident insurance. Mandatory, non-negotiable.</td></tr>
    <tr><td>Sick leave</td><td>Paid sick leave of 3–12 months depending on seniority and family situation.</td></tr>
    <tr><td>Maternity leave</td><td>90 days paid maternity leave. Employer pays, then recovers from ANSES.</td></tr>
  </tbody>
</table>

<h2>What Payroll Actually Costs</h2>

<p>A simple example: employee with a gross salary of ARS 1,000,000/month.</p>

<table>
  <thead><tr><th>Item</th><th>Amount</th></tr></thead>
  <tbody>
    <tr><td>Gross salary</td><td>ARS 1,000,000</td></tr>
    <tr><td>Employer contributions (~25%)</td><td>ARS 250,000</td></tr>
    <tr><td>Aguinaldo provision (1/12 monthly)</td><td>ARS 83,333</td></tr>
    <tr><td>Vacation provision (~8%)</td><td>ARS 80,000</td></tr>
    <tr><td><strong>Total monthly cost to employer</strong></td><td><strong>ARS 1,413,333</strong></td></tr>
    <tr><td>Employee net (after employee deductions ~17%)</td><td>ARS 830,000</td></tr>
  </tbody>
</table>

<p>In USD terms at any given exchange rate, Argentine salaries are highly competitive globally. This is the fundamental driver of nearshoring demand.</p>

<h2>Termination: What It Really Costs</h2>

<p>This is the part most foreign companies underestimate. Argentine labor law requires:</p>

<ul>
  <li><strong>Notice period:</strong> 15 days (during trial), or 1 month (up to 5 years seniority), or 2 months (5+ years). Payment in lieu of notice is standard.</li>
  <li><strong>Severance (<em>indemnización</em>):</strong> 1 month's salary per year of service (minimum 1 month), calculated on the highest normal salary in the last year. No cap.</li>
  <li><strong>Vacation days accrued:</strong> Proportional to days worked in the current year, paid out at termination.</li>
  <li><strong>Integration month (<em>mes de integración</em>):</strong> If termination occurs mid-month, the company pays the remainder of that month.</li>
</ul>

<p><strong>Example:</strong> An employee with 3 years of service and ARS 1,000,000 gross salary costs approximately ARS 4,000,000–4,500,000 to terminate without cause (severance + notice + accruals).</p>

<p>Budget for this from day one. It is not a surprise — it is the law.</p>

<h2>Frequently Asked Questions</h2>

<div class="faq-item">
  <h3>Can I hire someone in Argentina and pay them in USD?</h3>
  <p>You can pay in USD through an Argentine bank account (caja de ahorro en dólares). The employment contract, payroll, and AFIP filings must still be in pesos at the official exchange rate. The USD payment is effectively a salary supplement. Structure this carefully with a local labor lawyer.</p>
</div>

<div class="faq-item">
  <h3>What's the minimum wage in Argentina?</h3>
  <p>The Salario Mínimo Vital y Móvil (SMVM) is updated periodically by the government. As of 2026, it is adjusted roughly quarterly. Any employment contract must pay at least the SMVM — but in practice, market salaries for skilled roles are significantly above it.</p>
</div>

<div class="faq-item">
  <h3>Can I use performance-based contracts to reduce severance exposure?</h3>
  <p>Fixed-term contracts (contratos a plazo fijo) are possible for specific projects or roles with a defined end date. They require genuine justification. If they are repeatedly renewed or the underlying work is indefinite in nature, they convert to indefinite contracts retroactively.</p>
</div>
    `,
  },

  {
    slug: "argentina-vs-brazil-business-setup",
    title: "Argentina vs. Brazil: Where to Set Up Your Latin America Operations",
    metaDescription: "Argentina vs Brazil for business setup: talent cost, legal complexity, banking, and stability compared. Which country makes sense for your LATAM expansion in 2026.",
    date: "2026-05-25",
    readingTime: "6 min read",
    category: "strategy",
    excerpt: "Both countries offer real advantages for LATAM operations. The right answer depends entirely on what you're building and who you're hiring.",
    content: `
<p>If you're evaluating where to anchor your Latin America operations, Argentina and Brazil are usually the two serious candidates. Both have large talent pools, significant domestic markets, and growing FDI. They also have different risk profiles, cost structures, and operational complexities. Here's how they actually compare for a foreign company making this decision in 2026.</p>

<h2>Talent: Cost, Quality, and Availability</h2>

<h3>Argentina</h3>
<p>Argentina has one of the most educated workforces in Latin America, with strong concentrations of software engineers, finance professionals, legal talent, and technical specialists. Buenos Aires is a genuine tech hub — home to unicorns like Mercado Libre and a dense freelancer ecosystem that has been building global work relationships for 15+ years.</p>

<p>Cost advantage is real and substantial. A senior software engineer in Buenos Aires costs USD 2,000–4,000/month all-in. The same profile in São Paulo costs USD 4,000–8,000. In Austin or Berlin, USD 10,000–15,000.</p>

<p>English proficiency is high by regional standards. Timezone alignment with North America (EST+1-3h) is excellent.</p>

<h3>Brazil</h3>
<p>Brazil's talent pool is larger in absolute terms — by population alone. São Paulo is a more mature corporate hub with established offices of most global multinationals. Portuguese fluency is near-universal; English is less prevalent than in Argentina, especially outside São Paulo and Rio.</p>

<p>Brazilian tech talent is competitive but more expensive than Argentine. Regulatory complexity also means that HR overhead is high — Brazilian labor law (CLT) rivals Argentina's in complexity and employee protections.</p>

<h2>Legal and Banking Infrastructure</h2>

<h3>Argentina</h3>
<p>Entity setup: 40–60 business days. Banking: 15–30 days after incorporation. FX regulations are complex but manageable with local expertise. The legal framework is predictable if you have local lawyers — it is not a legal Wild West.</p>

<h3>Brazil</h3>
<p>Entity setup in Brazil is notoriously complex. A Limitada (Brazil's LLC equivalent) takes 30–90 days depending on the state and whether you have local partners. Brazilian bureaucracy (the "custo Brasil") is a documented competitive disadvantage. Banking is more straightforward once incorporated. FX is less restricted than Argentina.</p>

<h2>Economic Stability: The Honest Comparison</h2>

<p>Neither country offers the stability of Western Europe or Singapore. But they're different kinds of unstable:</p>

<ul>
  <li><strong>Argentina</strong> has recurring macroeconomic crises, high inflation, and a history of currency devaluations. This is real and must be planned for in your treasury structure. The upside: talented people are cheap in USD terms precisely because of this instability.</li>
  <li><strong>Brazil</strong> is more macroeconomically stable but politically volatile. Regulatory and tax changes are frequent. The "custo Brasil" — the aggregate cost of compliance — is high and rises unpredictably.</li>
</ul>

<p>For foreign companies with dollar-denominated revenue and local-currency costs, Argentina's instability often works in their favor. For companies with significant local revenue exposure, Brazil's larger domestic market may justify the complexity.</p>

<h2>Sectors Where Argentina Wins</h2>

<ul>
  <li><strong>Tech nearshoring</strong> — cost-quality ratio is unmatched in the region</li>
  <li><strong>Energy</strong> — Vaca Muerta and lithium resources are world-class; no Brazilian equivalent</li>
  <li><strong>Agriculture and agribusiness</strong> — Argentina is a global agricultural powerhouse</li>
  <li><strong>Regional shared services</strong> — Buenos Aires timezone and English proficiency make it ideal</li>
</ul>

<h2>Sectors Where Brazil Wins</h2>

<ul>
  <li><strong>Consumer market access</strong> — 215M people vs Argentina's 46M</li>
  <li><strong>Manufacturing</strong> — larger industrial base and supply chain infrastructure</li>
  <li><strong>Financial services</strong> — São Paulo is Latin America's financial capital</li>
  <li><strong>Portuguese-language operations</strong> — necessary for serving the Brazilian market</li>
</ul>

<h2>The Verdict by Operation Type</h2>

<table>
  <thead><tr><th>Operation type</th><th>Better fit</th></tr></thead>
  <tbody>
    <tr><td>Nearshoring tech team (USD revenue)</td><td>Argentina</td></tr>
    <tr><td>Energy or resource extraction</td><td>Argentina</td></tr>
    <tr><td>LATAM regional HQ</td><td>Argentina (Buenos Aires) or Brazil (São Paulo) — depends on language</td></tr>
    <tr><td>Consumer product targeting Brazil</td><td>Brazil</td></tr>
    <tr><td>Manufacturing</td><td>Brazil</td></tr>
    <tr><td>Shared services center (EN/ES)</td><td>Argentina</td></tr>
  </tbody>
</table>

<h2>Frequently Asked Questions</h2>

<div class="faq-item">
  <h3>Can I set up in both Argentina and Brazil simultaneously?</h3>
  <p>Yes. Many multinationals do. The question is sequencing — which market justifies the setup cost and management overhead first. Most companies that come to us start with Argentina for cost reasons and add Brazil when local Brazilian revenue justifies it.</p>
</div>

<div class="faq-item">
  <h3>Is Argentina's economic instability a dealbreaker for serious investment?</h3>
  <p>Not for companies with the right structure. The companies succeeding in Argentina in 2026 treat FX risk as an operational parameter — they structure their treasury, contracts, and pricing to manage it, not ignore it. Plenty of foreign companies have operated successfully in Argentina for decades.</p>
</div>
    `,
  },

  {
    slug: "nearshoring-argentina-tech-team",
    title: "How to Build Your Tech Team in Argentina: The Nearshoring Playbook (2026)",
    metaDescription: "Practical guide to nearshoring to Argentina in 2026. How to hire developers, manage compliance, EOR vs entity, and build a remote team that actually works.",
    date: "2026-05-26",
    readingTime: "7 min read",
    category: "hiring",
    excerpt: "Argentina's tech talent is world-class and USD-affordable. Here's the complete operational playbook for building your engineering team there.",
    content: `
<p>Argentina has been a nearshoring destination for US and European tech companies for over a decade. The combination of strong engineering education, English proficiency, timezone alignment with the Americas, and a cost structure that makes dollar-denominated hiring genuinely affordable has made Buenos Aires one of the top remote tech hubs in the world.</p>

<p>This is the operational playbook — not the pitch. How to actually build and run an Argentine tech team in 2026.</p>

<h2>Why Argentina for Tech Nearshoring</h2>

<h3>Cost advantage</h3>
<p>A senior full-stack engineer in Buenos Aires costs USD 2,500–4,500/month all-in (salary + employer costs). The same profile in the US costs USD 12,000–18,000/month. Even with EOR fees and local compliance overhead, the cost savings are 60–75%.</p>

<h3>Talent density</h3>
<p>Argentina graduates more than 10,000 software engineers per year. Buenos Aires alone has a dense ecosystem of developers experienced with global remote work — many have worked for US companies via platforms like Toptal, Turing, and direct contracts for years. This is not a thin talent market.</p>

<h3>Timezone</h3>
<p>Buenos Aires is UTC-3 year-round (no daylight saving). From the US East Coast: 1-2 hours ahead. From Europe (CET): 4-5 hours behind. Strong overlap with both markets during standard working hours.</p>

<h3>English proficiency</h3>
<p>Argentina's English Proficiency Index consistently ranks in the top 5 in Latin America. Tech professionals specifically have high rates of professional English fluency — most have conducted technical interviews, code reviews, and project communication in English throughout their careers.</p>

<h2>EOR vs. Own Entity: The Tech-Specific Decision</h2>

<p>For tech nearshoring, the decision tree is straightforward:</p>

<ul>
  <li><strong>1–3 engineers:</strong> Start with EOR. Faster, lower overhead, lets you validate the team before committing to entity costs.</li>
  <li><strong>4–8 engineers:</strong> Run entity setup in parallel while using EOR. At 5+ people, an entity becomes cheaper than EOR fees.</li>
  <li><strong>8+ engineers:</strong> Own entity is clearly the right structure. You also want your own employer brand, benefits structure, and hiring pipeline.</li>
</ul>

<p>See our full guide on <a href="/blog/employer-of-record-argentina">EOR vs own entity in Argentina</a> for the cost comparison.</p>

<h2>Hiring: Where to Find Argentine Developers</h2>

<h3>Direct hiring (best long-term)</h3>
<ul>
  <li><strong>LinkedIn Argentina</strong> — active market, developers respond well to inbound</li>
  <li><strong>Bumeran / Computrabajo</strong> — major local job boards</li>
  <li><strong>Referrals from your first hire</strong> — Argentine tech community is tight-knit</li>
</ul>

<h3>Platforms</h3>
<ul>
  <li><strong>Toptal</strong> — pre-vetted, English-fluent, higher rates (USD 60–150/hr)</li>
  <li><strong>Turing</strong> — vetted remote engineers, mid-range rates</li>
  <li><strong>Gun.io</strong> — US-focused platform with strong Argentine talent pool</li>
</ul>

<h3>Local recruiters</h3>
<p>For senior roles or team builds of 5+, a Buenos Aires-based technical recruiter is worth the fee (typically 10–15% of annual salary). They know the market and can close candidates you can't.</p>

<h2>Compensation Structure That Works</h2>

<p>Argentine developers who work for foreign companies have become sophisticated about compensation. A competitive offer in 2026 typically includes:</p>

<ul>
  <li><strong>Base salary in USD</strong> (paid into Argentine peso account at a favorable rate, or into a foreign account)</li>
  <li><strong>Health insurance</strong> beyond the mandatory obra social</li>
  <li><strong>Annual performance bonus</strong></li>
  <li><strong>Hardware allowance</strong> (laptop, peripherals)</li>
  <li><strong>Internet and home office stipend</strong></li>
  <li><strong>Learning and development budget</strong></li>
</ul>

<p>Competing only on salary will not close your best candidates. The developers you want have options — from Argentine unicorns, US companies already in market, and direct freelance relationships. Offer a real package.</p>

<h2>From 0 to Operating Team in 45 Days</h2>

<table>
  <thead><tr><th>Week</th><th>Action</th></tr></thead>
  <tbody>
    <tr><td>Week 1</td><td>Discovery call → define role specs, compensation bands, entity strategy</td></tr>
    <tr><td>Week 1–2</td><td>EOR setup OR entity incorporation kicked off (parallel tracks)</td></tr>
    <tr><td>Week 2–3</td><td>Sourcing and technical interviews</td></tr>
    <tr><td>Week 3–4</td><td>Offers extended, employment contracts signed through EOR</td></tr>
    <tr><td>Week 4–5</td><td>Onboarding: equipment, access, accounts, team integration</td></tr>
    <tr><td>Week 6+</td><td>First sprint. Team is operating.</td></tr>
  </tbody>
</table>

<h2>Frequently Asked Questions</h2>

<div class="faq-item">
  <h3>How do I manage a remote team in Argentina from the US?</h3>
  <p>The same tools as any remote team: Slack, Linear/Jira, GitHub, Notion, Loom. The practical difference is timezone: schedule daily standups at 9am Buenos Aires time (6-7am US Pacific, 9-10am US Eastern). Avoid Friday afternoon meetings — Argentine work culture values the long weekend.</p>
</div>

<div class="faq-item">
  <h3>Is turnover high in the Argentine tech market?</h3>
  <p>It was very high in 2021–2022 when remote work exploded globally. It has stabilized. Companies that pay market rates in USD and invest in career development retain their Argentine teams well. The engineers who prioritize stability over maximizing offers are exactly who you want.</p>
</div>

<div class="faq-item">
  <h3>Can I hire developers as contractors (not employees) to avoid labor law?</h3>
  <p>You can — but the misclassification risk is real. Argentine labor law looks at the substance of the relationship. If a developer works exclusively for you, follows your hours, uses your tools, and has been "contracting" for 18+ months, a labor court will likely find employment and award retroactive benefits including severance. Use a proper EOR or entity.</p>
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
