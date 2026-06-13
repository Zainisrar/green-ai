"use client";
import React from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useInsightsArticles } from "../../../hooks/useInsightsArticles";
import Link from "next/link";
import {useNavigationState} from "@/hooks/useNavigationState"
const Articles = () => {
  const { data: apiArticles, error } = useInsightsArticles();

  const nav = useNavigationState();
  
  // Transform API data to match component structure
  const articles = React.useMemo(() => {
    if (!apiArticles) return [];

    return apiArticles.map((article) => ({
      id: article.id,
      title: article.title,
      description: article.description,
      img: article.featuredImg.src,
      href: article.cta.href || "#",
      slug: article.slug,
    }));
  }, [apiArticles]);


  if (error) {
    return (
      <React.Fragment>
        <div className="">
          <TopNavigation />
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-xl text-red-600">
              Error loading articles. Please try again later.
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="relative lg:z-50 z-[99999999999999999]">
        <TopNavigation />
      </div>
      <div className="  ">
        <div className="flex h-full">
          {/* Left Side - */}
          <div className="hidden lg:flex w-1/6 items-center justify-center">
            <div className="fixed top-1/4 left-4 lg:left-14">
              <img
                src="/images/articles/insights-articles.png"
                alt="insights and articles"
                className="w-5 lg:w-8"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full lg:flex-1 px-6 lg:px-8 pt-8 lg:pt-0">
            {/* Main Title */}
            <div className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-black text-[#23B14D] mb-4">
                INSIGHTS & <span className="text-black">ARTICLES</span>
              </h1>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                Field-Tested Ideas. Forward-Thinking Energy.
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                From the frontlines of energy transformation in Papua New Guinea
                to global innovation corridors —{" "}
                <span className="text-[#23B14D] font-semibold">GREEN</span>{" "}
                shares insights born of experience, powered by engineering and
                shared for impact.
              </p>
            </div>

            {/* Articles Grid */}
            <div className={`relative ${nav.isNavigationOpen?"":"z-[999999999999]"}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <Link
                    href={"/enlighten/insights-articles/"+article.slug}
                    key={article.id}
                    className="flex flex-col w-full border border-gray-200 rounded-md p-4 bg-white hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-3">
                      {article.title}
                    </h3>
                    <div className="flex space-x-4 flex-1">
                      <img
                        src={article.img}
                        alt={article.title}
                        className="w-24 h-24 object-cover rounded shrink-0"
                      />
                      <p className="text-gray-600 text-sm">
                        {article.description.slice(0, 80)}...
                      </p>
                    </div>
                    <div className="flex justify-end mt-3">
                      <img
                        src="/images/media-press/explore.png"
                        alt="exploreBtn"
                        className="w-28 h-auto"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Section */}
            <div className="my-4">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                Step into the minds of GREEN's engineers, innovators, and
                on-ground teams.
                <br />
                This is where ideas are not just imagined —{" "}
                <span className="text-[#23B14D] italic">
                  they're shaped by experience, tested in PNG terrain, and
                  shared to push the industry forward.
                </span>
              </h3>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end px-6 lg:px-8 mb-20 mt-4 cursor-pointer">
          <img
            src="/images/articles/want.png"
            alt="Want to contribute or feature Green's work?"
            className="max-w-full h-auto"
          />
        </div>
        {
          !(nav.isNavigationOpen) &&
        <Chatbot />
        }
      </div>
    </React.Fragment>
  );
};

export default Articles;
