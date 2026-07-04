import Link from "next/link";
import { SearchBox } from "@/components/SearchBox";
import { categoryPages, stories, getStoryDetailContent } from "@/lib/data";
import { collectionJsonLd, JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const ASSET = "/images";

const featureItems = [
  { icon: "📄", title: "Tóm tắt ngắn gọn", text: "Nội dung súc tích, dễ hiểu, nắm bắt cốt truyện chỉ trong vài phút." },
  { icon: "⚡", title: "Cập nhật nhanh", text: "Các truyện hot được bổ sung liên tục theo nhu cầu tìm kiếm." },
  { icon: "🔖", title: "Dễ chọn truyện", text: "Phân loại rõ ràng, có gợi ý motif và điểm đáng đọc." },
  { icon: "💙", title: "Hoàn toàn miễn phí", text: "Đọc tóm tắt, review và gợi ý truyện mọi lúc, mọi nơi." },
];

const preferredCategorySlugs = ["tien-hiep", "huyen-huyen", "do-thi", "he-thong", "trong-sinh", "nu-cuong", "lich-su"];
const categoryIcons: Record<string, string> = {
  "tien-hiep": "🏯",
  "huyen-huyen": "🌙",
  "do-thi": "🏙️",
  "he-thong": "⚙️",
  "trong-sinh": "↻",
  "nu-cuong": "♀",
  "lich-su": "🏛️",
  "kiem-hiep": "⚔️",
  "ngon-tinh": "💗",
};

const heroTags = ["Tiên hiệp", "Huyền huyễn", "Đô thị", "Trọng sinh", "Hệ thống", "Nữ cường"];

function cover(index: number) {
  return `${ASSET}/cover-featured-${String((index % 5) + 1).padStart(2, "0")}.webp`;
}

function rankingThumb(index: number) {
  return `${ASSET}/thumb-ranking-${String((index % 5) + 1).padStart(2, "0")}.webp`;
}

function newCover(index: number) {
  return `${ASSET}/cover-new-${String((index % 4) + 1).padStart(2, "0")}.webp`;
}

export default function HomePage() {
  const topStories = stories.slice(0, 5);
  const newStories = stories.slice(5, 9);
  const blogStories = stories.slice(9, 12);
  const categories = preferredCategorySlugs
    .map((slug) => categoryPages.find((cat) => cat.slug === slug))
    .filter(Boolean)
    .concat(categoryPages.filter((cat) => !preferredCategorySlugs.includes(cat.slug)).slice(0, 2));

  return (
    <>
      <JsonLd data={collectionJsonLd({
        title: `${siteConfig.name} - Tóm tắt truyện chữ`,
        description: siteConfig.description,
        path: "/",
        items: topStories.map((story) => ({ title: story.title, path: story.path })),
      })} />

      <section className="homeHero" aria-labelledby="home-hero-title">
        <div className="container-lg">
          <div className="heroBanner">
            <div className="heroCopy">
              <p className="heroKicker">Tóm tắt truyện hay mỗi ngày</p>
              <h1 id="home-hero-title">Tóm tắt truyện hay – Đọc nhanh, hiểu trọn</h1>
              <p>Chúng tôi giúp bạn nắm bắt cốt truyện chính, khám phá điểm hấp dẫn và chọn lựa tác phẩm đáng đọc nhất trước khi theo dõi.</p>
              <div className="heroSearchWrap"><SearchBox /></div>
              <div className="heroTags" aria-label="Gợi ý tìm kiếm">
                <span>Gợi ý tìm kiếm:</span>
                {heroTags.map((tag) => <Link key={tag} href={`/tim-kiem?q=${encodeURIComponent(tag)}`}>{tag}</Link>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-lg featureStrip" aria-label="Điểm nổi bật">
        {featureItems.map((item) => (
          <article key={item.title} className="summaryFeatureCard">
            <span className="summaryFeatureIcon" aria-hidden="true">{item.icon}</span>
            <div>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="container-lg homeMainGrid">
        <div className="homeContentStack">
          <section className="homePanel" aria-labelledby="featured-summary-title">
            <div className="panelHeader">
              <h2 id="featured-summary-title">🔥 Truyện tóm tắt nổi bật</h2>
              <Link href="/danh-sach/truyen-hot">Xem tất cả →</Link>
            </div>
            <div className="featuredSummaryGrid">
              {topStories.map((story, index) => {
                const details = getStoryDetailContent(story.slug);
                const imgSrc = details?.image_url || cover(index);
                return (
                <article key={story.slug} className="summaryStoryCard">
                  <Link href={story.path} className="summaryCoverLink" aria-label={`Đọc tóm tắt ${story.title}`}>
                    <span className="storyRankBadge">{index + 1}</span>
                    <img src={imgSrc} alt={`Ảnh minh họa ${story.title}`} loading={index === 0 ? "eager" : "lazy"} />
                  </Link>
                  <div className="summaryStoryBody">
                    <Link href={story.path} className="storyTitleLink"><h3>{story.title}</h3></Link>
                    <span className="storyCategoryPill">{story.categoryNames[0] || "Tóm tắt"}</span>
                    <p>{story.excerpt}</p>
                    <Link href={story.path} className="readSummaryBtn">Đọc tóm tắt</Link>
                  </div>
                </article>
              );
              })}
            </div>
          </section>

          <section className="homePanel compactPanel" aria-labelledby="popular-categories-title">
            <div className="panelHeader">
              <h2 id="popular-categories-title">Thể loại phổ biến</h2>
              <Link href="/the-loai/ngon-tinh">Xem tất cả →</Link>
            </div>
            <div className="homeCategoryGrid">
              {categories.map((cat) => cat && (
                <Link key={cat.slug} href={cat.path} className="homeCategoryChip">
                  <span>{categoryIcons[cat.slug] || "📚"}</span>
                  {cat.title}
                </Link>
              ))}
            </div>
          </section>

          <section className="homePanel" aria-labelledby="new-summary-title">
            <div className="panelHeader">
              <h2 id="new-summary-title">Truyện mới cập nhật</h2>
              <Link href="/danh-sach/truyen-moi">Xem tất cả →</Link>
            </div>
            <div className="newSummaryList">
              {newStories.map((story, index) => {
                const details = getStoryDetailContent(story.slug);
                const imgSrc = details?.image_url || newCover(index);
                return (
                <article key={story.slug} className="newSummaryItem">
                  <img src={imgSrc} alt={`Ảnh ${story.title}`} loading="lazy" />
                  <div>
                    <div className="newItemTitleRow">
                      <Link href={story.path}>{story.title}</Link>
                      <span>Mới</span>
                    </div>
                    <p>{story.categoryNames[0] || "Truyện chữ"}</p>
                    <small>{story.excerpt}</small>
                    <em>{index * 3 + 2} giờ trước</em>
                  </div>
                </article>
              );
              })}
            </div>
          </section>

          <section className="homePanel" aria-labelledby="reader-corner-title">
            <div className="panelHeader">
              <h2 id="reader-corner-title">Góc người đọc</h2>
              <Link href="/danh-sach/truyen-hot">Xem tất cả →</Link>
            </div>
            <div className="readerGrid">
              {[
                { img: `${ASSET}/blog-01.webp`, title: "Cách chọn truyện hợp gu không mất thời gian", text: "Bí quyết chọn truyện nhanh chóng dựa vào thể loại, motif và đánh giá độc giả." },
                { img: `${ASSET}/blog-02.webp`, title: "Top 10 truyện tóm tắt đáng đọc nhất tháng", text: "Danh sách tác phẩm có lượng quan tâm cao và phần tóm tắt dễ nắm bắt." },
                { img: `${ASSET}/blog-03.webp`, title: "Tóm tắt truyện – xu hướng đọc thông minh", text: "Cách đọc nhanh để chọn đúng truyện, tránh mất thời gian với nội dung không hợp gu." },
              ].map((item, index) => (
                <article key={item.title} className="readerCard">
                  <img src={item.img} alt={item.title} loading="lazy" />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <Link href={blogStories[index]?.path || "/danh-sach/truyen-hot"}>Đọc ngay →</Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="homeSidebar" aria-label="Bảng phụ trang chủ">
          <section className="homePanel sidebarPanel">
            <div className="panelHeader"><h2>Truyện tóm tắt xem nhiều</h2></div>
            <div className="rankingList">
              {topStories.map((story, index) => {
                const details = getStoryDetailContent(story.slug);
                const imgSrc = details?.image_url || rankingThumb(index);
                return (
                <Link key={story.slug} href={story.path} className="rankingItem">
                  <span className={`rankingNumber rank${index + 1}`}>{index + 1}</span>
                  <img src={imgSrc} alt="" loading="lazy" />
                  <span className="rankingText">
                    <strong>{story.title}</strong>
                    <small>{story.categoryNames[0] || "Tóm tắt"}</small>
                  </span>
                  <em>{(156 - index * 23).toFixed(1)}K</em>
                </Link>
              );
              })}
            </div>
          </section>

          <section className="homePanel sidebarPanel">
            <div className="panelHeader"><h2>Chủ đề được quan tâm</h2></div>
            <div className="topicCloud">
              {["Trọng sinh", "Hệ thống", "Tiên hiệp", "Huyền huyễn", "Đô thị", "Nữ cường", "Tu luyện", "Đan dược"].map((topic) => (
                <Link key={topic} href={`/tim-kiem?q=${encodeURIComponent(topic)}`}># {topic}</Link>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </>
  );
}
