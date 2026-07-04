import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeader } from "@/components/SectionHeader";
import { getStory, getStoriesByCategory, getStoryDetailContent, stories, type Story } from "@/lib/data";
import { articleJsonLd, breadcrumbJsonLd, createMetadata, JsonLd } from "@/lib/seo";

export const dynamicParams = true;

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return {};
  const detail = getStoryDetailContent(slug);

  return createMetadata({
    title: `${story.title} - Tóm tắt truyện, review nhanh & gợi ý đọc`,
    description: detail?.subtitle || story.excerpt,
    path: story.path,
    type: "article",
    modifiedTime: story.updatedAt,
    keywords: [story.title, "tóm tắt truyện", "review truyện", "không spoil", ...story.categoryNames],
    noIndex: !story.seoReady,
    image: story.cover,
  });
}

function fallbackCover(story: Story, imageUrl?: string) {
  return imageUrl || story.cover || "/images/cover-featured-01.webp";
}

function fallbackThumb(story: Story, index: number, imageUrl?: string) {
  if (imageUrl && imageUrl !== "/images/default-story-cover.webp") return imageUrl;
  if (story.thumb && story.thumb !== "/images/default-story-cover.webp") return story.thumb;
  return `/images/thumb-ranking-${String((index % 5) + 1).padStart(2, "0")}.webp`;
}

function uniqueRelated(story: Story) {
  const sameCategory = story.categories.length ? getStoriesByCategory(story.categories[0]) : [];
  return sameCategory.filter((item) => item.slug !== story.slug).slice(0, 4);
}

