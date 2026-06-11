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
    slug: "argentina-capital-markets-big-bang-2026",
    title: "Argentina's Capital-Markets 'Big Bang': What the 2026 CNV Reform Means for Foreign Companies and Investors",
    metaDescription: "Argentina's securities regulator (CNV) replaced prior approval of securities issuance with automatic authorization — General Resolutions 1145–1150/2026, in force since June 11, 2026. What changed, the UVA thresholds, the tokenization sandbox, and what it means for foreign companies financing operations in Argentina.",
    date: "2026-06-11",
    readingTime: "8 min read",
    category: "banking",
    excerpt: "Since June 11, 2026, most securities issuances in Argentina no longer need prior regulatory approval — a filing replaces the permission slip. Here's what the 'Big Bang' actually changes, and for whom.",
    content: `
<p>On June 11, 2026, Argentina's securities regulator — the Comisión Nacional de Valores (CNV) — brought into force what its own president calls the market's <strong>"Big Bang"</strong>: General Resolutions <strong>1145 through 1150/2026</strong>, published in the Official Gazette, which replace the decades-old regime of prior approval for securities issuance with <strong>automatic authorization</strong>. A company files; it does not ask permission. The deliberate echo of London's 1986 "Big Bang" deregulation is the government's own framing — and structurally, the comparison is not absurd. (Official announcement: <a href="https://www.argentina.gob.ar/noticias/big-bang-regulatorio-desregulacion-de-aprobaciones-para-emisoras-ffs-y-fcis-regimen-de-0" target="_blank" rel="noopener noreferrer">Argentina.gob.ar</a>; coverage: <a href="https://www.ambito.com/finanzas/mercado-capitales-la-cnv-oficializo-el-big-bang-regulatorio-y-se-agilizan-las-emisiones-autorizaciones-automaticas-n6287460" target="_blank" rel="noopener noreferrer">Ámbito</a>, <a href="https://www.cronista.com/finanzas-mercados/transformacion-financiera-cnv-aprobo-las-normas-que-traeran-un-cambio-radical-en-el-mercado-argentino/" target="_blank" rel="noopener noreferrer">El Cronista</a>.)</p>

<p>This guide explains what actually changed, the thresholds that matter, and what it means for a foreign company operating — or financing operations — in Argentina. The sourced, always-current entry lives on our <a href="/oportunidades/big-bang-mercado-capitales-cnv-2026">regulatory radar</a>.</p>

<h2>What changed on June 11, 2026?</h2>

<p>The reform's core is a switch of regulatory philosophy: from <em>review before approval</em> to <em>filing, issuer responsibility, and supervision afterwards</em>. Under the new <strong>"Régimen de Autorización Automática de Mediano Impacto Ampliado"</strong> (expanded medium-impact automatic-authorization regime):</p>

<ul>
  <li><strong>Open-end mutual funds (FCI abiertos):</strong> prior approval disappears entirely, regardless of size or target investor. File and launch.</li>
  <li><strong>Shares, corporate bonds (obligaciones negociables), closed-end funds and financial trusts up to 100 million UVAs</strong> (roughly US$130–140 million at mid-2026 values): automatic authorization — no prior CNV approval.</li>
  <li><strong>Above 100 million UVAs:</strong> still no prior approval needed when the instruments are offered to <em>qualified investors</em>.</li>
  <li><strong>The qualified-investor threshold drops</strong> from 350,000 to 200,000 UVAs — roughly US$300,000 in assets or deposits. A much wider pool of investors can now be offered any instrument without prior authorization.</li>
  <li><strong>Tokenization (RG 1150/2026):</strong> digital representation of securities is extended to the automatic-authorization regimes, and the regulatory sandbox runs until <strong>December 31, 2027</strong>.</li>
  <li><strong>SME relief:</strong> small and mid-size issuers are exempted from requirements such as the statutory audit committee and IFRS reporting under the new regime.</li>
</ul>

<h2>Why it matters for foreign companies</h2>

<h3>1. Local financing becomes a real option, on a CFO's timeline</h3>
<p>Until now, financing an Argentine subsidiary through the local market meant months of regulatory queue. With automatic authorization, the timing of a bond or equity issuance is a treasury decision, not an administrative one. For a foreign company with revenue in pesos, issuing locally — instead of funding everything with intercompany dollars — becomes materially easier. (On the banking rails you still need first, see <a href="/blog/how-to-open-a-bank-account-in-argentina-foreign-company">opening a bank account in Argentina as a foreign company</a>.)</p>

<h3>2. Real-estate and project structures unlock</h3>
<p>Closed-end funds and financial trusts up to ~US$130–140M with automatic authorization change the math for real-estate development, agriculture and infrastructure vehicles — the structures most used to pool local capital for hard assets.</p>

<h3>3. A regulated on-ramp for tokenized structures</h3>
<p>RG 1150 extends tokenization to the automatic regimes inside a sandbox that runs to end-2027. For fintech and digital-asset operators, Argentina now offers something rare: a large market with an explicit, time-boxed regulatory framework for tokenized securities.</p>

<h2>What has not changed</h2>

<p>Supervision still exists — it moves <em>after</em> issuance: filings, issuer responsibility and subsequent oversight replace prior review, they do not abolish it. Macro volatility, currency rules and tax treatment are separate questions, unchanged by these resolutions. And this reform is about <em>securities issuance</em>; it does not alter company formation, which still follows its own process (see <a href="/blog/how-to-set-up-a-company-in-argentina">how to set up a company in Argentina</a>). None of this is legal or investment advice.</p>

<h2>How to position</h2>

<p>The reform rewards companies that already have their Argentine structure in order — entity, banking, accounting — because those are the rails any local issuance runs on. That is what Inteligenci·AR sets up, with the regulatory tracking included. <a href="/#contact">Get in touch</a> to map what this opens for your sector, or follow the measure on the <a href="/oportunidades">radar</a>.</p>

<h2>Frequently asked questions</h2>

<div class="faq-item">
<h3>What is Argentina's capital-markets "Big Bang"?</h3>
<p>A package of CNV General Resolutions (1145–1150/2026), in force since June 11, 2026, that replaces prior approval of securities issuance with automatic authorization based on filings. Open-end mutual funds need no prior approval at all; shares, bonds, closed-end funds and financial trusts get automatic authorization up to 100 million UVAs (~US$130–140M), and above that when offered to qualified investors.</p>
</div>

<div class="faq-item">
<h3>Is the CNV reform already in force?</h3>
<p>Yes. The resolutions were approved by the CNV board on June 10, 2026, published in the Official Gazette, and the automatic-authorization mechanisms apply since June 11, 2026. Procedures already in progress were automatically authorized without further filings.</p>
</div>

<div class="faq-item">
<h3>What is a qualified investor in Argentina after the 2026 reform?</h3>
<p>The threshold dropped from 350,000 to 200,000 UVAs — roughly US$300,000 in assets or deposits in the financial system. Qualified investors can be offered instruments of any size without prior CNV authorization of the offering.</p>
</div>

<div class="faq-item">
<h3>Can foreign companies issue bonds or shares in Argentina under the new regime?</h3>
<p>The automatic-authorization regime applies to issuers in the Argentine market, including local subsidiaries of foreign companies that have an Argentine entity and meet the filing requirements. Issuances up to ~US$130–140M get automatic authorization; larger ones do too when targeted at qualified investors. Specific eligibility should be confirmed case by case — this is not legal advice.</p>
</div>

<div class="faq-item">
<h3>What happened with tokenization in Argentina's 2026 reform?</h3>
<p>General Resolution 1150/2026 extends the digital representation (tokenization) of securities to the automatic-authorization regimes and extends Argentina's tokenization regulatory sandbox until December 31, 2027.</p>
</div>
`,
  },
  {
    slug: "hiring-in-argentina-2026-labor-reform",
    title: "Hiring in Argentina After the 2026 Labor Reform: 446 Collective Agreements Head to Renegotiation",
    metaDescription: "Argentina's government expanded from 150 to 446 the expired collective bargaining agreements that employers and unions must renegotiate, under Decree 407/2026 implementing the Labor Modernization Law (27.802). What changes for foreign companies hiring in Argentina: ultraactivity, solidarity dues, and sector-by-sector modernization.",
    date: "2026-06-11",
    readingTime: "7 min read",
    category: "hiring",
    excerpt: "Argentina just put 446 expired collective agreements on the renegotiation table and ended the automatic survival of union-dues clauses. For foreign employers, the labor framework is being rewritten sector by sector.",
    content: `
<p>On June 11, 2026, Argentina's Secretariat of Labor expanded from <strong>150 to 446</strong> the number of expired collective bargaining agreements (convenios colectivos) that employers and unions must renegotiate, implementing the <strong>Labor Modernization Law (Ley 27.802)</strong> through <strong>Decree 407/2026</strong> (<a href="https://www.infobae.com/politica/2026/06/11/reforma-laboral-el-gobierno-amplio-a-446-la-cantidad-de-convenios-colectivos-que-deberan-renegociar-empresarios-y-sindicalistas/" target="_blank" rel="noopener noreferrer">Infobae</a>). For foreign companies that hire — or plan to hire — in Argentina, this is the most consequential labor development of 2026: the agreements that define working conditions in sector after sector are being reopened for the first time in decades.</p>

<p>The sourced, always-current entry for this measure lives on our <a href="/oportunidades/reforma-laboral-convenios-colectivos-2026">regulatory radar</a>.</p>

<h2>What is "ultraactivity", and why does ending it matter?</h2>

<p>Under Argentina's traditional regime, a collective agreement that expired <em>never really expired</em> — its clauses survived automatically until a new agreement replaced them. This "ultraactividad" froze working conditions negotiated decades ago (many agreements date from the 1970s–1990s) and removed any incentive to renegotiate.</p>

<p>The reform splits an expired agreement in two:</p>

<ul>
  <li><strong>Normative clauses</strong> — actual working conditions (hours, categories, tasks) — remain in force until renegotiated.</li>
  <li><strong>Obligational clauses</strong> — solidarity dues and compulsory employer contributions to unions — <strong>lapse when the agreement expires</strong>.</li>
</ul>

<p>That second point changes the bargaining table itself: the cost structure that made expired agreements comfortable for incumbents now has an expiry date, and both sides have a reason to sit down.</p>

<h2>What exactly happens with the 446 agreements?</h2>

<p>The 446 expired agreements — spanning industries from construction to services — enter a renegotiation procedure between employer chambers and unions covering two fronts: <strong>working conditions</strong> and <strong>solidarity dues / compulsory contributions</strong>. The Secretariat of Labor (Ministry of Human Capital) runs the procedure. The decree opens the door to renegotiating every clause that can be renegotiated within this process.</p>

<h2>What it means for foreign employers</h2>

<h3>1. More predictable hiring costs — eventually, sector by sector</h3>
<p>Modernized agreements mean job categories and conditions that match how work is actually done today, and an end to legacy contribution clauses an employer never negotiated. The transition is gradual: each sector renegotiates on its own timeline, so the practical picture depends on <em>your</em> collective agreement. Mapping which one applies to your activity is step one — it determines salary floors, categories and contributions before you make your first hire (see <a href="/blog/hiring-employees-argentina-foreign-company">hiring employees in Argentina as a foreign company</a>).</p>

<h3>2. A window to enter while the framework modernizes</h3>
<p>Argentina's labor law had been the most-cited deterrent for foreign employers. A framework being rewritten in favor of firm-level flexibility — together with the <a href="/blog/argentina-deregulation-2026-foreign-companies">broader 2026 deregulation wave</a> — shifts the calculus for setting up a local team now rather than later.</p>

<h3>3. EOR first, entity when ready</h3>
<p>If you want talent before navigating a renegotiating sector, an <a href="/blog/employer-of-record-argentina">Employer of Record</a> lets you hire compliantly while the new agreements settle, then migrate to your own entity.</p>

<h2>Status and caveats</h2>

<p>Decree 407/2026 is in force and the renegotiation procedure is underway — but renegotiations themselves will take time, and outcomes will differ by sector. Existing normative clauses remain binding until replaced. As always on these topics: this is regulatory information, not legal advice, and the status of each measure is tracked on our <a href="/oportunidades">radar</a>.</p>

<h2>Frequently asked questions</h2>

<div class="faq-item">
<h3>What is Argentina's 2026 labor reform?</h3>
<p>The Labor Modernization Law (Ley 27.802), implemented by Decree 407/2026, ends the automatic survival ("ultraactivity") of expired collective agreements' obligational clauses and sends 446 expired agreements to renegotiation between employers and unions, covering working conditions and solidarity dues.</p>
</div>

<div class="faq-item">
<h3>How many collective agreements must be renegotiated in Argentina?</h3>
<p>446. The government initially listed 150 expired agreements and expanded the list to 446 on June 11, 2026, spanning sectors from construction to services.</p>
</div>

<div class="faq-item">
<h3>Do union solidarity dues still apply after an agreement expires?</h3>
<p>Under the reform, obligational clauses — solidarity dues and compulsory employer contributions — lapse when the collective agreement expires. Normative clauses (working conditions) remain in force until a new agreement replaces them.</p>
</div>

<div class="faq-item">
<h3>Is it safer to hire in Argentina through an EOR during the labor reform?</h3>
<p>An Employer of Record is a practical way to hire compliantly while your sector's collective agreement is being renegotiated: the EOR carries the employment relationship under current rules, and you can migrate the team to your own entity once the new framework settles. Which route is better depends on headcount and timeline.</p>
</div>
`,
  },
  {
    slug: "argentina-deregulation-2026-foreign-companies",
    title: "Argentina's 2026 Deregulation Wave: What the World's Biggest Economic-Freedom Gain Means for Foreign Companies",
    metaDescription: "Argentina recorded the largest economic-freedom gain of any country in the 2026 Heritage Index (score 57.4, +3.2 pts, rank #106). Here's what's being deregulated — real estate, imports, professions, exports — and what it means for foreign companies entering Argentina.",
    date: "2026-06-09",
    readingTime: "9 min read",
    category: "strategy",
    excerpt: "Argentina was the single biggest improver in the 2026 Index of Economic Freedom. For foreign companies, the deregulation wave behind that number is the real story — and the opportunity.",
    content: `
<p>In the 2026 Heritage Foundation <a href="https://www.heritage.org/index/pages/country-pages/argentina" target="_blank" rel="noopener noreferrer">Index of Economic Freedom</a>, Argentina recorded the <strong>largest economic-freedom gain of any country in the world</strong>: its score rose to <strong>57.4</strong> (up 3.2 points year over year), lifting it to world rank #106 — a jump of roughly 40 places. For foreign companies weighing whether to enter Argentina, that single number is a useful headline. The deregulation program behind it is the real story.</p>

<p>This guide explains what is actually being deregulated, what is still a bill rather than a law, and what the shift means for companies that want to land, operate, and export from Argentina. For the live, source-by-source breakdown, see our <a href="/oportunidades">regulatory opportunities radar</a>.</p>

<h2>Why did Argentina's economic-freedom score jump in 2026?</h2>

<p>The gain reflects a broad program targeting fiscal consolidation, monetary stabilization, and — most relevant for operators — <strong>regulatory simplification</strong>: removing licensing barriers, price-setting bodies, and duplicate administrative requirements across sector after sector. Argentina remains in the "Mostly Unfree" band (scores of 50–59.9), so this is a trajectory, not a destination. But the direction of travel is unusually clear, and it is happening fast.</p>

<h2>What is actually being deregulated?</h2>

<p>Below is a snapshot of measures our team is tracking. Each links to a sourced entry on the radar with what changed, the legal instrument, and its current status.</p>

<table>
  <thead><tr><th>Area</th><th>What changes</th><th>Status</th></tr></thead>
  <tbody>
    <tr><td><a href="/oportunidades/inmobiliaria-corretaje-2026">Real estate &amp; brokerage</a></td><td>No mandatory license or degree to broker; platform-based brokerage explicitly allowed; free pricing</td><td>Bill to Congress</td></tr>
    <tr><td><a href="/oportunidades/colegios-profesionales-2026">Professional colleges</a></td><td>End of minimum fees and mandatory registration as entry barriers</td><td>Bill to Congress</td></tr>
    <tr><td><a href="/oportunidades/pilas-baterias-2026">Import certification</a></td><td>US/EU/Japan standards recognized; redundant local certification removed (batteries first)</td><td>Announced</td></tr>
    <tr><td><a href="/oportunidades/habilitaciones-municipales-arca-2026">Export &amp; customs</a></td><td>Municipal permits no longer required for in-plant exports and bonded warehouses</td><td>In force</td></tr>
    <tr><td><a href="/oportunidades/patentes-propiedad-intelectual-2026">Patents &amp; IP</a></td><td>Alignment with the PCT, Budapest Treaty and Madrid Protocol</td><td>In process</td></tr>
  </tbody>
</table>

<p>The pattern matters more than any single item: barriers that protected incumbents — licensing boards, local-only certification, price floors — are being dismantled in favor of competition. That is precisely the kind of change that lowers the cost of entry for a foreign operator.</p>

<h2>What does it mean for foreign companies?</h2>

<h3>1. Entering is getting cheaper and faster</h3>
<p>Lower certification and licensing friction reduces the cost of importing equipment and inputs, and opens sectors (brokerage, professional services) that were effectively closed to new digital entrants. If your model is a marketplace or a service platform, several of these changes remove the gatekeeper. (Setting up the entity itself still follows a process — see our guide on <a href="/blog/how-to-set-up-a-company-in-argentina">how to set up a company in Argentina</a>.)</p>

<h3>2. Operating gets simpler</h3>
<p>Removing duplicate municipal and national requirements cuts administrative overhead. The labor framework has also moved toward firm-level agreements, giving more flexibility on <a href="/blog/employer-of-record-argentina">hiring and payroll</a>.</p>

<h3>3. Exporting from Argentina is a thesis, not a footnote</h3>
<p>The customs and in-plant export changes, plus the IP alignment, make Argentina more credible as an <em>export base</em> — not just a domestic market. The yerba-mate case the government cites as its model (a deregulated market that reached record exports) is the template it wants to replicate across sectors.</p>

<h2>Important: many of these are bills, not laws</h2>

<p>This is the part most coverage gets wrong. Several headline measures — including the real-estate and professional-college reforms — are <strong>bills heading to Congress</strong>, not statutes in force. Others are administrative announcements. A few (like the customs change) are already in effect. The practical stance for a foreign company is <strong>readiness</strong>: position now, structure for the change, but do not assume a bill is law. Every entry on our <a href="/oportunidades">radar</a> shows its exact status for this reason. None of this is legal advice.</p>

<h2>How to position now</h2>

<p>The companies that benefit most from a regulatory shift are the ones already structured when it lands. That means having the entity, banking, accounting and hiring rails in place, and a clear read on which specific measures affect your sector and when. That is exactly what Inteligenci·AR does — soft-landing and regulatory intelligence from a single point of contact. <a href="/#contact">Get in touch</a> to map your sector against the radar.</p>

<h2>Frequently asked questions</h2>

<div class="faq-item">
<h3>What is Argentina's economic freedom score in 2026?</h3>
<p>Argentina scored 57.4 in the 2026 Heritage Index of Economic Freedom, up 3.2 points from the previous year — the largest gain of any country in that edition — placing it at world rank #106, in the "Mostly Unfree" category. Source: Heritage Foundation, Index of Economic Freedom 2026.</p>
</div>

<div class="faq-item">
<h3>Is Argentina a good place to set up a company in 2026?</h3>
<p>It is improving quickly. Deregulation is lowering entry and operating costs in several sectors, and the country posted the world's biggest economic-freedom gain in 2026. The caveats are real: macro volatility persists, and several reforms are still bills rather than laws. For most foreign operators the right move is to structure for readiness — entity, banking, accounting and hiring in place — and track which measures actually pass.</p>
</div>

<div class="faq-item">
<h3>Which sectors are being deregulated in Argentina?</h3>
<p>Recent and announced measures touch real estate and brokerage, professional services, import certification (e.g. batteries and electronics), customs and in-plant exports, patents and intellectual property, and agriculture (seeds, the yerba-mate market). The live list with sources is on the Inteligenci·AR regulatory opportunities radar.</p>
</div>

<div class="faq-item">
<h3>Are Argentina's 2026 deregulations already law?</h3>
<p>Some are. The removal of municipal permits for in-plant exports is in force, and certain import-certification changes are administrative. But high-profile items like the real-estate and professional-college reforms are bills heading to Congress, not laws yet. Always check the status of a specific measure before acting on it.</p>
</div>

<div class="faq-item">
<h3>How can a foreign company take advantage of Argentina's deregulation?</h3>
<p>Map your sector against the specific measures, structure the entity and operating rails before the change lands, and move early in sectors where gatekeepers are being removed (such as platform-based brokerage or import-heavy models). A single point of contact for entity setup, banking, accounting, hiring and regulatory tracking removes most of the coordination risk.</p>
</div>
`,
  },
  {
    slug: "export-from-argentina-mercosur-base",
    title: "Using Argentina as an Export Base: Mercosur, Trade Agreements and the 2026 Customs Reforms",
    metaDescription: "How foreign companies can use Argentina as an export base in 2026: Mercosur access, the EU–Mercosur agreement, and the deregulation removing municipal permits for in-plant exports. A practical guide.",
    date: "2026-06-09",
    readingTime: "8 min read",
    category: "strategy",
    excerpt: "Most coverage treats Argentina as a market to sell into. The more interesting move for 2026 is using it as a base to sell out — to Mercosur and beyond.",
    content: `
<p>Argentina is usually framed as a domestic market — big, volatile, worth the trouble. The more interesting 2026 thesis for foreign companies is the opposite direction: setting up once in Argentina and using it as an <strong>export base</strong> to reach South America and beyond. Lower local costs, a deregulation wave cutting export friction, and Mercosur access combine into a case that didn't exist a few years ago.</p>

<p>This guide covers what that base actually gives you, what's changing in 2026, and the practical setup. For the live, sourced list of the customs and trade measures referenced here, see our <a href="/oportunidades">regulatory opportunities radar</a>.</p>

<h2>What does Mercosur access give you?</h2>

<p>Mercosur is South America's main customs union. Its full members — <strong>Argentina, Brazil, Paraguay and Uruguay</strong> (with Bolivia as the newest acceding member) — trade with sharply reduced or zero internal tariffs and share a common external tariff. Several other South American countries participate as associate states. For an operator, the headline is simple: a company based in Argentina can sell into Brazil — a market of more than 200 million people next door — under preferential terms rather than as a foreign importer.</p>

<p>Beyond the bloc, Argentina is party to a web of bilateral and regional trade arrangements. The most consequential is the <strong>EU–Mercosur agreement</strong>, whose political negotiation concluded in late 2024 and which is moving through ratification. It is not yet in force — but companies that structure now are positioning for it rather than reacting to it.</p>

<h2>What's changing in 2026?</h2>

<p>The deregulation program is targeting exactly the friction that made exporting from Argentina painful:</p>

<ul>
  <li><strong>Customs and in-plant exports.</strong> A measure already in force removes the requirement to present municipal permits for in-plant exports and bonded warehouses, cutting duplicate administrative steps. See the sourced entry on the <a href="/oportunidades/habilitaciones-municipales-arca-2026">elimination of municipal permits in national procedures</a>.</li>
  <li><strong>Intellectual property alignment.</strong> Argentina is aligning its patent framework with the PCT, Budapest Treaty and Madrid Protocol, which matters for any company exporting products tied to IP. See <a href="/oportunidades/patentes-propiedad-intelectual-2026">patent-regime alignment</a>.</li>
  <li><strong>Sector openings.</strong> Cases like the deregulated yerba-mate market — which the government cites as its model precisely because it moved to record exports — show the template it wants to replicate.</li>
</ul>

<p>The throughline is a government that explicitly treats "deregulated market → record exports" as the goal. That doesn't guarantee outcomes, but it changes the direction of the rules a foreign exporter has to work within.</p>

<h2>The practical setup</h2>

<p>Using Argentina as an export base needs the same operating rails as any local company, plus export registration:</p>

<ul>
  <li><strong>A local entity</strong> (usually an SRL) — see <a href="/blog/how-to-set-up-a-company-in-argentina">how to set up a company in Argentina</a>.</li>
  <li><strong>Tax and customs registration</strong> (CUIT, exporter registry).</li>
  <li><strong>Banking</strong> able to handle export proceeds in USD and ARS.</li>
  <li><strong>Hiring</strong> for any local operations or production — see <a href="/blog/employer-of-record-argentina">hiring and EOR in Argentina</a>.</li>
</ul>

<p>The coordination is the hard part. Done in sequence with five separate vendors, it stretches for months. Done in parallel under one project lead, an operating-and-export-ready base is achievable in roughly six weeks.</p>

<h2>Is the export thesis for everyone?</h2>

<p>No. If your only goal is to sell <em>into</em> Argentina, the macro volatility may not be worth it yet. The export-base case is strongest for companies that (a) want Mercosur/regional reach, (b) benefit from Argentina's cost base or talent, or (c) are positioning for the EU–Mercosur agreement. As always, several of the supporting measures are recent and some are still being implemented — structure for readiness, and verify the status of any specific rule.</p>

<div class="faq-item">
<h3>Can a company in Argentina export to Brazil tariff-free?</h3>
<p>Within Mercosur, internal trade among full members (Argentina, Brazil, Paraguay, Uruguay) benefits from sharply reduced or zero tariffs on most goods, subject to rules of origin and specific exceptions. A company based in Argentina can therefore reach the Brazilian market under preferential terms rather than as an external importer. Confirm the treatment for your specific product.</p>
</div>

<div class="faq-item">
<h3>Is the EU–Mercosur trade agreement in force?</h3>
<p>Not yet. The political negotiation concluded in late 2024 and the agreement is moving through ratification. Companies cannot rely on it as current law, but structuring an Argentine base now positions them for it if and when it takes effect.</p>
</div>

<div class="faq-item">
<h3>What changed for exporters in Argentina in 2026?</h3>
<p>Among other measures, a deregulation removed the requirement to present municipal permits for in-plant exports and bonded warehouses, reducing duplicate paperwork, and the patent framework is being aligned with international treaties. The live list with sources is on the Inteligenci·AR radar.</p>
</div>

<div class="faq-item">
<h3>How long does it take to set up an export-ready company in Argentina?</h3>
<p>With entity, tax, banking and export registration handled in parallel under one lead, an operating-and-export-ready base is typically achievable in around six weeks. Done sequentially across separate vendors it can take several months.</p>
</div>
`,
  },
  {
    slug: "ai-entity-argentina-non-human-corporation",
    title: "Argentina's Proposed 'AI-Entity': What a Non-Human Corporation Could Mean — and How to Be Ready",
    metaDescription: "Argentina is debating a legal framework for AI-run companies (a 'non-human corporation'). It is a proposal, not current law. Here's what's on the table, why Argentina, and what 'readiness' actually means for foreign founders.",
    date: "2026-06-09",
    readingTime: "7 min read",
    category: "legal",
    excerpt: "Argentina is discussing a legal framework for companies run by AI. It is a proposal, not law — but the readiness question is real, and it's worth understanding now.",
    content: `
<p><strong>Important up front: this is a proposed framework under discussion in Argentina, not current law.</strong> You cannot register an AI-run company in Argentina today. But the proposal is real enough — and Argentina's deregulation momentum strong enough — that it's worth understanding what's on the table and what it would take to be ready, without betting on a timeline.</p>

<h2>What is being proposed?</h2>

<p>The idea, floated as part of Argentina's broader deregulation and competitiveness agenda, is a legal vehicle for an entity whose operations and governance can be run by an artificial-intelligence system — sometimes described as a "non-human corporation" or "automated company." In the versions discussed publicly, the framework would address questions like the limited liability of the developer for algorithmic decisions, and the recognition of an AI-governed entity for contracting and operating.</p>

<p>None of that is settled. It is a <strong>project / proposal</strong>, not a statute. Any specific feature — registration, liability, governance requirements — could change or not pass at all.</p>

<h2>Why Argentina, and why now?</h2>

<p>Two forces make Argentina a plausible venue for this experiment. First, the deregulation wave: Argentina recorded the <a href="/blog/argentina-deregulation-2026-foreign-companies">largest economic-freedom gain of any country in the 2026 Heritage Index</a>, and the government has shown appetite for novel, business-forward frameworks. Second, the contrast: the EU is moving toward heavier AI regulation, and other jurisdictions face unresolved legal questions around autonomous entities and DAOs. A clear, permissive framework would be a differentiator.</p>

<p>That's the opportunity narrative. The honest counterweight is that "plausible venue" is not "done deal," and serious legal questions (liability, accountability, international recognition) remain open.</p>

<h2>What does "readiness" actually mean?</h2>

<p>Because the framework isn't live, the only responsible posture is <strong>readiness, not registration</strong>. In practice that means having the conventional foundations in place so that, if and when a framework exists, you can move quickly rather than starting from zero:</p>

<ul>
  <li>A registered legal entity (SA or SRL) in good standing.</li>
  <li>Clean, up-to-date corporate records.</li>
  <li>Defined governance and signatories — including how decisions are made and documented.</li>
  <li>Tax and compliance current.</li>
</ul>

<p>These are valuable on their own merits for any company operating in Argentina. They also happen to be the substrate any future AI-entity framework would build on. You can check where you stand against these in the <a href="/#ai">AI-entity readiness checker on our home page</a>.</p>

<h2>How to think about it as a founder</h2>

<p>Treat the AI-entity framework as an <em>option</em>, not a plan. Build a solid, compliant Argentine entity for reasons that stand up today — operating, exporting, hiring — and keep its structure current so you're positioned if the framework finalizes. Anyone promising to "register your AI company in Argentina now" is overselling: it isn't possible yet, and the framework's final shape is unknown. Readiness, not guarantees.</p>

<div class="faq-item">
<h3>Can I register an AI-run company in Argentina today?</h3>
<p>No. The "AI-entity" or non-human corporation is a proposed framework under discussion, not current law. You cannot register an AI-governed entity in Argentina today. What you can do is structure a conventional entity so you're ready to act if and when such a framework takes effect.</p>
</div>

<div class="faq-item">
<h3>What is a "non-human corporation"?</h3>
<p>It is shorthand for a proposed legal vehicle whose operations and governance could be run by an AI system, with rules addressing matters like the developer's liability. In Argentina it is a proposal tied to the broader deregulation agenda — not an existing, registrable structure.</p>
</div>

<div class="faq-item">
<h3>Why is Argentina associated with AI-company frameworks?</h3>
<p>Argentina's 2026 deregulation drive — it was the biggest improver in that year's economic-freedom index — and its appetite for business-forward frameworks have put ideas like an AI-entity on the public agenda, in contrast with more cautious regulation elsewhere. It remains a proposal, not law.</p>
</div>

<div class="faq-item">
<h3>How do I prepare for a possible AI-entity framework?</h3>
<p>Focus on readiness: a registered entity in good standing, clean corporate records, defined governance and signatories, and current tax and compliance. These help any operating company today and would be the foundation for registering under a future framework. Treat it as an option, not a guarantee.</p>
</div>
`,
  },
  {
    slug: "how-to-set-up-a-company-in-argentina",
    title: "How to Set Up a Company in Argentina as a Foreign Investor (2026 Guide)",
    metaDescription: "How to set up a company in Argentina as a foreign investor: SRL vs SA, IGJ registration, CUIT, and bank account — with real timelines (40–60 days) and costs (USD 2,500–5,800) for 2026.",
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
    metaDescription: "Employer of Record in Argentina: when it makes sense vs. your own entity. Cost comparison, legal risks, and the break-even point (4–5 employees). 2026 guide for foreign companies.",
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
    metaDescription: "Opening a corporate bank account in Argentina as a foreign company: which banks work (Galicia, HSBC, Santander), required documents, FX rules, and realistic timelines (15–60 days) in 2026.",
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
    metaDescription: "Hiring employees in Argentina as a foreign company: LCT labor law, employer payroll costs (~25% on top of salary), mandatory benefits (aguinaldo, obra social), and termination costs — 2026 guide.",
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
    metaDescription: "Argentina vs Brazil for LATAM business setup in 2026: talent cost (USD 2,500 vs 4,000+/mo), legal complexity, banking, and macro stability compared. Which market fits your operation.",
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
    metaDescription: "Nearshoring to Argentina in 2026: senior developers at USD 2,500–4,500/mo, UTC-3 timezone, high English proficiency. EOR vs entity, where to hire, and how to go from 0 to operating team in 45 days.",
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
  {
    slug: "vaca-muerta-foreign-investment-guide",
    title: "Vaca Muerta: The Complete Guide for Foreign Energy Companies (2026)",
    metaDescription: "How to invest in Vaca Muerta as a foreign company. Legal structure, concession process, local content requirements, and operational setup explained for 2026.",
    date: "2026-05-27",
    readingTime: "8 min read",
    category: "energy",
    excerpt: "Vaca Muerta is one of the world's largest unconventional hydrocarbon formations. Here's what foreign energy companies need to know before entering.",
    content: `
<p>Vaca Muerta — the massive shale formation spanning Neuquén, Río Negro, La Pampa, and Mendoza provinces — has transformed Argentina's energy outlook. With over 16 billion barrels of recoverable oil equivalent and some of the most productive unconventional wells in the world, it has attracted major operators including Shell, Total, ExxonMobil, and Equinor. For foreign energy companies evaluating entry, this is the operational reality in 2026.</p>

<h2>What Is Vaca Muerta, Actually?</h2>

<p>Vaca Muerta is a Jurassic-age shale formation approximately 30,000 km² in size, located primarily in Neuquén province. It is the second-largest shale gas formation and fourth-largest shale oil formation in the world by technically recoverable resources, according to the US Energy Information Administration.</p>

<p>Production has grown dramatically: Argentina produced roughly 650,000 barrels of oil per day in 2025, with Vaca Muerta accounting for the majority of unconventional output. Gas production from the formation is a key input for LNG export projects currently under development.</p>

<h2>Legal Framework for Foreign Investment</h2>

<h3>Hydrocarbon concessions</h3>
<p>Oil and gas resources in Argentina belong to the provinces where they are located (following the 1994 constitutional reform). Neuquén province grants and manages most Vaca Muerta concessions directly. The national government retains authority over international pipeline infrastructure and LNG export terminals.</p>

<p>Foreign companies can hold concessions directly or through an Argentine subsidiary. The typical structure:</p>
<ul>
  <li>A local SA (Sociedad Anónima) — required for most concession agreements</li>
  <li>The SA held wholly or partially by the foreign parent</li>
  <li>Joint Operating Agreements (JOAs) with local operators for initial entry</li>
</ul>

<h3>Concession types</h3>
<ul>
  <li><strong>Exploración convencional:</strong> Traditional exploration rights, granted by province, duration 3–7 years with extensions</li>
  <li><strong>Explotación no convencional:</strong> Unconventional production concessions, typically 25-year primary term with extensions. The dominant structure for Vaca Muerta</li>
  <li><strong>Piloto no convencional:</strong> Small-scale pilot concessions for new entrants to demonstrate technical capability before larger awards</li>
</ul>

<h3>National Law 17.319 (Hydrocarbons Law)</h3>
<p>Federal law governs the overall framework: royalties (typically 12% of wellhead value, negotiable up to 18%), repatriation of profits, and environmental obligations. Provincial agreements layer additional terms on top.</p>

<h2>Local Content Requirements</h2>

<p>Neuquén province imposes local content requirements that increase as operations scale. Key obligations:</p>
<ul>
  <li><strong>Local workforce:</strong> Minimum percentage of Neuquén province residents, graduating to national-level hiring requirements. Typically 70–80% of operational workforce must be Argentine nationals.</li>
  <li><strong>Local goods and services:</strong> Preference requirements for Argentine suppliers in procurement. This affects everything from catering to specialized equipment rental.</li>
  <li><strong>RENATRE registration:</strong> Rural workers in operations must be registered in the national agricultural worker registry if applicable.</li>
</ul>

<h2>Infrastructure: The Practical Reality</h2>

<p>Vaca Muerta's resource quality is world-class. Infrastructure is still catching up:</p>

<ul>
  <li><strong>Pipelines:</strong> The Néstor Kirchner Gas Pipeline (GNEA) opened in 2023 and dramatically increased takeaway capacity from Vaca Muerta to Buenos Aires province. Additional capacity expansions are under construction.</li>
  <li><strong>Water management:</strong> Hydraulic fracturing requires massive water volumes. Water sourcing, treatment, and disposal logistics are a major operational consideration in the high desert environment.</li>
  <li><strong>Roads and logistics:</strong> Access to remote pads requires coordination with provincial authorities. Oversize loads face permitting requirements.</li>
  <li><strong>Workforce accommodation:</strong> Most operators run camp-based operations. Neuquén city (Neuquén capital) is the primary services hub; Añelo is the boom town closest to the core of operations.</li>
</ul>

<h2>FX Considerations for Energy Companies</h2>

<p>Argentina's foreign exchange rules have historically complicated oil and gas operations. Key points for 2026:</p>

<ul>
  <li>Oil exports generate USD that must be settled through the official exchange market (MULC). Export retention taxes (<em>retenciones</em>) apply — rates vary and are politically sensitive.</li>
  <li>Companies with export income have negotiated special FX arrangements (RIGI — Régimen de Incentivo para Grandes Inversiones) for large projects. RIGI offers tax stability, FX access, and import duty benefits for qualifying investments above USD 200 million.</li>
  <li>Gas sold domestically is priced in USD but often settled in pesos at official rates. Domestic vs. export pricing strategy is a core commercial decision.</li>
</ul>

<h2>Entry Strategies for Foreign Companies</h2>

<h3>Farm-in with an existing operator</h3>
<p>The fastest entry route. Acquire a working interest in an existing concession from a current operator (YPF, Vista, Pampa Energía, or a major). You get proven acreage, existing infrastructure, and local operational capability while building your own team and relationships.</p>

<h3>JOA with YPF</h3>
<p>YPF, the state oil company, holds significant Vaca Muerta acreage and actively seeks partners for development. Joint development agreements with YPF provide access to their operational platform, but require navigating a state enterprise relationship with its associated complexity.</p>

<h3>Greenfield concession</h3>
<p>Bid for undeveloped acreage directly from Neuquén province. Slower entry (bidding process, pilot concession phase) but full ownership of the opportunity. Better suited to companies with existing Argentine presence and operational credibility.</p>

<h2>Frequently Asked Questions</h2>

<div class="faq-item">
  <h3>Do I need an Argentine partner to operate in Vaca Muerta?</h3>
  <p>Not legally required in most cases — foreign companies can hold concessions through a wholly-owned Argentine SA. In practice, having a local operating partner (through a JOA) significantly accelerates entry and reduces regulatory risk, especially for new entrants without established Argentine government relationships.</p>
</div>

<div class="faq-item">
  <h3>What are the environmental permitting requirements?</h3>
  <p>Environmental impact assessments (EIA) are required at both provincial and national levels before drilling. Neuquén's Secretaría de Ambiente manages provincial permits. The process typically takes 3–6 months for initial well programs. Community consultation with indigenous Mapuche communities is legally required for concessions overlapping with traditional territories.</p>
</div>

<div class="faq-item">
  <h3>How stable is the regulatory framework for Vaca Muerta investment?</h3>
  <p>More stable than Argentina's macro environment in general. Energy investment involves long-term commitments that no government — regardless of political orientation — can afford to unilaterally undermine. The RIGI regime specifically aims to provide legal stability guarantees for large investments. That said, export taxes and royalty rates have historically been subject to adjustment. Stress-test your models across a range of fiscal scenarios.</p>
</div>
    `,
  },

  {
    slug: "lithium-argentina-investment-guide",
    title: "Lithium in Argentina: Investment Guide for Foreign Mining Companies (2026)",
    metaDescription: "Argentina holds the world's second-largest lithium reserves. How to invest in Argentine lithium in 2026: legal framework, provinces, concession process, and operational setup.",
    date: "2026-05-28",
    readingTime: "7 min read",
    category: "energy",
    excerpt: "Argentina sits atop the Lithium Triangle with some of the world's largest and highest-quality deposits. Here's the operational guide for foreign investors.",
    content: `
<p>Argentina holds approximately 22% of the world's lithium reserves, concentrated in the high-altitude salt flats (salares) of Jujuy, Salta, and Catamarca provinces — the northern portion of the Lithium Triangle it shares with Chile and Bolivia. With global demand for battery-grade lithium carbonate and lithium hydroxide accelerating through the energy transition, Argentina has become one of the most competitive lithium investment destinations in the world.</p>

<p>This guide covers what foreign mining companies and battery supply chain operators need to know before entering the Argentine lithium market in 2026.</p>

<h2>Argentina's Lithium Resources: The Basics</h2>

<p>Argentina's lithium is predominantly brine-hosted — dissolved in subsurface brines beneath the salt flats, rather than in hard rock (spodumene) deposits as in Australia. Brine operations have lower capital costs than hard rock mining but require careful management of evaporation ponds and water resources.</p>

<p>Key producing and development assets:</p>
<ul>
  <li><strong>Salar de Olaroz (Jujuy):</strong> Operated by Lithium Americas and Allkem (now Rio Tinto post-merger). One of the first commercial lithium carbonate operations in Argentina.</li>
  <li><strong>Salar del Hombre Muerto (Catamarca):</strong> POSCO's major lithium project, producing lithium carbonate for Korean battery supply chains.</li>
  <li><strong>Cauchari-Olaroz (Jujuy):</strong> Lithium Americas' main Argentine project, now in production ramp-up.</li>
  <li><strong>Sal de Vida (Catamarca):</strong> Allkem project, in development phase.</li>
</ul>

<h2>Legal Framework for Mining in Argentina</h2>

<h3>Provincial ownership</h3>
<p>Like hydrocarbons, mineral resources in Argentina belong to the provinces where they are located. The federal Mining Code (Código de Minería) sets the national framework, but concessions are granted and regulated at the provincial level. This means dealing with three different regulators (Jujuy, Salta, Catamarca) if you have assets across provinces.</p>

<h3>Mining concession types</h3>
<ul>
  <li><strong>Cateo (exploration permit):</strong> Initial exploration rights, typically 1–3 years, renewable. Grants the right to explore but not extract.</li>
  <li><strong>Concesión de explotación:</strong> Production concession, indefinite duration as long as the mine is operating and obligations are met. The core operating right.</li>
  <li><strong>Concesión de beneficio:</strong> Processing plant concession, separate from the mining concession.</li>
</ul>

<h3>RIGI for large mining projects</h3>
<p>Argentina's RIGI (Régimen de Incentivo para Grandes Inversiones) framework, enacted in 2024, applies to mining projects with investments above USD 200 million. Benefits include:</p>
<ul>
  <li>30-year fiscal stability guarantee</li>
  <li>Reduced export taxes (3% for years 1–5, phasing down to 0%)</li>
  <li>Full FX freedom for export proceeds after year 3</li>
  <li>Accelerated depreciation for capital investments</li>
</ul>
<p>RIGI has significantly improved the investment calculus for large lithium projects. Most major development-stage projects are structuring under RIGI.</p>

<h2>Royalties and Taxation</h2>

<table>
  <thead><tr><th>Charge</th><th>Rate</th><th>Authority</th></tr></thead>
  <tbody>
    <tr><td>Provincial royalty</td><td>3% of mine mouth value (federal cap; provinces may go lower)</td><td>Province</td></tr>
    <tr><td>Export retenciones</td><td>Varies (reduced under RIGI)</td><td>National</td></tr>
    <tr><td>Corporate income tax</td><td>35% (25% for RIGI participants)</td><td>National (AFIP)</td></tr>
    <tr><td>Gross revenue tax (IIBB)</td><td>~1.5–3% depending on province and activity</td><td>Province</td></tr>
  </tbody>
</table>

<h2>Operational Setup: What Foreign Companies Need on the Ground</h2>

<h3>Local entity</h3>
<p>An Argentine SA is the standard structure for mining operations. The SA holds the mining concessions, employs the local workforce, and is the contracting party with provincial authorities. Foreign ownership of the SA can be 100%.</p>

<h3>Workforce and local content</h3>
<p>All three main lithium provinces have local content expectations. Workforce requirements typically mandate hiring from local communities, particularly indigenous Kolla and Atacameño communities near the salt flats. Community benefit agreements are increasingly expected even where not legally mandated.</p>

<h3>Water rights</h3>
<p>Lithium brine extraction involves water management in an arid, high-altitude ecosystem. Water rights (concesiones de aguas) are separate from mining concessions and are managed by provincial water authorities. Environmental impact on freshwater aquifers and local water supplies is the single largest community and regulatory risk for new projects.</p>

<h3>Infrastructure and logistics</h3>
<p>The salt flats are at 3,500–4,000 meters altitude. Access roads are often unpaved; winter weather can close them. Most projects transport product by road to Jujuy, Salta, or Catamarca cities for processing, then by rail or road to ports (primarily Antofagasta in Chile or ports in northern Argentina). Logistics planning is a major capital cost.</p>

<h2>Community and Indigenous Rights</h2>

<p>Argentina's Constitution (Article 75.17) and ILO Convention 169 require free, prior, and informed consent (FPIC) from indigenous communities before activities on traditional territories. The salt flats overlap with territories of Kolla, Atacameño, and other communities.</p>

<p>FPIC is not just a legal formality — it is a project risk. Operations that have failed to build genuine community relationships have faced protests, road blockades, and regulatory delays. The companies succeeding in Argentine lithium in 2026 have community relations programs that started before exploration, not after.</p>

<h2>Frequently Asked Questions</h2>

<div class="faq-item">
  <h3>Can a foreign company hold Argentine mining concessions directly?</h3>
  <p>Through a wholly-owned Argentine SA, yes. The SA must be registered in the province where the concession is located. Some provinces have additional local-presence requirements for concession holders.</p>
</div>

<div class="faq-item">
  <h3>How long does it take to go from exploration to production for a lithium brine project?</h3>
  <p>Realistically 7–12 years from initial exploration to commercial production. This includes: 2–3 years of resource definition drilling, 1–2 years of pilot plant operation (required by most provinces), 2–3 years of feasibility study and permitting, 2–3 years of construction. Projects with existing resource definition can compress this timeline.</p>
</div>

<div class="faq-item">
  <h3>Is there a risk of lithium nationalization in Argentina?</h3>
  <p>It's a question investors ask. The honest answer: there is no credible nationalization risk for existing private operations under current or foreseeable Argentine governments. The country needs foreign capital and technology that it cannot replicate with state resources alone. YPF's 2012 renationalization was a specific political event driven by fuel supply crisis — not a template for mining. That said, export tax and royalty risk is real and should be stress-tested in project economics.</p>
</div>
    `,
  },

  {
    slug: "common-mistakes-expanding-to-argentina",
    title: "7 Mistakes Foreign Companies Make When Expanding to Argentina (And How to Avoid Them)",
    metaDescription: "The most common and costly mistakes foreign companies make when entering Argentina — from underestimating banking timelines to misclassifying contractors. Practical lessons for 2026.",
    date: "2026-05-29",
    readingTime: "6 min read",
    category: "strategy",
    excerpt: "Argentina punishes the underprepared and rewards those who understand how it actually works. Here are the mistakes we see most often — and how to avoid them.",
    content: `
<p>Argentina has genuine advantages for foreign companies: world-class talent, natural resources, a large domestic market, and a time zone that works for both the Americas and Europe. It also has a regulatory environment, FX system, and labor framework that can create expensive surprises for companies that approach it like any other market.</p>

<p>These are the mistakes we see most often — and what to do instead.</p>

<h2>1. Underestimating the Banking Timeline</h2>

<p><strong>What happens:</strong> A company incorporates in 35 days, gets its CUIT, and then waits 60+ additional days to open a bank account. Operations stall. Payroll can't be run. Local suppliers can't be paid.</p>

<p><strong>Why it happens:</strong> Foreign companies plan around incorporation time (which is predictable) without accounting for banking time (which depends on relationships and documentation completeness).</p>

<p><strong>What to do instead:</strong> Start the bank relationship before incorporation if possible. Engage a local firm with existing bank contacts. Have all home-country documents apostilled before you need them. Plan for 45–60 days from CUIT to operational bank account as your baseline assumption.</p>

<h2>2. Misclassifying Employees as Contractors</h2>

<p><strong>What happens:</strong> A foreign company hires Argentine talent as "independent contractors" to avoid labor law obligations. After 12–18 months, the worker files a labor claim. A court finds an employment relationship and awards retroactive benefits: severance, unpaid social security contributions, aguinaldo, vacation pay — often 2–3× the worker's annual salary.</p>

<p><strong>Why it happens:</strong> The setup is cheaper in the short term. And Argentine contractors often prefer the arrangement (higher gross pay, USD-denominated). But Argentine labor law looks at substance, not labels. Regular hours + supervision + exclusivity = employment, regardless of what the contract says.</p>

<p><strong>What to do instead:</strong> Use an Employer of Record for genuine employees. Reserve contractor arrangements for genuinely project-based, non-exclusive work. When in doubt, structure as employment. The cost difference is much smaller than the misclassification liability.</p>

<h2>3. Treating FX as a Static Variable</h2>

<p><strong>What happens:</strong> A company builds its Argentina P&L assuming a fixed ARS/USD rate. The rate moves — as it does, repeatedly, in Argentina. Peso-denominated costs suddenly look different in dollar terms. Pricing that made sense at one rate doesn't work at another.</p>

<p><strong>Why it happens:</strong> Finance teams model it like they would a stable currency market. Argentina is not a stable currency market.</p>

<p><strong>What to do instead:</strong> Build your Argentina financials with multiple FX scenarios (base, stress, severe). Denominate contracts with international counterparties in USD. Have a clear treasury policy for ARS — minimize peso holding to operating float. Work with a local accountant who specializes in FX planning from day one, not year two.</p>

<h2>4. Using a Single Vendor for Setup</h2>

<p><strong>What happens:</strong> A company hires one Argentine law firm to "handle everything." The firm incorporates the entity — and then stops, because that's what they do. Banking, accounting setup, HR, and payroll fall into a vacuum. Three vendors are engaged sequentially, each requiring its own onboarding, and the setup takes six months instead of two.</p>

<p><strong>Why it happens:</strong> In most markets, a good law firm handles the full formation process. In Argentina, specialization is deep and referrals between service providers are not automatic.</p>

<p><strong>What to do instead:</strong> Engage a single project coordinator who manages the whole formation process — legal, banking, and accounting — with established working relationships across all three. The coordinator model saves 4–8 weeks and eliminates the gap between steps.</p>

<h2>5. Ignoring Beneficial Ownership Filings</h2>

<p><strong>What happens:</strong> The company incorporates, gets its CUIT, opens a bank account — and six months later receives a notice from AFIP that beneficial ownership (beneficiario final) filings are incomplete. Bank account access is restricted until resolved. Resolution takes weeks.</p>

<p><strong>Why it happens:</strong> UBO disclosure is a global requirement that companies know about — but Argentina's specific filing requirements (form, timing, and who counts as a UBO under Argentine rules) are easy to get wrong without local expertise.</p>

<p><strong>What to do instead:</strong> Do the beneficial ownership analysis before incorporation, not after. Argentina defines UBO as anyone with direct or indirect ownership above 10% or effective control — the threshold is lower than many jurisdictions. File correctly with both AFIP and the IGJ at formation.</p>

<h2>6. Not Planning for Termination Costs Upfront</h2>

<p><strong>What happens:</strong> A company hires a team of 5 people in Argentina, the project pivots, and 18 months later they need to let the team go. The termination bill — severance × 5 employees × 1.5 years of seniority, plus notice periods and accruals — is far larger than anyone budgeted. It becomes a crisis.</p>

<p><strong>Why it happens:</strong> Termination costs are modeled as a hypothetical that won't apply to us. Argentine labor law does not share this optimism.</p>

<p><strong>What to do instead:</strong> Budget termination costs as a line item in your Argentina financial model from day one. For every hire, calculate what it costs to exit them cleanly in 12 months, 24 months, 36 months. This is not pessimism — it's the cost of doing business, and it's knowable in advance.</p>

<h2>7. Treating Argentina as a Cost Play Only</h2>

<p><strong>What happens:</strong> A company enters Argentina purely for cost arbitrage — cheap developers, cheap energy. When the peso devalues and the cost advantage shrinks, or when operational complexity increases, the entire Argentina rationale evaporates. The company exits badly.</p>

<p><strong>Why it happens:</strong> The initial pitch is compelling: 60–70% cost savings vs. US talent. But cost plays without strategic depth don't survive volatility.</p>

<p><strong>What to do instead:</strong> Layer a strategic rationale on top of cost. Argentina's tech talent is not just cheap — it's genuinely good and experienced with global work. Argentina's energy resources are world-class, not just price-competitive. Build an Argentina strategy that survives a 30% reduction in the cost advantage and still makes sense.</p>

<h2>Frequently Asked Questions</h2>

<div class="faq-item">
  <h3>Is Argentina too risky for serious foreign investment?</h3>
  <p>Plenty of global companies have operated successfully in Argentina for decades — Unilever, Google, Mercado Libre, Shell, Total. The risk is real and manageable. The companies that fail in Argentina almost always do so for operational reasons (the mistakes above), not because Argentina is inherently uninvestable.</p>
</div>

<div class="faq-item">
  <h3>What's the single most important thing to get right when entering Argentina?</h3>
  <p>Local relationships. Banking works through relationships. Regulatory issues are resolved through relationships. Hiring happens through networks. The fastest path into Argentina is through people who already know how it works — not through trying to figure it out from scratch.</p>
</div>
    `,
  },

  {
    slug: "latam-expansion-argentina-chile-colombia-mexico",
    title: "LATAM Expansion: Argentina, Chile, Colombia, or Mexico? A 2026 Comparison",
    metaDescription: "Comparing Argentina, Chile, Colombia, and Mexico for LATAM business expansion in 2026. Talent cost, legal complexity, market size, and stability compared for foreign companies.",
    date: "2026-05-30",
    readingTime: "7 min read",
    category: "strategy",
    excerpt: "Four serious LATAM markets, four very different risk-reward profiles. Here's how to choose based on what you're actually building.",
    content: `
<p>When a foreign company decides to expand into Latin America, the conversation usually narrows to four markets: Argentina, Chile, Colombia, and Mexico. Each has real advantages. Each has real constraints. The right answer depends almost entirely on what you're building, who you're hiring, and where your revenue comes from.</p>

<p>This is a practical comparison — not a pitch for any single market.</p>

<h2>At a Glance</h2>

<table>
  <thead>
    <tr><th>Factor</th><th>Argentina</th><th>Chile</th><th>Colombia</th><th>Mexico</th></tr>
  </thead>
  <tbody>
    <tr><td>Population</td><td>46M</td><td>19M</td><td>52M</td><td>130M</td></tr>
    <tr><td>GDP (USD, 2025)</td><td>~650B</td><td>~330B</td><td>~420B</td><td>~1.5T</td></tr>
    <tr><td>Tech talent cost (senior eng)</td><td>USD 2,500–4,500/mo</td><td>USD 4,000–7,000/mo</td><td>USD 2,500–4,500/mo</td><td>USD 3,500–6,000/mo</td></tr>
    <tr><td>English proficiency</td><td>High</td><td>Medium</td><td>Medium</td><td>Low–Medium</td></tr>
    <tr><td>Entity setup time</td><td>40–60 days</td><td>5–15 days</td><td>15–30 days</td><td>20–40 days</td></tr>
    <tr><td>Macro stability</td><td>Low</td><td>High</td><td>Medium</td><td>Medium</td></tr>
    <tr><td>FX complexity</td><td>High</td><td>Low</td><td>Low</td><td>Low</td></tr>
  </tbody>
</table>

<h2>Argentina</h2>

<h3>Where Argentina wins</h3>
<p>Talent quality per dollar is Argentina's defining advantage. Buenos Aires has a dense ecosystem of engineers, designers, finance professionals, and legal talent with extensive global work experience. English proficiency is the highest in the region among skilled professionals. Timezone (UTC-3) aligns well with both US and European business hours.</p>

<p>For companies with USD revenue and local-currency costs, Argentina's macroeconomic instability works in their favor — peso depreciation means dollar-denominated costs become more competitive over time.</p>

<p>Natural resources (Vaca Muerta, lithium, agriculture) make it the only serious LATAM option for energy and mining investment.</p>

<h3>Where Argentina loses</h3>
<p>FX complexity, banking friction, and labor law compliance overhead are genuine costs. Political and economic volatility is real. Entity setup and banking take longer than Chile or Colombia. For companies with significant peso-denominated revenue, the FX environment is a constant management challenge.</p>

<h2>Chile</h2>

<h3>Where Chile wins</h3>
<p>Chile is the easiest place to do business in Latin America, full stop. Entity setup in 5–15 days. Straightforward banking. No FX controls. A legal system with a track record of respecting property rights and contracts. If operational simplicity is your primary criterion, Chile wins.</p>

<p>Santiago is also the most established LATAM headquarters city for multinationals — many regional functions for LATAM operations run out of Chile precisely because of this stability.</p>

<h3>Where Chile loses</h3>
<p>Cost. Chilean tech talent costs 40–60% more than Argentine in dollar terms. The domestic market is small (19M people). And while political stability has improved post-2022, the period of constitutional uncertainty created some caution among long-term investors.</p>

<h2>Colombia</h2>

<h3>Where Colombia wins</h3>
<p>Colombia has become a serious tech hub, particularly Medellín and Bogotá. Talent costs are comparable to Argentina. The country has made significant improvements in security and business environment over the past decade. For companies targeting Spanish-speaking Latin American consumers, Colombia's central geography and growing middle class make it compelling.</p>

<p>Nearshoring to the US is a growing industry — Colombia is 1 hour ahead of Eastern time and has invested significantly in tech education.</p>

<h3>Where Colombia loses</h3>
<p>Security remains uneven outside major cities. Political risk has increased in recent years. English proficiency among tech talent is lower than Argentina. Infrastructure outside Bogotá and Medellín is less developed.</p>

<h2>Mexico</h2>

<h3>Where Mexico wins</h3>
<p>Scale and proximity to the US are Mexico's defining advantages. At 130M people, it has the largest domestic consumer market in Latin America. It shares a border with the US and is in the same or adjacent time zones. The USMCA (successor to NAFTA) makes Mexico uniquely positioned for US companies building integrated North American operations.</p>

<p>Nearshoring to the US has accelerated dramatically since 2022 as companies relocate manufacturing from Asia. Mexico is the primary beneficiary of this trend — particularly Monterrey, Guadalajara, and the border cities.</p>

<h3>Where Mexico loses</h3>
<p>Security is a genuine business risk in many regions. English proficiency is lower than Argentina or Chile. For pure tech talent on a cost-per-quality basis, Argentina competes well with Mexico. And for European companies, Mexico's UTC-6/7 timezone creates more friction than Argentina's UTC-3.</p>

<h2>How to Choose: Decision Framework</h2>

<table>
  <thead><tr><th>If you're building…</th><th>Consider</th></tr></thead>
  <tbody>
    <tr><td>Tech nearshoring team (USD revenue, EN-speaking)</td><td>Argentina first, Colombia second</td></tr>
    <tr><td>LATAM regional HQ (ES/PT markets)</td><td>Chile (stability) or Colombia (geography)</td></tr>
    <tr><td>Energy or mining operation</td><td>Argentina (resources) or Chile (copper, lithium)</td></tr>
    <tr><td>North American manufacturing nearshoring</td><td>Mexico, clearly</td></tr>
    <tr><td>Consumer product targeting LATAM broadly</td><td>Mexico (scale) or Colombia (growth)</td></tr>
    <tr><td>Shared services center (EN/ES)</td><td>Argentina or Colombia</td></tr>
    <tr><td>Lowest-risk, simplest setup</td><td>Chile</td></tr>
  </tbody>
</table>

<h2>The Multi-Country Play</h2>

<p>Many mature multinationals run LATAM operations across multiple markets simultaneously. The common pattern:</p>
<ol>
  <li><strong>Argentina</strong> for tech and talent (cost + quality)</li>
  <li><strong>Chile</strong> for regional HQ (stability, legal framework)</li>
  <li><strong>Mexico</strong> for the North American-adjacent market and manufacturing</li>
  <li><strong>Colombia</strong> added when the Andean/Caribbean market justifies a local presence</li>
</ol>

<p>Sequencing matters more than simultaneity. Pick the market where your first 12 months of Latin America operations create the most value — and build from there.</p>

<h2>Frequently Asked Questions</h2>

<div class="faq-item">
  <h3>Can I run LATAM operations out of Argentina if the entity is registered in Chile?</h3>
  <p>You can have your legal entity in Chile and employ people in Argentina through an EOR. Many companies do this — Chile entity for regional contracting and stability, Argentine EOR for the talent base. It adds a layer of complexity but can make sense for the first 12–18 months before the Argentine operation justifies its own entity.</p>
</div>

<div class="faq-item">
  <h3>Is nearshoring to Argentina or Colombia better for a US-based tech company?</h3>
  <p>Argentina, for most cases. English proficiency is higher, the talent ecosystem is denser for mid-to-senior roles, and Buenos Aires has a longer track record of global remote work. Colombia is catching up fast and makes sense if you want geographic diversification or are already building a Colombian team for other reasons.</p>
</div>

<div class="faq-item">
  <h3>How do I decide without a research trip to each country?</h3>
  <p>Start with the decision framework above: match your operation type to the market profile. Then talk to 3–5 companies that have already made the decision you're considering — not consultants, but operators. Their experience is more valuable than any market report. A 30-minute discovery call with someone who built an Argentine or Colombian team 18 months ago tells you more than a 40-page whitepaper.</p>
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
