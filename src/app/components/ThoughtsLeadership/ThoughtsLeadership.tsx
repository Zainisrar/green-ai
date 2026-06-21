"use client";
import React from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useThoughtLeadership } from "../../../hooks/useThoughtLeadership";
import { useInteractiveZIndex } from "../../../hooks/useInteractiveZIndex";
import { useNavigationState } from "@/hooks/useNavigationState";
import DiscoveryConsultation from "./Modals/DiscoveryConsultation";
import TechnicalDebrief from "./Modals/TechnicalDebrief";
// import { useNavigationState } from "@/hooks/useNavigationState";

interface Article {
  id: number;
  title: string;
  description: string;
  author: string;
  position: string;
  img: string;
  href: string;
  category: "opinion" | "keynote" | "policy" | "interview";
  date: string;
}

const ThoughtsLeadership = () => {
  // All hooks must be called before any conditional returns
  const nav=useNavigationState()
  const [isConsultationOpen, setIsConsultationOpen] = React.useState(false);
  const [isDebriefOpen, setIsDebriefOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );
  const articlesPerPage = 6;

  const { data: apiData } = useThoughtLeadership();
  
  // Keep minimal hooks for pagination and read more buttons only
  const prevButtonProps = useInteractiveZIndex();
  const nextButtonProps = useInteractiveZIndex();
  const readMoreHooks = Array.from({ length: 10 }, () => useInteractiveZIndex());
  // Provide stable pools of interactive hooks for pagination buttons and sidebar categories
  // Use fixed lengths to keep hook order/count stable across renders
  const pageButtonHooks = Array.from({ length: 20 }, () => useInteractiveZIndex());
  const sidebarCategoryHooks = Array.from({ length: 30 }, () => useInteractiveZIndex());

  // Transform API data to match component structure
  const allArticles: Article[] = React.useMemo(() => {
    if (!apiData) return [];

    return apiData.editorials.map((editorial, index) => {
      const writerName =
        editorial.writer && typeof editorial.writer === "object"
          ? editorial.writer.name?.trim()
          : `Writer ${editorial.writer}`;

      return {
      id: index + 1,
      title: editorial.title,
      description: editorial.description,
      author:
        writerName && writerName !== "Unknown User" ? writerName : "GREEN",
      position: "GREEN Leadership",
      img: editorial.featuredImg.src,
      href: editorial.cta.href || "#",
      category:
        (editorial.categories[0]?.toLowerCase().replace(/\s+/g, "-") as
          | "opinion"
          | "keynote"
          | "policy"
          | "interview") || "opinion",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      };
    });
  }, [apiData]);

  // Get unique categories from API data
  const uniqueCategories = React.useMemo(() => {
    if (!apiData) return [];

    const categories = new Set<string>();
    apiData.editorials.forEach((editorial) => {
      editorial.categories.forEach((category) => {
        categories.add(category);
      });
    });

    return Array.from(categories);
  }, [apiData]);

  // Group articles by category for sidebar (dynamic from API)
  const articlesByCategory = React.useMemo(() => {
    const categories: Record<string, Article[]> = {};

    uniqueCategories.forEach((category) => {
      const categoryKey = category.toLowerCase().replace(/\s+/g, "-");
      categories[categoryKey] = allArticles.filter(
        (article) => article.category === categoryKey
      );
    });

    return categories;
  }, [allArticles, uniqueCategories]);

  // Filter articles based on selected category
  const filteredArticles = selectedCategory
    ? (allArticles || []).filter(
        (article) => article.category === selectedCategory
      )
    : allArticles || [];

  // Calculate pagination
  const totalPages = Math.ceil(
    (filteredArticles || []).length / articlesPerPage
  );
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = (filteredArticles || []).slice(
    startIndex,
    startIndex + articlesPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const getCategoryTitle = (category: string) => {
    const foundCategory = uniqueCategories.find(
      (cat) => cat.toLowerCase().replace(/\s+/g, "-") === category
    );
    return foundCategory || "All Articles";
  };

  const renderPaginationButtons = () => {
    if (totalPages <= 1) return null;

    const buttons = [];

    // Previous button
    buttons.push(
      <div key="prev" {...prevButtonProps.getContainerProps()}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 text-2xl ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-600 hover:text-[#23B14D] cursor-pointer"
          }`}
        >
          ‹
        </button>
      </div>
    );

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        const pageButtonProps = pageButtonHooks[i - 1] || pageButtonHooks[0];
        buttons.push(
          <div key={i} {...pageButtonProps.getContainerProps()}>
            <button
              onClick={() => handlePageChange(i)}
              className={`px-3 py-2 rounded ${
                currentPage === i
                  ? "bg-[#23B14D] text-white font-bold"
                  : "text-gray-600 hover:text-[#23B14D] hover:bg-gray-100"
              }`}
            >
              {i}
            </button>
          </div>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        buttons.push(
          <span key={`ellipsis-${i}`} className="px-2 text-gray-400">
            ...
          </span>
        );
      }
    }

    // Next button
    buttons.push(
      <div key="next" {...nextButtonProps.getContainerProps()}>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 text-2xl ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-600 hover:text-[#23B14D] cursor-pointer"
          }`}
        >
          ›
        </button>
      </div>
    );

    return buttons;
  };

  if (!apiData) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="">
        <div className="">
        <TopNavigation />
        </div>
  <div className={`flex h-full ${nav.isNavigationOpen ? "pointer-events-none z-0" : "z-[999999999999999999999999999999999999999999]"}`}>
          {/* Left Side */}
          <div className="hidden lg:flex w-1/6 items-center justify-center">
            <div className="fixed top-1/4 left-4 lg:left-24">
              <img
                src="/images/thoughts-leadership/thought.png"
                alt="thought leadership"
                className="w-8"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className={`relative w-full lg:flex-1 lg:min-w-0 px-4 lg:px-8 pt-8 overflow-y-auto ${nav.isNavigationOpen ? "pointer-events-none" : "z-[999999999999999999999999999999999999999999]"}`}>
            {/* Main Title */}
            <div className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
                {apiData?.mainPage.title.toUpperCase() || "THOUGHT LEADERSHIP"}
              </h1>
              <h2 className="text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
                {apiData?.mainPage.subTitle || "Industry Insights"}
              </h2>
              <p className="text-gray-600 lg:text-lg mb-6">
                {apiData?.mainPage.description ||
                  "Expert perspectives on the future of green energy and sustainability."}
              </p>
            </div>

            {/* Category Filter */}
            <div className={`mb-6 relative ${nav.isNavigationOpen ? "z-0" : "z-[999999999999999999999999999999999999999999]"}`}>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCategoryFilter(null)}
                  disabled={nav.isNavigationOpen}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    nav.isNavigationOpen ? "cursor-default" : "cursor-pointer"
                  } ${
                    selectedCategory === null
                      ? "bg-[#23B14D] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  All Articles ({(allArticles || []).length})
                </button>
                {uniqueCategories.map((category, index) => {
                  const categoryKey = category
                    .toLowerCase()
                    .replace(/\s+/g, "-");
                  const categoryCount =
                    articlesByCategory[categoryKey]?.length || 0;

                  return (
                    <button
                      key={categoryKey}
                      onClick={() => handleCategoryFilter(categoryKey)}
                      disabled={nav.isNavigationOpen}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        nav.isNavigationOpen ? "cursor-default" : "cursor-pointer"
                      } ${
                        selectedCategory === categoryKey
                          ? "bg-[#23B14D] text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {category} ({categoryCount})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Featured Editorials / Speeches Section */}
            <div className="mb-8">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">
                {selectedCategory
                  ? getCategoryTitle(selectedCategory)
                  : apiData?.mainPage.editorialsTitle ||
                    "Featured Editorials / Speeches"}
              </h3>

              {(currentArticles || []).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                  {currentArticles.map((article, index) => {
                    const readMoreProps = readMoreHooks[index] || readMoreHooks[0];
                    
                    return (
                      <div
                        key={article.id}
                        className="flex flex-col h-full relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <img
                          src={article.img}
                          alt={article.title}
                          className="w-full h-40 object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "/images/thoughts-leadership/placeholder.png";
                          }}
                        />
                        <div className="flex flex-col flex-1 p-4">
                          <h4 className="font-bold text-gray-800 mb-2 text-base lg:text-lg line-clamp-2">
                            {article.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                            {article.description}
                          </p>
                          <div className="mt-auto flex justify-between items-end gap-3">
                            <div className="text-xs text-gray-500 min-w-0">
                              <div className="truncate">By {article.author}</div>
                              <div className="truncate">— {article.position}</div>
                              <div className="text-gray-400 mt-1">
                                {article.date}
                              </div>
                            </div>
                            <div {...readMoreProps.getContainerProps()}>
                              <button className="cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0">
                                <img
                                  src="/images/thoughts-leadership/readMore.png"
                                  alt="read more"
                                  className="h-9"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No articles found for the selected category.
                  </p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mb-8">
                  {renderPaginationButtons()}
                </div>
              )}

              {/* Results Info */}
              {(filteredArticles || []).length > 0 && (
                <div className="text-center text-sm text-gray-600 mb-4">
                  Showing {startIndex + 1}-
                  {Math.min(
                    startIndex + articlesPerPage,
                    (filteredArticles || []).length
                  )}{" "}
                  of {(filteredArticles || []).length} articles
                  {selectedCategory &&
                    ` in ${getCategoryTitle(selectedCategory)}`}
                </div>
              )}
            </div>

            {/* Bottom Quote */}
            <div className="text-center mb-8">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
                {
                  apiData?.mainPage.quote.text.split(
                    apiData.mainPage.quote.highlighted
                  )[0]
                }
                <span className="text-[#23B14D]">
                  {apiData?.mainPage.quote.highlighted}
                </span>
                {
                  apiData?.mainPage.quote.text.split(
                    apiData.mainPage.quote.highlighted
                  )[1]
                }
              </h3>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className={`hidden lg:block w-1/4 px-4 pt-8 ${nav.isNavigationOpen ? "pointer-events-none z-0" : "z-[999999999999999999999999999999999999999999]"}`}>
            {/* Categories */}
            <div className={`mb-8 space-y-4 ${nav.isNavigationOpen ? "z-0" : "z-[999999999999999999999999999999999999999999]"}`}>
              <h4 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">
                Browse by Category
              </h4>

              {/* All Articles button in sidebar */}
              <div className={`relative ${nav.isNavigationOpen ? "z-0" : "z-[999999999999999999999999999999999999999999]"}`}>
                <button
                  onClick={() => handleCategoryFilter(null)}
                  disabled={nav.isNavigationOpen}
                  className={`text-lg font-bold block w-full text-left ${
                    nav.isNavigationOpen ? "cursor-default" : "cursor-pointer"
                  } ${
                    selectedCategory === null
                      ? "text-[#23B14D]"
                      : "text-gray-800 hover:text-[#23B14D]"
                  }`}
                >
                  All Articles ({(allArticles || []).length})
                </button>
              </div>

              {uniqueCategories.map((category, index) => {
                const categoryKey = category.toLowerCase().replace(/\s+/g, "-");
                const categoryArticles = articlesByCategory[categoryKey] || [];
                const sidebarCategoryProps = sidebarCategoryHooks[index] || sidebarCategoryHooks[0];

                return (
                  <div key={categoryKey}>
                    <div 
                      {...sidebarCategoryProps.getContainerProps()}
                      className={`${sidebarCategoryProps.getContainerProps().className || ''}`}
                    >
                      <button
                        onClick={() => handleCategoryFilter(categoryKey)}
                        disabled={nav.isNavigationOpen}
                        className={`text-lg font-bold block w-full text-left ${
                          nav.isNavigationOpen ? "cursor-default" : "cursor-pointer"
                        } ${
                          selectedCategory === categoryKey
                            ? "text-[#23B14D]"
                            : "text-gray-800 hover:text-[#23B14D]"
                        }`}
                       
                      >
                        {category} ({categoryArticles.length})
                      </button>
                    </div>
                    {selectedCategory === categoryKey && (
                      <div className="text-sm text-gray-600 ml-4 mt-2 space-y-1">
                        {categoryArticles.slice(0, 6).map((article) => (
                          <div
                            key={article.id}
                            className="hover:text-[#23B14D] cursor-pointer"
                          >
                            {article.title}
                          </div>
                        ))}
                        {categoryArticles.length > 6 && (
                          <div className="text-gray-500">
                            +{categoryArticles.length - 6} more...
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {apiData?.mainPage.cta.map((ctaItem, index) => (
          <div
            key={index}
            className={`flex justify-end my-4 cursor-pointer px-4 lg:px-8 ${
              index === (apiData?.mainPage.cta || []).length - 1 ? "mb-40" : ""
            }`}
          >
            {index === 0 ? (
              <button
                type="button"
                onClick={() => setIsDebriefOpen(true)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img
                  src="/images/thoughts-leadership/request.png"
                  alt={ctaItem.text}
                  className="hover:opacity-80 transition-opacity"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsConsultationOpen(true)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img
                  src="/images/thoughts-leadership/book.png"
                  alt={ctaItem.text}
                  className="hover:opacity-80 transition-opacity"
                />
              </button>
            )}
          </div>
        ))}

        <Chatbot />
      </div>
      <TechnicalDebrief
        isOpen={isDebriefOpen}
        onClose={() => setIsDebriefOpen(false)}
      />
      <DiscoveryConsultation
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </React.Fragment>
  );
};

export default ThoughtsLeadership;
