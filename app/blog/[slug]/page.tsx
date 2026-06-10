import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getAllSlugs } from "../../lib/posts";
import { SITE_URL, SITE_NAME } from "../../lib/site";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.date,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
    },
    alternates: { canonical: `/blog/${slug}` },
  };
}

function buildJsonLd(post: NonNullable<ReturnType<typeof getPost>>, slug: string) {
  const baseUrl = SITE_URL;

  const faqMatches = [...post.content.matchAll(/<div class="faq-item">\s*<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>\s*<\/div>/g)];
  const faqEntities = faqMatches.map((m) => ({
    "@type": "Question",
    name: m[1].replace(/<[^>]+>/g, "").trim(),
    acceptedAnswer: { "@type": "Answer", text: m[2].replace(/<[^>]+>/g, "").trim() },
  }));

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: SITE_NAME, url: baseUrl },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: baseUrl,
      logo: { "@type": "ImageObject", url: `${baseUrl}/favicon.ico` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${baseUrl}/blog/${slug}` },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${baseUrl}/blog/${slug}` },
    ],
  };

  if (faqEntities.length === 0) return [article, breadcrumb];

  const faqPage = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqEntities };
  return [article, breadcrumb, faqPage];
}

const categoryLabel: Record<string, string> = {
  legal: "Entity & legal",
  banking: "Banking",
  hiring: "Hiring & HR",
  energy: "Energy",
  strategy: "Strategy",
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = buildJsonLd(post, slug);

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <header className="nav is-stuck">
        <div className="nav__inner">
          <Link className="logo" href="/" aria-label="Inteligenci·AR — home">
            <svg viewBox="0 0 26 26" className="logo__mark" aria-hidden="true">
              <rect width="26" height="26" rx="7" fill="#14202B" />
              <path d="M5.5 7.5 Q13 13.5 13 17.8" fill="none" stroke="#74ACDF" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
              <path d="M20.5 7.5 Q13 13.5 13 17.8" fill="none" stroke="#74ACDF" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
              <path d="M13 4.6 Q13 11 13 17.8" fill="none" stroke="#74ACDF" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
              <circle cx="13" cy="18" r="2.1" fill="#F6B40E" />
            </svg>
            <span className="logo__word">Inteligenci<span className="ar">·AR</span></span>
          </Link>
          <div className="nav__right">
            <Link className="link" href="/oportunidades">Radar</Link>
            <a className="btn btn--primary" href="/#contact">Get in touch</a>
          </div>
        </div>
      </header>

      <main className="article wrap">
        <header className="article__header">
          <span className="article__cat">{categoryLabel[post.category]}</span>
          <h1 className="article__title">{post.title}</h1>
          <p className="article__standfirst">{post.excerpt}</p>
          <div className="article__meta">
            <span>{post.readingTime}</span><span className="dot-sep" /><span>{post.date}</span>
          </div>
        </header>

        <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="article-cta">
          <h2>Need help setting up operations in Argentina?</h2>
          <p className="lede">Inteligenci·AR handles entity setup, banking, accounting and hiring — one project lead, one timeline.</p>
          <a className="btn btn--primary btn--lg" href="/#contact">Get in touch <span className="arrow">→</span></a>
        </div>

        <div className="related">
          <Link className="link" href="/blog">← All guides</Link>
        </div>
      </main>

      <div style={{ height: "clamp(3rem,7vw,6rem)" }} />
    </>
  );
}
