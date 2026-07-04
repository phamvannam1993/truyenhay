"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { stories, getStoryDetailContent } from "@/lib/data";

type Story = {
  slug: string;
  title: string;
  categories: string[];
  excerpt: string;
  cover?: string;
  thumb?: string;
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [storiesList, setStoriesList] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authenticated) {
      setStoriesList(stories);
    }
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
    if (password === adminPassword) {
      setAuthenticated(true);
      setPassword("");
    } else {
      alert("Mật khẩu không đúng");
    }
  };

  if (!authenticated) {
    return (
      <div className="admin-login">
        <div className="container">
          <div className="admin-login-box">
            <h1>Admin Panel</h1>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <button type="submit">Đăng nhập</button>
            </form>
          </div>
        </div>
        <style jsx>{`
          .admin-login {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          .admin-login-box {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 400px;
          }
          .admin-login-box h1 {
            margin: 0 0 30px;
            text-align: center;
            color: #333;
          }
          .admin-login-box form {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }
          .admin-login-box input {
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 16px;
          }
          .admin-login-box button {
            padding: 12px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
          }
          .admin-login-box button:hover {
            background: #764ba2;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="container-lg">
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <button onClick={() => setAuthenticated(false)} className="logout-btn">
            Đăng xuất
          </button>
        </div>

        <div className="admin-actions">
          <Link href="/admin/stories/new" className="btn btn-primary">
            + Thêm truyện mới
          </Link>
        </div>

        <div className="admin-stories">
          <h2>Danh sách truyện ({storiesList.length})</h2>
          <div className="stories-table">
            <div className="table-header">
              <div className="col-stt">STT</div>
              <div className="col-image">Ảnh</div>
              <div className="col-title">Tên truyện</div>
              <div className="col-categories">Thể loại</div>
              <div className="col-actions">Hành động</div>
            </div>
            {storiesList.map((story, index) => {
              const details = getStoryDetailContent(story.slug);
              const imageUrl = details?.image_url || story.cover || "/images/default-story-cover.webp";
              return (
                <div key={story.slug} className="table-row">
                  <div className="col-stt">{index + 1}</div>
                  <div className="col-image">
                    <img src={imageUrl} alt={story.title} />
                  </div>
                  <div className="col-title">{story.title}</div>
                  <div className="col-categories">{story.categories.join(", ")}</div>
                  <div className="col-actions">
                    <Link href={`/admin/stories/${story.slug}`} className="btn-sm">
                      Sửa
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-panel {
          padding: 40px 0;
          min-height: 100vh;
          background: #f5f7fa;
        }
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }
        .admin-header h1 {
          margin: 0;
          font-size: 2rem;
        }
        .logout-btn {
          padding: 10px 20px;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }
        .logout-btn:hover {
          background: #dc2626;
        }
        .admin-actions {
          margin-bottom: 30px;
        }
        .btn {
          display: inline-block;
          padding: 12px 24px;
          background: #3b82f6;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          border: none;
          cursor: pointer;
        }
        .btn:hover {
          background: #2563eb;
        }
        .btn-primary {
          background: #059669;
        }
        .btn-primary:hover {
          background: #047857;
        }
        .admin-stories {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        .admin-stories h2 {
          margin: 0 0 20px;
          font-size: 1.3rem;
        }
        .stories-table {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }
        .table-header {
          display: grid;
          grid-template-columns: 50px 80px 1fr 200px 150px;
          gap: 15px;
          padding: 15px;
          background: #f9fafb;
          font-weight: 600;
          border-bottom: 2px solid #e5e7eb;
        }
        .table-row {
          display: grid;
          grid-template-columns: 50px 80px 1fr 200px 150px;
          gap: 15px;
          padding: 12px 15px;
          border-bottom: 1px solid #e5e7eb;
          align-items: center;
        }
        .col-stt {
          text-align: center;
          font-weight: 600;
          color: var(--brand);
        }
        .col-image {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .col-image img {
          width: 60px;
          height: 85px;
          object-fit: cover;
          border-radius: 4px;
          background: #e5e7eb;
        }
        .table-row:hover {
          background: #f9fafb;
        }
        .btn-sm {
          display: inline-block;
          padding: 6px 12px;
          background: #3b82f6;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          font-size: 0.875rem;
          font-weight: 600;
        }
        .btn-sm:hover {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
}
