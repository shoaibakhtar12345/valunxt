/**
 * The pages beneath the UAE's Research & Intelligence service.
 *
 * They cannot be served by services/[service]/[sub]/ because their parent
 * segment matches a static folder, and Next stops descending the dynamic branch
 * the moment a static one matches. So the sub-route is repeated here, over the
 * same registry and the same bodies — every decision below is the dynamic
 * route's, verbatim, and a change to one belongs in both.
 *
 * India has no pages under this service, and the guard below 404s it there.
 */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import PageShell from '@/components/layout/PageShell';
import UaeServiceBody from '@/components/pages/UaeServiceBody';
import { uaeSubServiceBody } from '@/components/pages/uae-services';
import { buildMetadata } from '@/lib/seo';
import { vxnRegion, vxnServiceBySlug, vxnSubService } from '@/lib/region';
import { uaeSubServiceConfig } from '@/lib/uae-service-pages';

const SLUG = 'research-intelligence';

type Params = { params: Promise<{ region: string; sub: string }> };

function resolve(rawRegion: string, sub: string) {
  const region = vxnRegion(rawRegion);
  if (region !== 'en-ae') return null;
  const parent = vxnServiceBySlug(SLUG, region);
  if (!parent) return null;
  const child = vxnSubService(parent, decodeURIComponent(sub));
  return child ? { region, service: parent, sub: child } : null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { region, sub } = await params;
  const hit = resolve(region, sub);
  if (!hit) return {};
  const written = !!uaeSubServiceBody(SLUG, hit.sub.slug);
  return buildMetadata(uaeSubServiceConfig(hit.service, hit.sub, written), hit.region);
}

export default async function UaeResearchSubServicePage({ params }: Params) {
  const { region, sub } = await params;
  const hit = resolve(region, sub);
  if (!hit) notFound();

  const Body = uaeSubServiceBody(SLUG, hit.sub.slug);
  const page = uaeSubServiceConfig(hit.service, hit.sub, !!Body);

  /* A written body owns its whole page — its own hero and breadcrumb, no
     shared banner above it and no subscribe band beneath — exactly as on the
     dynamic route. */
  if (Body) {
    return (
      <PageShell page={page} region={hit.region}>
        <Body region={hit.region} />
      </PageShell>
    );
  }

  return (
    <PageShell page={page} region={hit.region}>
      <UaeServiceBody page={page} region={hit.region} />
    </PageShell>
  );
}
