import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getChapterPage, stories } from "@/lib/data";
import { articleJsonLd, breadcrumbJsonLd, createMetadata, JsonLd } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string; chapter: string }> };

export const dynamicParams = true;

export function generateStaticParams() {
  return stories.flatMap((story) => story.chapters.map((chapter) => ({ slug: story.slug, chapter: `chuong-${chapter}` })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, chapter } = await params;
  const page = getChapterPage(slug, chapter);
  if (!page) return {};
  return createMetadata({
    title: page.title,
    description: page.excerpt,
    path: page.path,
    type: "article",
    modifiedTime: page.updatedAt,
    keywords: [page.story.title, `chương ${page.chapterNumber}`, "tóm tắt chương", "ghi chú đọc"],
    noIndex: !page.seoReady,
  });
}

export default async function ChapterPage({ params }: PageProps) {
  const { slug, chapter } = await params;
  const page = getChapterPage(slug, chapter);
  if (!page) {
    notFound();
    return null;
  }

  const index = page.story.chapters.indexOf(page.chapterNumber);
  const prev = page.story.chapters[index - 1];
  const next = page.story.chapters[index + 1];

  return (
    <>
      <JsonLd data={articleJsonLd({
        title: page.title,
        description: page.excerpt,
        path: page.path,
        dateModified: page.updatedAt,
      })} />
      <JsonLd data={breadcrumbJsonLd([
        { name: "Trang chủ", path: "/" },
        { name: page.story.title, path: page.story.path },
        { name: `Chương ${page.chapterNumber}`, path: page.path },
      ])} />

      <section className="page-hero subtle">
        <div className="container narrow">
          <Breadcrumbs items={[{ label: page.story.title, href: page.story.path }, { label: `Chương ${page.chapterNumber}` }]} />
          <p className="eyebrow">Ghi chú đọc · Không đăng nguyên văn</p>
          <h1>{page.title}</h1>
          <p className="lead">{page.excerpt}</p>
        </div>
      </section>

      <div className="container article-layout">
        <article className="article-main">
          <section className="content-card">
            <h2>Ghi chú chương {page.chapterNumber}</h2>
            {page.notes.map((note) => <p key={note}>{note}</p>)}
          </section>
          <section className="content-card">
            <h2>Mẫu nội dung nên biên tập thêm</h2>
            <ul className="clean-list">
              <li>Sự kiện chính trong chương, viết bằng lời mới.</li>
              <li>Nhân vật nào có chuyển biến đáng chú ý.</li>
              <li>Câu hỏi hoặc nút thắt khiến độc giả muốn đọc tiếp.</li>
              <li>Liên kết về trang truyện và các chương liên quan.</li>
            </ul>
          </section>
        </article>

        <aside className="sidebar">
          <section className="content-card">
            <h2>Điều hướng</h2>
            <div className="hero-actions">
              <Link className="btn-ghost" href={page.story.path}>Về trang truyện</Link>
              {prev && <Link className="btn-ghost" href={`/${page.story.slug}/chuong-${prev}`}>Chương trước</Link>}
              {next && <Link className="btn" href={`/${page.story.slug}/chuong-${next}`}>Chương sau</Link>}
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
