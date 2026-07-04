import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { DirectoryPage } from "@/lib/data";

export function DirectoryHero({ page, breadcrumbLabel }: { page: DirectoryPage; breadcrumbLabel: string }) {
  return (
    <section className="page-hero subtle">
      <div className="container narrow">
        <Breadcrumbs items={[{ label: breadcrumbLabel }, { label: page.title }]} />
        <p className="eyebrow">{breadcrumbLabel}</p>
        <h1>{page.title}</h1>
        <p className="lead">{page.description}</p>
      </div>
    </section>
  );
}
