"use client";

import { useState, useRef } from "react";

type ImageUploaderProps = {
  slug: string;
  currentUrl?: string;
  onImageChange: (url: string) => void;
};

export function ImageUploader({ slug, currentUrl, onImageChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(currentUrl || "");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload file
      const formData = new FormData();
      formData.append("file", file);
      formData.append("slug", slug);

      const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          "x-admin-password": adminPassword,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onImageChange(data.url);
      setPreview(data.url);
    } catch (err) {
      setError((err as Error).message);
      setPreview("");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onImageChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="image-uploader">
      <div className="upload-area">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          style={{ display: "none" }}
        />
        {!preview ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="upload-btn"
          >
            {uploading ? "Đang upload..." : "📤 Chọn ảnh"}
          </button>
        ) : (
          <div className="preview-area">
            <img src={preview} alt="Preview" className="preview-img" />
            <div className="preview-actions">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="btn-small"
              >
                Thay đổi
              </button>
              <button
                type="button"
                onClick={handleRemove}
                disabled={uploading}
                className="btn-small btn-danger"
              >
                Xóa
              </button>
            </div>
          </div>
        )}
      </div>
      {error && <div className="error-msg">{error}</div>}
      <div className="url-input">
        <label>Hoặc nhập URL:</label>
        <input
          type="text"
          value={preview}
          onChange={(e) => {
            setPreview(e.target.value);
            onImageChange(e.target.value);
          }}
          placeholder="/images/story-slug.webp"
        />
      </div>

      <style jsx>{`
        .image-uploader {
          border: 2px dashed #d1d5db;
          border-radius: 8px;
          padding: 20px;
          background: #f9fafb;
        }
        .upload-area {
          text-align: center;
          margin-bottom: 15px;
        }
        .upload-btn {
          padding: 15px 30px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
        }
        .upload-btn:hover:not(:disabled) {
          background: #2563eb;
        }
        .upload-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .preview-area {
          text-align: center;
        }
        .preview-img {
          max-width: 200px;
          max-height: 300px;
          border-radius: 8px;
          margin-bottom: 15px;
        }
        .preview-actions {
          display: flex;
          gap: 10px;
          justify-content: center;
        }
        .btn-small {
          padding: 8px 16px;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 600;
        }
        .btn-small:hover:not(:disabled) {
          background: #2563eb;
        }
        .btn-small:disabled {
          opacity: 0.6;
        }
        .btn-danger {
          background: #ef4444;
        }
        .btn-danger:hover:not(:disabled) {
          background: #dc2626;
        }
        .error-msg {
          color: #dc2626;
          font-size: 0.875rem;
          margin-bottom: 10px;
        }
        .url-input {
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid #e5e7eb;
        }
        .url-input label {
          display: block;
          margin-bottom: 8px;
          font-size: 0.875rem;
          color: #6b7280;
          font-weight: 600;
        }
        .url-input input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          font-size: 0.875rem;
        }
        .url-input input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
      `}</style>
    </div>
  );
}
