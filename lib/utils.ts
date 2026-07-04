export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function titleCase(input: string) {
  return input
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function clampText(input: string, max = 155) {
  if (input.length <= max) return input;
  const trimmed = input.slice(0, max - 1);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${trimmed.slice(0, lastSpace > 80 ? lastSpace : trimmed.length)}…`;
}

export function absolute(path: string, base: string) {
  const cleanBase = base.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}

export function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

export function sortByTitle<T extends { title: string }>(items: T[]) {
  return [...items].sort((a, b) => a.title.localeCompare(b.title, "vi"));
}
