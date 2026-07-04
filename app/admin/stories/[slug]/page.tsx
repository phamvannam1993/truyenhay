"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getStory, getStoryDetailContent, genreContentItems } from "@/lib/data";
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

export default function EditStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { slug } = use(params);
  const story = getStory(slug);
  const details = getStoryDetailContent(slug);

  const [formData, setFormData] = useState<StoryData | null>(null);
  const [detailsData, setDetailsData] = useState<StoryDetails | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  useEffect(() => {
    if (story) {
      setFormData(story as StoryData);
      if (details) {
        setDetailsData(details as StoryDetails);
      } else {
        setDetailsData({
          slug: story.slug,
          image_url: "",
          heroTitle: story.title,
          subtitle: story.excerpt,
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
      }
    }
  }, [story, details]);

  const handleSave = async () => {
    if (!formData || !detailsData) return;

    setSaving(true);
    try {
      const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
      const response = await fetch("/api/admin/stories", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminPassword
        },
        body: JSON.stringify({ story: formData, details: detailsData }),
      });

      if (response.ok) {
        alert("Lưu thành công!");
        router.push("/admin");
      } else {
        alert("Lỗi khi lưu dữ liệu");
      }
    } catch (error) {
      alert("Lỗi: " + (error as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (!story || !formData || !detailsData) {
    return <div className="container-lg" style={{ padding: "40px 0" }}>Đang tải...</div>;
  }

  return (
    <div className="admin-edit">
      <div className="container-lg">
        <div className="edit-header">
          <Link href="/admin" className="back-link">
            ← Quay lại
          </Link>
          <h1>Sửa: {formData.title}</h1>
          <button onClick={handleSave} disabled={saving} className="btn btn-primary">
            {saving ? "Đang lưu..." : "💾 Lưu"}
          </button>
        </div>

        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "basic" ? "active" : ""}`}
            onClick={() => setActiveTab("basic")}
          >
            Thông tin cơ bản
          </button>
          <button
            className={`tab-btn ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Chi tiết
          </button>
          <button
            className={`tab-btn ${activeTab === "content" ? "active" : ""}`}
            onClick={() => setActiveTab("content")}
          >
            Nội dung
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "basic" && (
            <div className="form-section">
              <h2>Thông tin cơ bản</h2>

              <div className="form-group">
                <label>Tiêu đề truyện</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Giới thiệu ngắn</label>
                <textarea
                  rows={3}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
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
            </div>
          )}

          {activeTab === "details" && (
            <div className="form-section">
              <h2>Chi tiết truyện</h2>

              <div className="form-group">
                <label>Ảnh bìa</label>
                <ImageUploader
                  slug={slug}
                  currentUrl={detailsData.image_url}
                  onImageChange={(url) => setDetailsData({ ...detailsData, image_url: url })}
                />
              </div>

              <div className="form-group">
                <label>Tác giả</label>
                <input
                  type="text"
                  value={detailsData.author || ""}
                  onChange={(e) => setDetailsData({ ...detailsData, author: e.target.value })}
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
                <label>Dạng nội dung</label>
                <input
                  type="text"
                  value={detailsData.sourceType || ""}
                  onChange={(e) => setDetailsData({ ...detailsData, sourceType: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Thời gian đọc</label>
                <input
                  type="text"
                  value={detailsData.wordCount || ""}
                  onChange={(e) => setDetailsData({ ...detailsData, wordCount: e.target.value })}
                  placeholder="5 phút"
                />
              </div>
            </div>
          )}

          {activeTab === "content" && (
            <div className="form-section">
              <h2>Nội dung chi tiết</h2>

              <div className="form-group">
                <label>Tiêu đề hero</label>
                <input
                  type="text"
                  value={detailsData.heroTitle || ""}
                  onChange={(e) => setDetailsData({ ...detailsData, heroTitle: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Phụ đề (subtitle)</label>
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

              <div className="form-group">
                <label>Tag nội dung (cách nhau bằng dấu phẩy)</label>
                <textarea
                  rows={2}
                  value={detailsData.tone?.join(", ") || ""}
                  onChange={(e) =>
                    setDetailsData({ ...detailsData, tone: e.target.value.split(",").map((t) => t.trim()) })
                  }
                />
              </div>
            </div>
          )}
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
        .tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
          border-bottom: 2px solid #e5e7eb;
        }
        .tab-btn {
          padding: 12px 20px;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          cursor: pointer;
          font-weight: 600;
          color: #6b7280;
          font-size: 0.95rem;
        }
        .tab-btn.active {
          color: #3b82f6;
          border-bottom-color: #3b82f6;
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
      `}</style>
    </div>
  );
}
