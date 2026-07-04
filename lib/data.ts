import genresJson from "@/data/truyenchu/genres.json";
import storySeedsJson from "@/data/truyenchu/story-seeds.json";
import storyDetailsJson from "@/data/truyenchu/story-details.json";
import { RAW_LEGACY_URLS } from "@/lib/legacy-urls";
import { unique } from "@/lib/utils";

export type RouteKind = "story" | "chapter" | "category" | "list" | "author" | "system";


export type GenreContent = {
  slug: string;
  title: string;
  path: string;
  icon: string;
  color: string;
  image: string;
  heroImage: string;
  description: string;
  shortDescription: string;
  countLabel: string;
  readLabel: string;
  intro: string[];
  seoReady: boolean;
};

export type StorySeed = {
  slug: string;
  title: string;
  path: string;
  categories: string[];
  categoryNames: string[];
  cover: string;
  thumb: string;
  excerpt: string;
  summary: string[];
  views: string;
  rating: number;
  rank: number;
};

export const genreContentItems = genresJson as GenreContent[];
export type StoryDetailContent = {
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
  readingGuide?: string[];
  editorNote?: string;
  chapters?: Array<{ label: string; title: string; description: string }>;
};

export const storySeedItems = storySeedsJson as StorySeed[];
export const storyDetailItems = storyDetailsJson as StoryDetailContent[];

export function getGenreContent(slug: string) {
  return genreContentItems.find((item) => item.slug === slug);
}

export function getStorySeed(slug: string) {
  return storySeedItems.find((item) => item.slug === slug);
}

export function getStoryDetailContent(slug: string) {
  return storyDetailItems.find((item) => item.slug === slug);
}

const FEATURED_STORY_SLUGS = new Set([
  "dai-dao-doc-ton",
  "van-co-than-de",
  "toi-cuong-than-y",
  "than-dao-dan-ton",
  "ta-co-mot-toa-tien-phu",
  "bat-hu-than-ton",
]);

export function shouldUseCustomImage(slug: string): boolean {
  return FEATURED_STORY_SLUGS.has(slug);
}

export type Story = {
  slug: string;
  title: string;
  path: string;
  excerpt: string;
  summary: string[];
  categories: string[];
  categoryNames: string[];
  chapters: number[];
  updatedAt: string;
  seoReady: boolean;
  contentMode: "summary-review";
  cover?: string;
  thumb?: string;
  views?: string;
  rating?: number;
  rank?: number;
};

export type DirectoryPage = {
  slug: string;
  title: string;
  path: string;
  kind: "category" | "list" | "author";
  description: string;
  intro: string[];
  seoReady: boolean;
};

export type ChapterPage = {
  story: Story;
  chapterNumber: number;
  chapterSlug: string;
  title: string;
  path: string;
  excerpt: string;
  notes: string[];
  updatedAt: string;
  seoReady: boolean;
};

const UPDATED_AT = "2026-07-03T00:00:00+07:00";

