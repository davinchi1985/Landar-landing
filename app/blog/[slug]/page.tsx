import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getAllSlugs } from "../../lib/posts";
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
    },
  };
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

  return (
    <div className="blog-shell">
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
