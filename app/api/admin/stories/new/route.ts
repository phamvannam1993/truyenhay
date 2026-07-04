import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

const STORIES_PATH = join(process.cwd(), "data/truyenchu/story-seeds.json");
const DETAILS_PATH = join(process.cwd(), "data/truyenchu/story-details.json");

export async function POST(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const password = request.headers.get("x-admin-password");

  if (password !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { story, details } = body;

    if (!story || !story.slug || !story.title) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Read current files
    const storiesData = JSON.parse(readFileSync(STORIES_PATH, "utf-8"));
    const detailsData = JSON.parse(readFileSync(DETAILS_PATH, "utf-8"));

    // Check if story already exists
    if (storiesData.some((s: any) => s.slug === story.slug)) {
      return NextResponse.json({ error: "Story already exists" }, { status: 400 });
    }

    // Add story to story-seeds.json with required fields
    const newStory = {
      slug: story.slug,
      title: story.title,
      path: story.path,
      categories: story.categories || [],
      categoryNames: (story.categories || []).map((cat: string) => {
        const categoryNames: Record<string, string> = {
          "tien-hiep": "Tiên Hiệp",
          "huyen-huyen": "Huyền Huyễn",
          "kiem-hiep": "Kiếm Hiệp",
          "ngon-tinh": "Ngôn Tình",
          "do-thi": "Đô Thị",
          "lich-su": "Lịch Sử",
          "linh-di": "Linh Dị",
          "trong-sinh": "Trọng Sinh",
          "he-thong": "Hệ Thống",
          "nu-cuong": "Nữ Cường",
        };
        return categoryNames[cat] || cat;
      }),
      cover: story.cover || `/images/${story.slug}.webp`,
      thumb: story.thumb || `/images/${story.slug}.webp`,
      excerpt: story.excerpt || "",
      summary: story.summary || [""],
      views: story.views || "0",
      rating: story.rating || 4.8,
      rank: storiesData.length + 1,
    };

    storiesData.push(newStory);

    // Add story details
    const newDetails = {
      slug: story.slug,
      image_url: details.image_url || `/images/${story.slug}.webp`,
      heroTitle: details.heroTitle || story.title,
      subtitle: details.subtitle || story.excerpt,
      author: details.author || "Đang cập nhật",
      status: details.status || "Đang tóm tắt",
      sourceType: details.sourceType || "Tóm tắt & review",
      wordCount: details.wordCount || "5 phút",
      tone: details.tone || [],
      highlights: details.highlights || [],
      characters: details.characters || [],
      chapters: details.chapters || [],
      readingGuide: details.readingGuide || [],
      editorNote: details.editorNote || "",
    };

    detailsData.push(newDetails);

    // Write files back
    writeFileSync(STORIES_PATH, JSON.stringify(storiesData, null, 2));
    writeFileSync(DETAILS_PATH, JSON.stringify(detailsData, null, 2));

    return NextResponse.json({ success: true, slug: story.slug });
  } catch (error) {
    console.error("Error creating story:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
