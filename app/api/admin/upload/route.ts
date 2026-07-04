import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const password = request.headers.get("x-admin-password");

  if (password !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const slug = formData.get("slug") as string;

    if (!file || !slug) {
      return NextResponse.json({ error: "Missing file or slug" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }

    // Get file extension
    const ext = file.name.split(".").pop();
    const filename = `${slug}.${ext}`;

    // Create images directory if it doesn't exist
    const imagesDir = join(process.cwd(), "public/images");
    mkdirSync(imagesDir, { recursive: true });

    // Read file buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Write file to public/images
    const filepath = join(imagesDir, filename);
    writeFileSync(filepath, buffer);

    // Return the image URL
    const imageUrl = `/images/${filename}`;

    return NextResponse.json({
      success: true,
      url: imageUrl,
      filename,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