export default async function StoryPage({ params }: PageProps) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) {
    notFound();
    return null;
  }

  const detail = getStoryDetailContent(slug);
  const related = uniqueRelated(story);
  const trending = stories.filter((item) => item.slug !== story.slug).slice(0, 5);
  const tones = detail?.tone?.length ? detail.tone : [story.categoryNames[0] || "Tóm tắt", "Review nhanh", "Không đăng full", "Gợi ý đọc"];
  const highlights = detail?.highlights?.length ? detail.highlights : [
    "Giúp bạn nắm nhanh bối cảnh, nhân vật và điểm hấp dẫn chính trước khi quyết định đọc bản đầy đủ.",
    "Nội dung được trình bày theo hướng review, không sao chép chương truyện hay đăng nguyên văn tác phẩm.",
    "Có thể mở rộng thành ghi chú từng chương, tuyến nhân vật và danh sách truyện cùng gu.",
  ];
  const characters = detail?.characters?.length ? detail.characters : [
    "Nhân vật chính là trung tâm của hành trình thay đổi số phận.",
    "Tuyến đối thủ tạo áp lực và đẩy mạch truyện tiến lên.",
    "Nhân vật phụ mở rộng bối cảnh, quan hệ và cảm xúc của câu chuyện.",
  ];
  const readingGuide = detail?.readingGuide?.length ? detail.readingGuide : [
    "Đọc phần tóm tắt ngắn để nắm nội dung chính trong vài phút.",
    "Xem phần điểm hấp dẫn để biết truyện có hợp gu hay không.",
    "Dùng mục truyện liên quan để tìm thêm tác phẩm cùng thể loại.",
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: "Trang chủ", path: "/" },
        { name: story.title, path: story.path },
      ])} />

      <section className="storyDetailHero" aria-labelledby="story-title">
        <div className="container-lg storyDetailHeroGrid">
          <div className="storyHeroCopy">
            <Breadcrumbs items={[{ label: story.title }]} />
            <div className="storyTagRow">
              {story.categoryNames.map((name, index) => (
                <Link key={`${name}-${index}`} href={`/the-loai/${story.categories[index]}`} className="storyTag">
                  {name}
                </Link>
              ))}
            </div>
            <h1 id="story-title">{detail?.heroTitle || story.title}</h1>
            <p>{detail?.subtitle || story.excerpt}</p>
            <div className="storyHeroActions">
              <a href="#tom-tat" className="storyPrimaryButton">Đọc tóm tắt</a>
              <a href="#review" className="storyGhostButton">Xem review nhanh</a>
            </div>
            <div className="storyMiniStats" aria-label="Thông tin nhanh">
              <span><strong>{story.views || "Đang cập nhật"}</strong><em>Lượt đọc</em></span>
              <span><strong>{story.rating ? story.rating.toFixed(1) : "4.6"}</strong><em>Đánh giá</em></span>
              <span><strong>{detail?.wordCount || "5 phút"}</strong><em>Thời gian đọc</em></span>
            </div>
          </div>

          <aside className="storyHeroBook" aria-label="Bìa truyện">
            <div className="storyCoverFrame">
              <img src={fallbackCover(story, detail?.image_url)} alt={`Ảnh minh họa ${story.title}`} />
            </div>
            <div className="storyBookInfoCard">
              <strong>{story.title}</strong>
              <span>{detail?.status || "Đang tóm tắt"}</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="container-lg storyDetailLayout">
        <main className="storyDetailMain">
          <section className="storyInfoStrip" aria-label="Tổng quan truyện">
            <div><span>Tác giả</span><strong>{detail?.author || "Đang cập nhật"}</strong></div>
            <div><span>Trạng thái</span><strong>{detail?.status || "Đang tóm tắt"}</strong></div>
            <div><span>Dạng nội dung</span><strong>{detail?.sourceType || "Tóm tắt & review"}</strong></div>
            <div><span>Thể loại</span><strong>{story.categoryNames.join(", ") || "Đang cập nhật"}</strong></div>
          </section>

          <section id="tom-tat" className="storyContentBlock">
            <p className="eyebrow">Tóm tắt truyện</p>
            <h2>{story.title} nói về gì?</h2>
            {story.summary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>

          <section id="review" className="storyContentBlock">
            <p className="eyebrow">Review nhanh</p>
            <h2>Điểm hấp dẫn chính</h2>
            <div className="storyBulletGrid">
              {highlights.map((item, index) => (
                <article key={item}>
                  <span>{index + 1}</span>
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="storyContentBlock">
            <p className="eyebrow">Tuyến nhân vật</p>
            <h2>Các tuyến cần chú ý</h2>
            <div className="storyCharacterList">
              {characters.map((item, index) => (
                <div key={item}>
                  <b>{index + 1}</b>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>

          {detail?.chapters?.length ? (
            <section className="storyContentBlock">
              <p className="eyebrow">Ghi chú nội dung</p>
              <h2>Khung tóm tắt đề xuất</h2>
              <div className="storyChapterNotes">
                {detail.chapters.map((chapter) => (
                  <article key={`${chapter.label}-${chapter.title}`}>
                    <span>{chapter.label}</span>
                    <h3>{chapter.title}</h3>
                    <p>{chapter.description}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <section className="storyContentBlock storyGuideBlock">
            <p className="eyebrow">Gợi ý đọc</p>
            <h2>Nên đọc trang này như thế nào?</h2>
            <ol>
              {readingGuide.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </section>

          <section className="storyContentBlock storyNoteBox">
            <h2>Lưu ý bản quyền nội dung</h2>
            <p>{detail?.editorNote || "TruyenChu.vn chỉ nên đăng tóm tắt, review và ghi chú biên tập. Không nên đăng full truyện, không sao chép nguyên văn chương truyện hoặc văn phong của bản gốc."}</p>
          </section>
        </main>

        <aside className="storyDetailSidebar">
          <section className="storySideCard">
            <h2>Thông tin nhanh</h2>
            <ul className="storyQuickList">
              <li><span>Tên truyện</span><strong>{story.title}</strong></li>
              <li><span>Thể loại</span><strong>{story.categoryNames[0] || "Tóm tắt"}</strong></li>
              <li><span>Lượt đọc</span><strong>{story.views || "Đang cập nhật"}</strong></li>
              <li><span>Rating</span><strong>★ {story.rating ? story.rating.toFixed(1) : "4.6"}</strong></li>
            </ul>
          </section>

          <section className="storySideCard">
            <h2>Tag nội dung</h2>
            <div className="storyToneTags">
              {tones.map((tone) => <span key={tone}>{tone}</span>)}
            </div>
          </section>

          <section className="storySideCard">
            <h2>Đang được quan tâm</h2>
            <div className="storySideRanking">
              {trending.map((item, index) => {
                const trendingDetail = getStoryDetailContent(item.slug);
                return (
                <Link key={item.slug} href={item.path}>
                  <img src={fallbackThumb(item, index, trendingDetail?.image_url)} alt={`Ảnh ${item.title}`} loading="lazy" />
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.categoryNames[0] || "Tóm tắt"}</small>
                  </span>
                  <em>{index + 1}</em>
                </Link>
              );
              })}
            </div>
          </section>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="storyRelatedSection">
          <div className="container-lg">
            <SectionHeader eyebrow="Liên quan" title="Truyện cùng gu có thể bạn thích" />
            <div className="storyRelatedGrid">
              {related.map((item, index) => {
                const relatedDetail = getStoryDetailContent(item.slug);
                return (
                <Link key={item.slug} href={item.path} className="storyRelatedCard">
                  <img src={fallbackThumb(item, index, relatedDetail?.image_url)} alt={`Ảnh ${item.title}`} loading="lazy" />
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.excerpt}</small>
                  </span>
                </Link>
              );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