const WORDS: Record<string, string> = {
  a: "A",
  ai: "Ai",
  akay: "Akay",
  am: "Ấm",
  anh: "Anh",
  apple: "Apple",
  app: "App",
  ba: "Bá",
  bai: "Bài",
  ban: "Bản",
  bat: "Bất",
  bao: "Bảo",
  bach: "Bạch",
  bac: "Bác",
  be: "Bé",
  ben: "Bên",
  bo: "Bộ",
  bon: "Bôn",
  can: "Cần",
  canh: "Cảnh",
  cao: "Cao",
  cau: "Cầu",
  chi: "Chị",
  chia: "Chia",
  chiec: "Chiếc",
  chieu: "Chiêu",
  chien: "Chiến",
  cho: "Chờ",
  chon: "Chọn",
  chu: "Chữ",
  chua: "Chúa",
  chuong: "Chương",
  chuc: "Chúc",
  chung: "Chung",
  cu: "Cũ",
  cua: "Của",
  cuc: "Cực",
  cung: "Cùng",
  cuoc: "Cuộc",
  cuu: "Cửu",
  dai: "Đại",
  dau: "Đấu",
  day: "Dây",
  de: "Để",
  den: "Đen",
  diep: "Diệp",
  dien: "Diễn",
  di: "Dị",
  dia: "Địa",
  dich: "Dịch",
  dinh: "Định",
  do: "Đô",
  doat: "Đoạt",
  doc: "Độc",
  doi: "Đời",
  dong: "Đồng",
  du: "Dữ",
  duoc: "Được",
  dung: "Đừng",
  duong: "Đường",
  duc: "Dục",
  em: "Em",
  erly: "Erly",
  escape: "Escape",
  ga: "Ga",
  gac: "Giác",
  gai: "Gái",
  giao: "Giáo",
  gio: "Gió",
  gioi: "Giới",
  gia: "Gia",
  giai: "Giải",
  giang: "Giang",
  gi: "Gì",
  hai: "Hài",
  hanh: "Hành",
  hau: "Hậu",
  hay: "Hay",
  he: "Hệ",
  hiep: "Hiệp",
  hieu: "Hiểu",
  hoa: "Hoa",
  hoai: "Hoài",
  hon: "Hôn",
  hoang: "Hoàng",
  hoc: "Học",
  hot: "Hot",
  huyen: "Huyền",
  hung: "Hùng",
  huong: "Hưởng",
  huyet: "Huyết",
  khac: "Khác",
  khai: "Khai",
  khang: "Kháng",
  khi: "Khi",
  khong: "Không",
  ket: "Kết",
  kiep: "Kiếp",
  kiem: "Kiếm",
  kieu: "Kiều",
  kinh: "Kinh",
  ky: "Ký",
  kimetsu: "Kimetsu",
  kumo: "Kumo",
  la: "Là",
  lao: "Lão",
  lau: "Lâu",
  li: "Li",
  lia: "Lia",
  lieu: "Liễu",
  linh: "Linh",
  luc: "Lục",
  luu: "Lưu",
  mang: "Mang",
  manh: "Mạnh",
  mai: "Mãi",
  mat: "Mạt",
  mau: "Màu",
  me: "Mẹ",
  menh: "Mệnh",
  mieng: "Miệng",
  minh: "Minh",
  moc: "Mộc",
  moi: "Mới",
  mot: "Một",
  muc: "Mục",
  mua: "Mùa",
  muon: "Muốn",
  nam: "Năm",
  nang: "Nàng",
  nao: "Nào",
  nga: "Ngã",
  ngan: "Ngắn",
  ngay: "Ngày",
  nghia: "Nghĩa",
  nghi: "Nghĩ",
  nghich: "Nghịch",
  ngoc: "Ngọc",
  ngon: "Ngôn",
  ngot: "Ngọt",
  ngu: "Ngư",
  nguoi: "Người",
  nguyet: "Nguyệt",
  nhanh: "Nhanh",
  nhan: "Nhân",
  nhat: "Nhất",
  nhau: "Nhau",
  nha: "Nhà",
  nhe: "Nhé",
  nho: "Nhỏ",
  nhiep: "Nhiếp",
  nhot: "Nhốt",
  nhung: "Nhược",
  noi: "Nói",
  non: "Non",
  nu: "Nữ",
  nua: "Nửa",
  nuoi: "Nuôi",
  oa: "Ốc",
  o: "Ở",
  phai: "Phải",
  phan: "Phản",
  phao: "Pháo",
  phi: "Phi",
  phien: "Phiên",
  phong: "Phong",
  phu: "Phu",
  phuong: "Phượng",
  quan: "Quân",
  quang: "Quang",
  qua: "Quá",
  quyen: "Quyến",
  quy: "Quỷ",
  review: "Review",
  roi: "Rồi",
  rot: "Rốt",
  sac: "Sắc",
  sach: "Sách",
  sai: "Sai",
  sao: "Sao",
  sep: "Xếp",
  se: "Sẽ",
  sieu: "Siêu",
  soi: "Sói",
  song: "Song",
  sung: "Sủng",
  su: "Sư",
  ta: "Ta",
  tac: "Tác",
  tai: "Tái",
  tam: "Tam",
  tan: "Tận",
  tang: "Tặng",
  tat: "Tất",
  te: "Tế",
  tien: "Tiên",
  tieu: "Tiểu",
  tim: "Tìm",
  tinh: "Tình",
  toi: "Tôi",
  tong: "Tổng",
  to: "Tỏ",
  tri: "Trí",
  trinh: "Trinh",
  tron: "Trọn",
  trong: "Trọng",
  truyen: "Truyện",
  tru: "Trữ",
  tu: "Tử",
  tuyet: "Tuyệt",
  vang: "Vàng",
  van: "Văn",
  vi: "Vì",
  vo: "Vợ",
  vu: "Vũ",
  vung: "Vững",
  vua: "Vừa",
  vuong: "Vương",
  war: "War",
  warriors: "Warriors",
  xich: "Xích",
  xuyen: "Xuyên",
  yeu: "Yêu",
};

