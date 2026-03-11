// pages/[resource]/[id].tsx
'use client';
import { useParams } from 'next/navigation';

import BlogDetail from '@/components/blogs/BlogDetail';

export default function DetailPage() {
  const params = useParams();
  const resource = Array.isArray(params?.resource)
    ? params.resource[0]
    : params?.resource;

  if (resource === 'food-tips') {
    return <BlogDetail resourceType='food-tips' />;
  } else if (resource === 'latest-news') {
    return <BlogDetail resourceType='latest-news' />;
  }

  return <div>Invalid resource</div>;
}
