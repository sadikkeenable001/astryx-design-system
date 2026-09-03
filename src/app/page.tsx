'use client';

import dynamic from 'next/dynamic';

const ShowcaseClient = dynamic(() => import('./ShowcaseClient'), {
  ssr: false,
});

export default function ShowcasePage() {
  return <ShowcaseClient />;
}
