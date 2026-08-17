"use client";
import React from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useArticleBySlug } from "../../../hooks/useArticleBySlug";

interface ArticlesDetailProps {
  slug: string;
}

const ArticlesDetail = ({ slug }: ArticlesDetailProps) => {
  const { data: article } = useArticleBySlug(slug);

  if (!article) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="   ">
        <TopNavigation />
        <div className="flex h-full">
          {/* Left Side - */}
          <div className="lg:block  lg:w-1/6 flex items-center justify-center">
            <div className="fixed top-1/4 left-4 lg:left-24">
              <img
                src="/images/articles/insights-articles.png"
                alt="insights and articles"
                className="w-5 lg:w-10"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-[95%] px-8 pt-8 ">
            {/* Back Button */}

            {/* Article Header */}
            <div className="mb-8 pl-10 lg:pl-0">
              <div className="flex items-center justify-between">
                <h1 className=" text-2xl lg:text-3xl font-black text-gray-800 mb-4">
                  {article.title}
                </h1>
                <div>
                  <button
                    style={{
                      transform: "skewX(-16deg)",
                    }}
                    onClick={() => window.history.back()}
                    className="flex items-center text-gray-600 border border-green-600 px-8 p-2  hover:text-gray-800"
                  >
                    <span className="mr-2">
                      <img
                        src="/images/articles/arrowBack.png"
                        alt="arrowBtn"
                      />
                    </span>
                    <span>Back</span>
                  </button>
                </div>
              </div>

              <p className="text-gray-600 text-lg mb-6">
                {article.description}
              </p>
            </div>

            {/* Article Content */}
            <div className="lg:flex space-x-8 mb-8">
              {/* Left Content */}
              <div className="lg:w-1/2">
                <div
                  className="text-gray-700 text-base leading-relaxed mb-6 prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: article.content.split("<h2>")[0],
                  }}
                />

                <div className="mb-6 flex justify-end">
                  <a href={article.cta.href} className="cursor-pointer">
                    <img
                      src="/images/media-press/explore.png"
                      alt={article.cta.text}
                    />
                  </a>
                </div>
              </div>

              {/* Right Image */}
              <div className="lg:w-1/2">
                <img
                  src={article.featuredImg.src}
                  alt={article.featuredImg.alt}
                  className="w-full h-full  lg:h-64 lg:object-cover  lg:rounded-lg shadow-md"
                />
              </div>
            </div>

            {/* Dynamic Content Sections */}
            {(() => {
              const contentSections = article.content.split("<h2>").slice(1);
              return contentSections.map((section, index) => {
                const [titlePart, ...contentParts] = section.split("</h2>");
                const sectionTitle = titlePart.trim();
                const sectionContent = contentParts.join("</h2>").trim();

                return (
                  <div key={index} className="mb-8">
                    <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                      {sectionTitle}
                    </h2>
                    <div className="lg:flex justify-between items-start ">
                      <div
                        className="text-gray-700 text-base leading-relaxed my-4 lg:w-3/4 prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: sectionContent }}
                      />
                      <div className="ml-4">
                        <a href={article.cta.href} className="cursor-pointer">
                          <img
                            src="/images/media-press/explore.png"
                            alt={article.cta.text}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              });
            })()}

            {/* Bottom Section - Quote */}
            <div className="mt-12 mb-8">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                {article.quote.text.split("—")[0].trim()}
                <br />—{" "}
                <span className="text-[#23B14D] italic">
                  {article.quote.highlighted}
                </span>
              </h3>
            </div>
          </div>
        </div>
        <Chatbot />
      </div>
    </React.Fragment>
  );
};

export default ArticlesDetail;
