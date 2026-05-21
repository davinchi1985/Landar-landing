import Link from "next/link";
import { posts } from "../lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Landar | Argentina Market Entry Guides",
  description: "Practical guides for foreign companies setting up operations in Argentina. Entity setup, banking, hiring, and compliance — no fluff.",
};

const categoryLabel: Record<string, string> = {
  legal: "Legal & Entity",
  banking: "Banking",
  hiring: "Hiring & HR",
  energy: "Energy",
  strategy: "Strategy",
};

export default function BlogIndex() {
  return (
    <div className="blog-shell">
      <div className="wrap">
        <header className="blog-header">
          <Link href="/" className="blog-back">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="14" height="14">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Land·AR
          </Link>
          <h1>Argentina Market Entry — Field Guides</h1>
          <p>Practical articles for foreign companies setting up operations in Argentina. Written for decision-makers, not lawyers.</p>
        </header>

        <div className="post-grid">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="post-card">
              <div className="post-meta-top">
                <span className="post-category">{categoryLabel[post.category]}</span>
                <span className="post-read">{post.readingTime}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <div className="post-cta">Read guide →</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