const TITLE_OVERRIDES: Record<string, string> = {
  "40-ngay-ket-hon": "40 Ngày Kết Hôn",
  "dau-la-dai-luc-review": "Đấu La Đại Lục Review",
  "dau-pha-thuong-khung": "Đấu Phá Thương Khung",
  "toan-tri-doc-gia-app": "Toàn Trí Độc Giả App",
  "kumo-desu-ga-nani-ka": "Kumo Desu Ga Nani Ka",
  "coi-sach-giai-tri": "Coi Sách Giải Trí",
};

const CATEGORY_DEFINITIONS: Record<string, string> = {
  "truyen-chu": "Truyện chữ",
  "ngon-tinh": "Ngôn tình",
  "tien-hiep": "Tiên hiệp",
  "kiem-hiep": "Kiếm hiệp",
  "huyen-huyen": "Huyền huyễn",
  "do-thi": "Đô thị",
  "trong-sinh": "Trọng sinh",
  "he-thong": "Hệ thống",
  "nu-cuong": "Nữ cường",
  "lich-su": "Lịch sử",
  "xuyen-khong": "Xuyên không",
  "xuyen-nhanh": "Xuyên nhanh",
  "mat-the": "Mạt thế",
  "linh-di": "Linh dị",
  "trinh-tham": "Trinh thám",
  "hai-huoc": "Hài hước",
  "showbiz": "Showbiz",
  "light-novel": "Light Novel",
  "dam-my": "Đam mỹ",
  "cung-dau": "Cung đấu",
  "quan-truong": "Quan trường",
  "vong-du": "Võng du",
  "truyen-teen": "Truyện teen",
  "phuong-tay": "Phương Tây",
  "dong-nhan": "Đồng nhân",
  "review": "Review truyện",
};

const LIST_DEFINITIONS: Record<string, string> = {
  "truyen-hot": "Truyện hot",
  "truyen-moi": "Truyện mới",
  "truyen-dich": "Truyện dịch",
  "truyen-convert": "Truyện convert",
  "tien-hiep-hay": "Tiên hiệp hay",
  "kiem-hiep-hay": "Kiếm hiệp hay",
  "ngon-tinh-nguoc": "Ngôn tình ngược",
  "dam-my-sac": "Đam mỹ sắc",
  "dam-my-h-van": "Đam mỹ H văn",
};

const CATEGORY_RULES: Array<{ slug: string; words: string[] }> = [
  { slug: "ngon-tinh", words: ["yeu", "hon-nhan", "ket-hon", "vo", "em", "tinh", "tong-tai", "phu-nhan", "co-vo", "thieu-sung"] },
  { slug: "tien-hiep", words: ["tien", "tu-la", "thanh-vuong", "vinh-hang", "de-ton", "ta-than", "kiem-quan", "muc-than"] },
  { slug: "kiem-hiep", words: ["kiem", "kiem-linh", "kiem-ton"] },
  { slug: "huyen-huyen", words: ["huyen", "than", "thien", "cuu-thien", "dau-pha", "dau-la", "linh-vu", "linh-kiem"] },
  { slug: "do-thi", words: ["do-thi", "tien-y", "y-tien", "showbiz", "dien-vien", "canh-sat"] },
  { slug: "trong-sinh", words: ["trong-sinh", "tai-sinh"] },
  { slug: "xuyen-khong", words: ["xuyen-qua", "xuyen-khong", "di-gioi"] },
  { slug: "xuyen-nhanh", words: ["xuyen-nhanh"] },
  { slug: "mat-the", words: ["tan-the", "mat-the", "zombie"] },
  { slug: "linh-di", words: ["linh-di", "quy", "dao-quy", "ma", "chieu-hon"] },
  { slug: "trinh-tham", words: ["canh-sat", "doc-gia", "escape", "tham"] },
  { slug: "hai-huoc", words: ["hai-huoc", "tha-mang", "sieu-cuong"] },
  { slug: "showbiz", words: ["dien-vien", "showbiz"] },
  { slug: "light-novel", words: ["kumo", "warriors", "kimetsu"] },
  { slug: "dam-my", words: ["dam-my", "phu-lang"] },
  { slug: "cung-dau", words: ["hau-cung", "vuong-phi", "phu-hoang", "phi-da"] },
  { slug: "vong-du", words: ["game", "vong-du"] },
  { slug: "review", words: ["review", "app"] },
];

