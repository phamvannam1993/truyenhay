import type { Story } from "@/lib/data";
import { getStoryDetailContent } from "@/lib/data";
import { StoryCard } from "@/components/StoryCard";

export function StoryGrid({ stories, compact = false }: { stories: Story[]; compact?: boolean }) {
  if (!stories.length) {
    return (
      <div className="empty-state">
        <h3>Chưa có truyện phù hợp</h3>
        <p>Hãy bổ sung dữ liệu biên tập hoặc điều chỉnh quy tắc phân loại trong <code>lib/data.ts</code>.</p>
      </div>
    );
  }
  return (
    <div className={compact ? "story-grid compact-grid" : "story-grid"}>
      {stories.map((story) => {
        const details = getStoryDetailContent(story.slug);
        const imageUrl = details?.image_url;
        return <StoryCard key={story.slug} story={story} compact={compact} imageUrl={imageUrl} />;
      })}
    </div>
  );
}
