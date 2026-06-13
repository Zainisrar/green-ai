"use client";
import { useParams } from 'next/navigation';
import ExpertiseDetail from '../../components/Expertise/ExpertiseDetail';

export default function ExpertiseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  return <ExpertiseDetail slug={slug} />;
}