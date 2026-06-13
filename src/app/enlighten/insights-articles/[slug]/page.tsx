"use client";
import { useParams } from 'next/navigation';
import ArticlesDetail from '../../../components/Articles/ArticlesDetail';

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  return <ArticlesDetail slug={slug} />;
}