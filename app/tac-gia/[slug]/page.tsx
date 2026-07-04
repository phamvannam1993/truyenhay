import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DirectoryHero } from "@/components/DirectoryHero";
import { authorPages, getAuthorPage } from "@/lib/data";
import { createMetadata, JsonLd } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return authorPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getAuthorPage(slug);
  if (!page) return {};
  return createMetadata({
    title: `Tác giả ${page.title} - Hồ sơ & truyện liên quan`,
    description: page.description,
    path: page.path,
    keywords: [page.title, "tác giả truyện", "hồ sơ tác giả"],
    noIndex: !page.seoReady,
  });
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getAuthorPage(slug);
  if (!page) {
    notFound();
    return null;
  }

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        name: `Tác giả ${page.title}`,
        description: page.description,
      }} />
      <DirectoryHero page={page} breadcrumbLabel="Tác giả" />
      <section className="section">
        <div className="container narrow content-card">
          {page.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p>
            Khi có dữ liệu thật, hãy nối tác giả với các truyện trong CMS và bật <code>seoReady: true</code> để đưa trang vào sitemap.
          </p>
        </div>
      </section>
    </>
  );
}
