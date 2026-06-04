import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getAllSlugs } from "../../lib/posts";
import { SITE_URL } from "../../lib/site";
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
      siteName: "Landar",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

function buildJsonLd(post: NonNullable<ReturnType<typeof getPost>>, slug: string) {
  const baseUrl = SITE_URL;

  // Extract FAQ items from content (matches <div class="faq-item"><h3>Q</h3><p>A</p></div>)
  const faqMatches = [...post.content.matchAll(/<div class="faq-item">\s*<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>\s*<\/div>/g)];
  const faqEntities = faqMatches.map((m) => ({
    "@type": "Question",
    name: m[1].replace(/<[^>]+>/g, "").trim(),
    acceptedAnswer: {
      "@type": "Answer",
      text: m[2].replace(/<[^>]+>/g, "").trim(),
    },
  }));

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Landar",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Landar",
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

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntities,
  };

  return [article, breadcrumb, faqPage];
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const categoryLabel: Record<string, string> = {
    legal: "Legal & Entity",
    banking: "Banking",
    hiring: "Hiring & HR",
    energy: "Energy",
    strategy: "Strategy",
  };

  const jsonLd = buildJsonLd(post, slug);

  return (
    <div className="blog-shell">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="wrap">
        <nav className="post-nav">
          <Link href="/blog" className="blog-back">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="14" height="14">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All guides
          </Link>
        </nav>

        <article className="post-article">
          <header className="post-article-header">
            <div className="post-meta-top">
              <span className="post-category">{categoryLabel[post.category]}</span>
              <span className="post-read">{post.readingTime}</span>
              <span className="post-date">{post.date}</span>
            </div>
            <h1>{post.title}</h1>
            <p className="post-excerpt">{post.excerpt}</p>
          </header>

          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />

          <footer className="post-footer">
            <div className="post-cta-box">
              <h3>Need help setting up operations in Argentina?</h3>
              <p>Landar handles entity setup, banking, accounting, and hiring — one project lead, one timeline.</p>
              <a
                href="https://calendly.com/davinchicohen/30min"
                target="_blank"
                rel="noopener"
                className="btn btn-primary btn-lg"
              >
                Book a 30-min call →
              </a>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