type Parsed = {
  stories: Map<string, { slug: string; chapters: Set<number> }>;
  categories: Set<string>;
  lists: Set<string>;
  authors: Set<string>;
  systems: Set<string>;
};

function cleanPath(raw: string) {
  const input = raw.trim();
  if (!input) return "";
  try {
    return new URL(input).pathname.replace(/^\/+|\/+$/g, "");
  } catch {
    return input.replace(/^https?:\/\/[^/]+/i, "").replace(/^\/+|\/+$/g, "");
  }
}

function parseLegacyUrls(): Parsed {
  const parsed: Parsed = {
    stories: new Map(),
    categories: new Set(),
    lists: new Set(),
    authors: new Set(),
    systems: new Set(),
  };

  RAW_LEGACY_URLS.split("\n").map(cleanPath).filter(Boolean).forEach((path) => {
    const parts = path.split("/").filter(Boolean);
    if (parts[0] === "the-loai" && parts[1]) {
      parsed.categories.add(parts[1]);
      return;
    }
    if (parts[0] === "danh-sach" && parts[1]) {
      parsed.lists.add(parts[1]);
      return;
    }
    if (parts[0] === "tac-gia" && parts[1]) {
      parsed.authors.add(parts[1]);
      return;
    }
    if (path === "apple-app-site-association") {
      parsed.systems.add(path);
      return;
    }
    if (parts.length === 1) {
      ensureStory(parsed.stories, parts[0]);
      return;
    }
    if (parts.length === 2 && /^chuong-\d+$/i.test(parts[1])) {
      const story = ensureStory(parsed.stories, parts[0]);
      const chapterNumber = Number(parts[1].replace("chuong-", ""));
      if (Number.isFinite(chapterNumber)) story.chapters.add(chapterNumber);
    }
  });

  return parsed;
}

function ensureStory(map: Parsed["stories"], slug: string) {
  const existed = map.get(slug);
  if (existed) return existed;
  const item = { slug, chapters: new Set<number>() };
  map.set(slug, item);
  return item;
}

