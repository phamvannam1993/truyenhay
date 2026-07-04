import Link from "next/link";
import type { Story } from "@/lib/data";

export function StoryCard({ story, compact = false, imageUrl }: { story: Story; compact?: boolean; imageUrl?: string }) {
  const image = imageUrl || story.cover || story.thumb || "/images/default-story-cover.webp";

  return (
    <article className={compact ? "story-card compact" : "story-card"}>
      <Link className="story-cover media-cover" href={story.path} aria-label={`Đọc tóm tắt ${story.title}`}>
        <img src={image} alt={story.title} loading="lazy" />
        {story.rank ? <em>#{story.rank}</em> : null}
      </Link>
      <div className="storyCardBody">
        <div className="tag-row">
          {story.categoryNames.slice(0, 2).map((name) => <span key={name} className="tag">{name}</span>)}
        </div>
        <h3><Link href={story.path}>{story.title}</Link></h3>
        {!compact && <p>{story.excerpt}</p>}
        <div className="meta-line storyCardMeta">
          <span>{story.views || (story.chapters.length ? `${story.chapters.length} ghi chú` : "Tóm tắt")}</span>
          <span>{story.rating ? `★ ${story.rating}` : "Review sạch"}</span>
        </div>
      </div>
    </article>
  );
}
