/**
 * Script gợi ý: nhận một file urls.txt, lọc path hợp lệ rồi in ra chuỗi để dán vào lib/legacy-urls.ts.
 * Chạy sau khi đã cài tsx: npx tsx scripts/import-urls.ts urls.txt
 */
import fs from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("Usage: npx tsx scripts/import-urls.ts urls.txt");
  process.exit(1);
}

const raw = fs.readFileSync(file, "utf8");
const urls = raw
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean)
  .filter((line) => line.startsWith("https://truyenchu.vn/"));

console.log(urls.join("\n"));