export function titleFromSlug(slug: string) {
  if (TITLE_OVERRIDES[slug]) return TITLE_OVERRIDES[slug];
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => WORDS[word] || word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function categoryName(slug: string) {
  return getGenreContent(slug)?.title || CATEGORY_DEFINITIONS[slug] || titleFromSlug(slug);
}

export function listName(slug: string) {
  return LIST_DEFINITIONS[slug] || titleFromSlug(slug);
}

function inferCategories(storySlug: string) {
  const hits = CATEGORY_RULES.filter((rule) => rule.words.some((word) => storySlug.includes(word))).map((rule) => rule.slug);
  return unique(hits.length ? hits : ["truyen-chu"]);
}

function motifText(slug: string, categories: string[]) {
  const motifs: string[] = [];
  if (slug.includes("hon-nhan") || slug.includes("ket-hon") || slug.includes("vo") || slug.includes("phu-nhan")) {
    motifs.push("quan hệ tình cảm phát triển chậm, nhiều nút thắt về lựa chọn và niềm tin");
  }
  if (slug.includes("trong-sinh") || slug.includes("tai-sinh")) {
    motifs.push("motif làm lại cuộc đời, sửa sai và thay đổi số phận");
  }
  if (slug.includes("xuyen") || slug.includes("di-gioi")) {
    motifs.push("bối cảnh dịch chuyển thế giới, tạo cảm giác mới lạ khi theo dõi nhân vật");
  }
  if (slug.includes("kiem") || categories.includes("tien-hiep")) {
    motifs.push("không khí tu luyện, tranh đấu và vượt cấp quen thuộc của dòng tiên hiệp/kiếm hiệp");
  }
  if (slug.includes("do-thi") || slug.includes("tong-tai") || slug.includes("dien-vien")) {
    motifs.push("nhịp truyện hiện đại, dễ đọc, hợp với độc giả thích tình tiết nhanh");
  }
  if (slug.includes("tan-the") || slug.includes("zombie")) {
    motifs.push("bối cảnh sinh tồn, căng thẳng và nhiều lựa chọn khó");
  }
  if (slug.includes("game") || slug.includes("escape")) {
    motifs.push("màu sắc trò chơi, thử thách và suy luận");
  }
  if (!motifs.length) motifs.push("cốt truyện dễ tiếp cận, phù hợp để đọc giải trí và chọn truyện theo gu");
  return motifs.join("; ");
}

function buildSummary(title: string, slug: string, categoryNames: string[]) {
  const cats = categoryNames.length ? categoryNames.join(", ") : "truyện chữ";
  const motifs = motifText(slug, categoryNames.map((name) => name.toLowerCase()));

  return [
    `${title} được giới thiệu trên TruyenChu.vn theo hướng tóm tắt, review và gợi ý đọc. Trang này không đăng nguyên văn tác phẩm, không thay thế bản truyện gốc, mà giúp người đọc nắm nhanh màu sắc chính trước khi quyết định có theo dõi hay không.`,
    `Về cảm giác đọc, truyện phù hợp với nhóm độc giả quan tâm đến ${cats.toLowerCase()}. Điểm nổi bật cần chú ý là ${motifs}. Nội dung review nên được biên tập thêm theo từng truyện để tăng độ chính xác và giá trị tìm kiếm.`,
    `Khi triển khai thật, bạn nên bổ sung các mục riêng như bối cảnh, nhân vật trung tâm, mạch xung đột, điểm hấp dẫn, điểm cần cân nhắc và đánh giá không spoil quá sâu. Đây là cách làm sạch hơn so với việc sao chép chương truyện từ nguồn khác.`,
  ];
}

function buildExcerpt(title: string, slug: string, categoryNames: string[]) {
  const primary = categoryNames[0] || "truyện chữ";
  const motif = motifText(slug, categoryNames.map((name) => name.toLowerCase())).split(";")[0];
  return `Tóm tắt ${title}, review nhanh, gợi ý đọc và phân loại ${primary.toLowerCase()}. Nội dung chỉ mang tính giới thiệu, không đăng full truyện. Điểm đáng chú ý: ${motif}.`;
}

const parsed = parseLegacyUrls();

const allCategorySlugs = unique([
  ...Array.from(parsed.categories),
  ...Object.keys(CATEGORY_DEFINITIONS),
  ...genreContentItems.map((genre) => genre.slug),
]);

const allListSlugs = unique([
  ...Array.from(parsed.lists),
  ...Object.keys(LIST_DEFINITIONS),
]);

const legacyStories: Story[] = Array.from(parsed.stories.values()).map(({ slug, chapters }) => {
  const categories = inferCategories(slug).filter((cat) => cat !== "truyen-chu" || allCategorySlugs.includes(cat));
  const normalizedCategories = categories.includes("truyen-chu") ? categories : unique(categories);
  const categoryNames = normalizedCategories.map(categoryName);
  const title = titleFromSlug(slug);
  return {
    slug,
    title,
    path: `/${slug}`,
    excerpt: buildExcerpt(title, slug, categoryNames),
    summary: buildSummary(title, slug, categoryNames),
    categories: normalizedCategories,
    categoryNames,
    chapters: Array.from(chapters).sort((a, b) => a - b),
    updatedAt: UPDATED_AT,
    seoReady: true,
    contentMode: "summary-review" as const,
  };
}).sort((a, b) => a.title.localeCompare(b.title, "vi"));

const seedStories: Story[] = storySeedItems.map((item) => ({
  slug: item.slug,
  title: item.title,
  path: item.path,
  excerpt: item.excerpt,
  summary: item.summary,
  categories: item.categories,
  categoryNames: item.categoryNames,
  chapters: [],
  updatedAt: UPDATED_AT,
  seoReady: true,
  contentMode: "summary-review" as const,
  cover: item.cover,
  thumb: item.thumb,
  views: item.views,
  rating: item.rating,
  rank: item.rank,
}));

export const stories: Story[] = [
  ...seedStories,
  ...legacyStories.filter((story) => !seedStories.some((seed) => seed.slug === story.slug)),
];

export const seedStoriesList = seedStories;

export const categoryPages: DirectoryPage[] = allCategorySlugs.map((slug) => {
  const content = getGenreContent(slug);
  const title = content?.title || categoryName(slug);
  return {
    slug,
    title,
    path: `/the-loai/${slug}`,
    kind: "category" as const,
    description: content?.description || `Danh sách tóm tắt và review truyện thuộc thể loại ${title}. Chỉ hiển thị nội dung giới thiệu, không đăng full truyện.`,
    intro: content?.intro?.length ? content.intro : [
      `Trang ${title} được thiết kế để gom các bài tóm tắt, review và gợi ý đọc theo đúng gu của độc giả. Nội dung nên tập trung vào bối cảnh, nhân vật, điểm hấp dẫn và đánh giá không spoil quá sâu.`,
      `Nếu muốn phát triển SEO bền vững, mỗi truyện trong thể loại này nên có phần biên tập riêng thay vì dùng nội dung tự động quá mỏng hoặc sao chép chương truyện.`,
    ],
    seoReady: content?.seoReady ?? true,
  };
}).sort((a, b) => a.title.localeCompare(b.title, "vi"));

export const listPages: DirectoryPage[] = allListSlugs.map((slug) => {
  const title = listName(slug);
  return {
    slug,
    title,
    path: `/danh-sach/${slug}`,
    kind: "list" as const,
    description: `${title}: tuyển chọn các trang tóm tắt truyện, review ngắn và gợi ý đọc theo nhu cầu tìm kiếm phổ biến.`,
    intro: [
      `${title} giúp người đọc lọc truyện theo nhu cầu nhanh hơn thay vì phải mở từng tác phẩm.`,
      `Danh sách nên được cập nhật bằng tiêu chí rõ ràng: độ quan tâm, mức hoàn thiện nội dung review, thể loại, trạng thái và trải nghiệm đọc.`,
    ],
    seoReady: true,
  };
}).sort((a, b) => a.title.localeCompare(b.title, "vi"));

export const authorPages: DirectoryPage[] = Array.from(parsed.authors).map((slug) => {
  const title = titleFromSlug(slug);
  return {
    slug,
    title,
    path: `/tac-gia/${slug}`,
    kind: "author" as const,
    description: `Hồ sơ tác giả ${title}, thông tin giới thiệu và các bài tóm tắt truyện liên quan đang được biên tập.`,
    intro: [
      `Đây là trang hồ sơ tác giả ${title}. Khi có dữ liệu xác minh, bạn nên bổ sung tiểu sử ngắn, phong cách viết, tác phẩm tiêu biểu và liên kết tới các bài review liên quan.`,
      `Mặc định trang tác giả nên để noindex nếu chưa có thông tin riêng đủ dày, nhằm tránh tạo nhiều trang mỏng trong mắt công cụ tìm kiếm.`,
    ],
    seoReady: false,
  };
}).sort((a, b) => a.title.localeCompare(b.title, "vi"));

export function getStory(slug: string) {
  return stories.find((story) => story.slug === slug);
}

export function getCategoryPage(slug: string) {
  return categoryPages.find((page) => page.slug === slug);
}

export function getListPage(slug: string) {
  return listPages.find((page) => page.slug === slug);
}

export function getAuthorPage(slug: string) {
  return authorPages.find((page) => page.slug === slug);
}

export function getChapterPage(storySlug: string, chapterSlug: string): ChapterPage | undefined {
  const story = getStory(storySlug);
  if (!story) return undefined;
  const match = chapterSlug.match(/^chuong-(\d+)$/);
  if (!match) return undefined;
  const chapterNumber = Number(match[1]);
  if (!story.chapters.includes(chapterNumber)) return undefined;
  const title = `${story.title} - Chương ${chapterNumber}: Tóm tắt & ghi chú đọc`;
  return {
    story,
    chapterNumber,
    chapterSlug,
    title,
    path: `/${story.slug}/${chapterSlug}`,
    excerpt: `Tóm tắt chương ${chapterNumber} của ${story.title}. Trang chỉ cung cấp ghi chú đọc, không đăng nguyên văn chương truyện.`,
    notes: [
      `Chương ${chapterNumber} của ${story.title} nên được biên tập theo dạng ghi chú đọc: sự kiện chính, thay đổi trong quan hệ nhân vật, điểm mở nút thắt và cảm giác sau khi đọc.`,
      `Không nên đưa nguyên văn đoạn truyện vào đây. Nếu cần minh họa, chỉ dùng nhận xét ngắn do biên tập viên tự viết, tránh sao chép văn phong hoặc diễn biến quá chi tiết của bản gốc.`,
      `Để trang chương có giá trị SEO thật, hãy bổ sung phần “không spoil sâu”, “điểm đáng chú ý”, “liên kết chương trước/sau” và câu hỏi thường gặp của độc giả.`,
    ],
    updatedAt: UPDATED_AT,
    seoReady: true,
  };
}

export function getStoriesByCategory(categorySlug: string) {
  return stories.filter((story) => story.categories.includes(categorySlug));
}

export function getSeedStoriesByCategory(categorySlug: string) {
  return seedStoriesList.filter((story) => story.categories.includes(categorySlug));
}

function stableScore(slug: string) {
  return slug.split("").reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 1), 0);
}

