"use client";
import Insight1 from "@/app/components/Insight1";
import Insight24 from "@/app/components/Insight24";
import React, { use, useEffect } from "react";
import { useInsightDetails } from "@/hooks/useInsightDetails";
import StructuredData from "@/app/components/StructuredData";
import { articleStructuredData } from "@/app/lib/structured-data";

type Props = {
  params: Promise<{ slug: string }>
}

const page = ({ params }: Props) => {
  const { slug } = use(params);
  const { insightData } = useInsightDetails(slug);

  // Dynamic SEO based on insight data
  useEffect(() => {
    if (insightData) {
      document.title = `${insightData.title} | GREEN Limited Insights`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', insightData.description || `Discover insights about ${insightData.title} from GREEN Limited's expertise in sustainable energy solutions.`);
      }
      
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', `${insightData.title} | GREEN Limited Insights`);
      }
      
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', insightData.description || `Discover insights about ${insightData.title} from GREEN Limited's expertise in sustainable energy solutions.`);
      }
      
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute('content', `https://example.com/insights/${slug}`);
      }
      
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage && insightData.bgImg) {
        ogImage.setAttribute('content', insightData.bgImg);
      }
    }
  }, [insightData, slug]);

  if (!insightData) {
    return null;
  }

  // Split keypoints for Insight24 component
  const keypoints1 = insightData.keypoints.slice(0, 2);
  const keypoints2 = insightData.keypoints.slice(2);

  const structuredData = insightData ? articleStructuredData({
    title: insightData.title,
    description: insightData.description,
    url: `https://example.com/insights/${slug}`,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    image: insightData.bgImg,
  }) : null;

  return (
    <div>
      {structuredData && <StructuredData data={structuredData} />}
      {insightData.imageDirection === "left" ? (
        <Insight1
          bgImg={insightData.bgImg}
          backgroundImg={
            insightData.bgImg 
          }
          navigation={insightData.navigation}
          title={insightData.title}
          subheadline={insightData.subheadline}
          description={insightData.description}
          name1={insightData.name1}
          name2={insightData.name2}
          cardTitle={insightData.cardTitle}
          keypoints={insightData.keypoints.map((point) => ({
            icon: point.icon,
            text: point.text,
          }))}
        />
      ) : (
        <Insight24
          backroundImg={
            insightData.bgImg
          }
          navigation={insightData.navigation}
          title={insightData.title}
          
          subheadline={insightData.subheadline}
          description={insightData.description}
          name1={insightData.name1}
          name2={insightData.name2}
          cardTitle={insightData.cardTitle}
          keypoints1={keypoints1.map((point) => ({
            icon: point.icon,
            text: point.text,
          }))}
          keypoints2={keypoints2.map((point) => ({
            icon: point.icon,
            text: point.text,
          }))}
        />
      )}
    </div>
  );
};

export default page;
