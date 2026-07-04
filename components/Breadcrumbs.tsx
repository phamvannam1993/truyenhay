import Link from "next/link";

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link href="/">Trang chủ</Link>
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          <span aria-hidden="true">/</span>
          {item.href ? <Link href={item.href}>{item.label}</Link> : <strong>{item.label}</strong>}
        </span>
      ))}
    </nav>
  );
}