export function getStoriesForList(listSlug: string) {
  if (listSlug === "truyen-moi") return [...stories].reverse().slice(0, 48);
  if (listSlug === "truyen-hot") return [...stories].sort((a, b) => stableScore(b.slug) - stableScore(a.slug)).slice(0, 48);
  if (listSlug === "tien-hiep-hay") return getStoriesByCategory("tien-hiep").slice(0, 48);
  if (listSlug === "kiem-hiep-hay") return getStoriesByCategory("kiem-hiep").slice(0, 48);
  if (listSlug === "ngon-tinh-nguoc") return stories.filter((story) => story.slug.includes("nguoc") || story.categories.includes("ngon-tinh")).slice(0, 48);
  if (listSlug === "truyen-dich") return stories.filter((story) => !story.slug.includes("convert")).slice(0, 48);
  if (listSlug === "truyen-convert") return stories.filter((story) => story.categories.some((cat) => ["tien-hiep", "kiem-hiep", "huyen-huyen"].includes(cat))).slice(0, 48);
  if (listSlug.startsWith("dam-my")) return getStoriesByCategory("dam-my").slice(0, 48);
  return stories.slice(0, 48);
}

export function searchStories(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return stories.filter((story) => {
    return (
      story.title.toLowerCase().includes(q) ||
      story.slug.includes(q) ||
      story.excerpt.toLowerCase().includes(q) ||
      story.categoryNames.join(" ").toLowerCase().includes(q)
    );
  });
}

export function getChapterSitemapItems() {
  return stories.flatMap((story) =>
    story.chapters.map((chapter) => ({
      path: `/${story.slug}/chuong-${chapter}`,
      updatedAt: story.updatedAt,
      priority: 0.55,
    })),
  );
}

export function getSitemapItems() {
  return [
    { path: "/", updatedAt: UPDATED_AT, priority: 1 },
    ...stories.filter((story) => story.seoReady).map((story) => ({ path: story.path, updatedAt: story.updatedAt, priority: 0.8 })),
    ...getChapterSitemapItems(),
    ...categoryPages.filter((page) => page.seoReady).map((page) => ({ path: page.path, updatedAt: UPDATED_AT, priority: 0.7 })),
    ...listPages.filter((page) => page.seoReady).map((page) => ({ path: page.path, updatedAt: UPDATED_AT, priority: 0.7 })),
    ...authorPages.filter((page) => page.seoReady).map((page) => ({ path: page.path, updatedAt: UPDATED_AT, priority: 0.4 })),
  ];
}
