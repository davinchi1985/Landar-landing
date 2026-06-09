import Link from "next/link";
import { posts } from "../lib/posts";
import { SITE_NAME } from "../lib/site";
import type { Metadata } from "next";

const BLOG_TITLE = "Argentina Market Entry Guides";
const BLOG_DESC = "Practical guides for foreign companies setting up operations in Argentina. Entity setup, banking, hiring, and compliance — no fluff.";

export const metadata: Metadata = {
  title: BLOG_TITLE,
  description: BLOG_DESC,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `${BLOG_TITLE} | ${SITE_NAME}`,
    description: BLOG_DESC,
    type: "website",
    url: "/blog",
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BLOG_TITLE} | ${SITE_NAME}`,
    description: BLOG_DESC,
  },
};

const categoryLabel: Record<string, string> = {
  legal: "Entity & legal",
  banking: "Banking",
  hiring: "Hiring & HR",
  energy: "Energy",
  strategy: "Strategy",
};

function BlogNav() {
  return (
    <header className="nav is-stuck">
      <div className="nav__inner">
        <Link className="logo" href="/" aria-label="Inteligenci·AR — home">
          <svg viewBox="0 0 26 26" className="logo__mark" aria-hidden="true">
            <rect width="26" height="26" rx="7" fill="#1C1B17" />
            <path d="M5.5 7.5 Q13 13.5 13 17.8" fill="none" stroke="#C9613D" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
            <path d="M20.5 7.5 Q13 13.5 13 17.8" fill="none" stroke="#C9613D" strokeWidth="1.4" strokeLinecap="round" opacity="0.85" />
            <path d="M13 4.6 Q13 11 13 17.8" fill="none" stroke="#C9613D" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
            <circle cx="13" cy="18" r="2.1" fill="#C9613D" />
          </svg>
          <span className="logo__word">Inteligenci<span className="ar">·AR</span></span>
        </Link>
        <div className="nav__right">
          <Link className="link" href="/oportunidades">Radar</Link>
          <a className="btn btn--primary" href="/#contact">Get in touch</a>
        </div>
      </div>
    </header>
  );
}

export default function BlogIndex() {
  const [featured, ...rest] = posts;
  return (
    <>
      <BlogNav />
      <main className="wrap blog-head">
        <div className="blog-head__inner">
          <span className="eyebrow">The Inteligenci·AR Journal</span>
          <h1>Operating in Argentina, explained.</h1>
          <p className="lede">Practical guides for foreign companies setting up operations in Argentina — entity, banking, hiring and compliance. Written for decision-makers, not lawyers.</p>
        </div>
      </main>

      <section className="wrap">
        {featured && (
          <article className="featured">
            <div className="featured__media" style={{ background: "var(--accent-tint)" }} />
            <div className="featured__body">
              <span className="featured__eyebrow">{categoryLabel[featured.category]}</span>
              <h2><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2>
              <p className="excerpt">{featured.excerpt}</p>
              <div className="post-meta">
                <span>{featured.readingTime}</span><span className="dot-sep" /><span>{featured.date}</span>
              </div>
            </div>
          </article>
        )}

        <div className="post-grid">
          {rest.map((post) => (
            <article className="post-card" key={post.slug}>
              <span className="post-card__cat">{categoryLabel[post.category]}</span>
              <h3 className="post-card__title"><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
              <p className="post-card__excerpt">{post.excerpt}</p>
              <div className="post-meta">
                <span>{post.readingTime}</span><span className="dot-sep" /><span>{post.date}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div style={{ height: "clamp(3rem,7vw,6rem)" }} />
    </>
  );
}
