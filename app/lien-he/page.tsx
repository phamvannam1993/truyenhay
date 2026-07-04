"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <section className="page-hero">
        <div className="container narrow">
          <Breadcrumbs items={[{ label: "Liên hệ" }]} />
          <h1>Liên hệ với chúng tôi</h1>
          <p className="lead">Có câu hỏi hoặc đề xuất? Chúng tôi rất mong nhận được ý kiến từ bạn.</p>
        </div>
      </section>

      <div className="container narrow">
        <div className="contact-layout">
          <div className="contact-info">
            <section className="content-card">
              <h2>Thông tin liên hệ</h2>
              <div className="info-item">
                <div className="info-icon">📧</div>
                <div>
                  <h3>Email</h3>
                  <p>
                    <a href="mailto:support@truyenchu.vn">support@truyenchu.vn</a>
                  </p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">💬</div>
                <div>
                  <h3>Phản hồi</h3>
                  <p>Gửi form phía dưới hoặc email trực tiếp cho chúng tôi</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">⏱️</div>
                <div>
                  <h3>Thời gian phản hồi</h3>
                  <p>Chúng tôi sẽ trả lời trong vòng 24-48 giờ</p>
                </div>
              </div>
            </section>

            <section className="content-card">
              <h2>Thời gian hoạt động</h2>
              <ul className="clean-list">
                <li><strong>Thứ Hai - Thứ Sáu:</strong> 9:00 - 18:00</li>
                <li><strong>Thứ Bảy - Chủ Nhật:</strong> 10:00 - 17:00</li>
              </ul>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)", marginTop: "16px" }}>
                ✨ Chúng tôi sẽ phản hồi càng sớm càng tốt cho các thắc mắc gửi ngoài giờ.
              </p>
            </section>
          </div>

          <div className="contact-form">
            <section className="content-card">
              <h2>Gửi thông điệp</h2>
              {submitted ? (
                <div className="success-message">
                  ✅ Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Tên của bạn *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nhập tên của bạn"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="form-group">
                    <label>Chủ đề *</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="">-- Chọn chủ đề --</option>
                      <option value="suggestion">Đề xuất truyện</option>
                      <option value="feedback">Phản hồi chung</option>
                      <option value="bug">Báo cáo lỗi</option>
                      <option value="partnership">Hợp tác/Quảng cáo</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Nội dung *</label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Viết nội dung của bạn tại đây..."
                    />
                  </div>

                  <button type="submit" className="btn">
                    ✉️ Gửi thông điệp
                  </button>
                </form>
              )}
            </section>
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          padding: 40px 0;
        }
        .contact-info {
          display: grid;
          gap: 20px;
        }
        .info-item {
          display: flex;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid var(--line);
        }
        .info-item:last-child {
          border-bottom: none;
        }
        .info-icon {
          font-size: 1.8rem;
          min-width: 40px;
          text-align: center;
        }
        .info-item h3 {
          margin: 0 0 6px;
          font-size: 1rem;
          color: var(--ink);
        }
        .info-item p {
          margin: 0;
          color: var(--ink-soft);
          font-size: 0.95rem;
        }
        .info-item a {
          color: var(--brand);
          text-decoration: none;
          font-weight: 600;
        }
        .info-item a:hover {
          text-decoration: underline;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: var(--ink);
        }
        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 12px;
          border: 1px solid var(--line);
          border-radius: 6px;
          font-size: 0.95rem;
          font-family: inherit;
          color: var(--ink);
        }
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--brand);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .success-message {
          padding: 20px;
          background: #d1fae5;
          border: 1px solid #6ee7b7;
          border-radius: 8px;
          color: #047857;
          font-weight: 600;
          text-align: center;
        }
        @media (max-width: 1024px) {
          .contact-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
