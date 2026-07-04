import Link from "next/link";

export function SectionHeader({ eyebrow, title, description, href }: { eyebrow?: string; title: string; description?: string; href?: string }) {
  return (
    <div className="section-header">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {href && <Link className="text-link" href={href}>Xem thêm</Link>}
    </div>
  );
}
