import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

const STORIES_PATH = join(process.cwd(), "data/truyenchu/story-seeds.json");
const DETAILS_PATH = join(process.cwd(), "data/truyenchu/story-details.json");

export async function PUT(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const password = request.headers.get("x-admin-password");

  if (password !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { story, details } = body;

    if (!story || !details) {
      return NextResponse.json({ error: "Missing story or details" }, { status: 400 });
    }

    // Read current files
    const storiesData = JSON.parse(readFileSync(STORIES_PATH, "utf-8"));
    const detailsData = JSON.parse(readFileSync(DETAILS_PATH, "utf-8"));

    // Update story in story-seeds.json
    const storyIndex = storiesData.findIndex((s: any) => s.slug === story.slug);
    if (storyIndex !== -1) {
      storiesData[storyIndex] = {
        ...storiesData[storyIndex],
        title: story.title,
        excerpt: story.excerpt,
        categories: story.categories,
        categoryNames: story.categories.map((cat: string) => {
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
      };
    }

    // Update story in story-details.json
    const detailsIndex = detailsData.findIndex((d: any) => d.slug === details.slug);
    if (detailsIndex !== -1) {
      detailsData[detailsIndex] = { ...detailsData[detailsIndex], ...details };
    } else {
      // If story details don't exist, create new entry
      detailsData.push(details);
    }

    // Write files back
    writeFileSync(STORIES_PATH, JSON.stringify(storiesData, null, 2));
    writeFileSync(DETAILS_PATH, JSON.stringify(detailsData, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating stories:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
