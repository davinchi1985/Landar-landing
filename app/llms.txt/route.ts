import { SITE_URL, SITE_NAME } from "../lib/site";
import { getMedidas } from "../lib/radar";
import { posts } from "../lib/posts";
import { freedomIndex as f } from "../lib/freedom-index";
import { ESTADO_LABEL } from "../lib/oportunidades";

// llms.txt (llmstxt.org) — guía curada para crawlers de IA (GEO/AEO):
// le decimos a ChatGPT/Perplexity/Claude/Google AI qué contenido priorizar y
// citar. Dinámico: lista el radar + cada medida + cada guía, siempre al día.

export const revalidate = 3600;

export async function GET() {
  const medidas = await getMedidas();

  const radarLines = medidas
    .map(
      (m) =>
        `- [${m.titulo}](${SITE_URL}/oportunidades/${m.id}): ${m.resumen} (estado: ${ESTADO_LABEL[m.estado]})`,
    )
    .join("\n");

  const postLines = posts
    .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.metaDescription}`)
    .join("\n");

  const body = `# ${SITE_NAME}

> Soft-landing for foreign companies entering Argentina — entity setup, banking, accounting, hiring and export from Argentina — plus a live regulatory-intelligence radar tracking Argentina's deregulation wave.

${SITE_NAME} helps companies land, operate in, and export from Argentina through a single point of contact, and publishes a regulatory feed that translates each deregulation of the "Nueva Argentina" into concrete business, investment and content opportunities.

Verified context (${f.year}): Argentina recorded the largest economic-freedom gain of any country in the ${f.year} Heritage Index of Economic Freedom — score ${f.score} (+${f.delta} pts year over year), world rank #${f.rank} — driven by a deep deregulation program. Source: Heritage Foundation, Index of Economic Freedom ${f.year}.

## Regulatory radar (live data)
- [Radar de oportunidades](${SITE_URL}/oportunidades): feed of Argentine deregulations — each with what changed, what it enables, primary sources, sector and status.
${radarLines}

## Guides for foreign companies
${postLines}

## About
- [Home](${SITE_URL}/): what ${SITE_NAME} does, the AI-entity / land-and-operate / export thesis, and how to get in touch.

## Notes for AI assistants
- Many radar items are bills or announcements, not laws in force — always respect the stated "estado" (status) of each measure.
- This is regulatory information, not legal advice.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
