"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { genreContentItems } from "@/lib/data";
import { ImageUploader } from "@/components/ImageUploader";

type StoryData = {
  slug: string;
  title: string;
  path: string;
  categories: string[];
  excerpt: string;
  summary: string[];
  categoryNames: string[];
};

type StoryDetails = {
  slug: string;
  image_url?: string;
  heroTitle?: string;
  subtitle?: string;
  author?: string;
  status?: string;
  sourceType?: string;
  wordCount?: string;
  tone?: string[];
  highlights?: string[];
  characters?: string[];
  chapters?: Array<{ label: string; title: string; description: string }>;
  readingGuide?: string[];
  editorNote?: string;
};

export default function NewStoryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<StoryData>({
    slug: "",
    title: "",
    path: "",
    categories: [],
    excerpt: "",
    summary: [""],
    categoryNames: [],
  });

  const [detailsData, setDetailsData] = useState<StoryDetails>({
    slug: "",
    image_url: "",
    heroTitle: "",
    subtitle: "",
    author: "",
    status: "Đang tóm tắt",
    sourceType: "Tóm tắt & review",
    wordCount: "5 phút",
    tone: [],
    highlights: [],
    characters: [],
    chapters: [],
    readingGuide: [],
    editorNote: "",
  });

  const [saving, setSaving] = useState(false);

  const handleSlugChange = (slug: string) => {
    const cleanSlug = slug
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    setFormData({ ...formData, slug: cleanSlug, path: `/${cleanSlug}` });
    setDetailsData({ ...detailsData, slug: cleanSlug });
  };

  const handleSave = async () => {
    if (!formData.slug || !formData.title) {
      alert("Vui lòng điền đầy đủ thông tin (slug, tiêu đề)");
      return;
    }

    setSaving(true);
    try {
      const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
      const response = await fetch("/api/admin/stories/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword,
        },
        body: JSON.stringify({
          story: formData,
          details: detailsData,
        }),
      });

      if (response.ok) {
        alert("Thêm truyện thành công!");
        router.push("/admin");
      } else {
        alert("Lỗi khi thêm truyện");
      }
    } catch (error) {
      alert("Lỗi: " + (error as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-edit">
      <div className="container-lg">
        <div className="edit-header">
          <Link href="/admin" className="back-link">
            ← Quay lại
          </Link>
          <h1>Thêm truyện mới</h1>
          <button onClick={handleSave} disabled={saving} className="btn btn-primary">
            {saving ? "Đang lưu..." : "💾 Tạo truyện"}
          </button>
        </div>

        <div className="tab-content">
          <div className="form-section">
            <h2>Thông tin truyện</h2>

            <div className="form-group">
              <label>Slug (tự động từ tiêu đề)</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="van-co-than-de"
              />
              <small style={{ color: "#6b7280", marginTop: "4px" }}>
                Đường dẫn: /{formData.slug}
              </small>
            </div>

            <div className="form-group">
              <label>Tiêu đề truyện *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  if (!formData.slug) {
                    handleSlugChange(e.target.value);
                  }
                }}
                placeholder="Vạn Cổ Thần Đế"
              />
            </div>

            <div className="form-group">
              <label>Giới thiệu ngắn</label>
              <textarea
                rows={3}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Mô tả ngắn gọn nội dung truyện..."
              />
            </div>

            <div className="form-group">
              <label>Thể loại</label>
              <div className="checkbox-group">
                {genreContentItems.map((genre) => (
                  <label key={genre.slug} className="checkbox">
                    <input
                      type="checkbox"
                      checked={formData.categories.includes(genre.slug)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            categories: [...formData.categories, genre.slug],
                          });
                        } else {
                          setFormData({
                            ...formData,
                            categories: formData.categories.filter((c) => c !== genre.slug),
                          });
                        }
                      }}
                    />
                    {genre.title}
                  </label>
                ))}
              </div>
            </div>

            <h2 style={{ marginTop: "40px" }}>Chi tiết truyện</h2>

            <div className="form-group">
              <label>Tác giả</label>
              <input
                type="text"
                value={detailsData.author || ""}
                onChange={(e) => setDetailsData({ ...detailsData, author: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Ảnh bìa</label>
              <ImageUploader
                slug={formData.slug}
                currentUrl={detailsData.image_url}
                onImageChange={(url) => setDetailsData({ ...detailsData, image_url: url })}
              />
            </div>

            <div className="form-group">
              <label>Trạng thái</label>
              <select
                value={detailsData.status || ""}
                onChange={(e) => setDetailsData({ ...detailsData, status: e.target.value })}
              >
                <option>Đang tóm tắt</option>
                <option>Hoàn thành</option>
                <option>Duyệt bản</option>
              </select>
            </div>

            <div className="form-group">
              <label>Phụ đề</label>
              <textarea
                rows={2}
                value={detailsData.subtitle || ""}
                onChange={(e) => setDetailsData({ ...detailsData, subtitle: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Ghi chú biên tập</label>
              <textarea
                rows={3}
                value={detailsData.editorNote || ""}
                onChange={(e) => setDetailsData({ ...detailsData, editorNote: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-edit {
          padding: 40px 0;
          min-height: 100vh;
          background: #f5f7fa;
        }
        .edit-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          gap: 20px;
        }
        .edit-header h1 {
          margin: 0;
          flex: 1;
          font-size: 1.8rem;
        }
        .back-link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
        }
        .back-link:hover {
          text-decoration: underline;
        }
        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.95rem;
        }
        .btn-primary {
          background: #059669;
          color: white;
        }
        .btn-primary:hover:not(:disabled) {
          background: #047857;
        }
        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .tab-content {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        .form-section h2 {
          margin: 0 0 20px;
          font-size: 1.3rem;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #1f2937;
        }
        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 0.95rem;
          font-family: inherit;
        }
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .checkbox-group {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 15px;
        }
        .checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }
        .checkbox input {
          width: auto;
        }
        small {
          display: block;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}
