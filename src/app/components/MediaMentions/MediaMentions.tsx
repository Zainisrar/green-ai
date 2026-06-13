"use client";
import React, { useState, useMemo } from 'react'
import TopNavigation from '../TopNavigation/TopNavigation'
import Chatbot from '../Chatbot'
import { useMediaMentions } from '../../../hooks/useMediaMentions'
import { useNavigationState } from '@/hooks/useNavigationState';
// import { useNavigationState } from '@/hooks/useNavigationState';

interface MediaItem {
  id: number;
  title: string;
  source: string;
  year: number;
  thumbnail: string;
  type: 'video' | 'article';
  url?: string;
  video?: string;
}

interface YearData {
  year: number;
  count: number;
  items: MediaItem[];
}

const MediaMentions: React.FC = () => {
  const { data: apiData } = useMediaMentions();
  const nav=useNavigationState()
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const itemsPerPage = 3;

  // Transform API data to match component structure
  const mockMediaData: YearData[] = useMemo(() => {
    if (!apiData) return [];
    
    // Group highlights by year
    const yearGroups: Record<number, MediaItem[]> = {};
    
    apiData.mainPage.recentHighlights.forEach((highlight, index) => {
      const year = parseInt(highlight.year);
      const mediaItem: MediaItem = {
        id: index + 1,
        title: highlight.title,
        source: highlight.description.replace('–', '').trim(),
        year: year,
        thumbnail: highlight.featuredImg.src,
        type: highlight.video ? 'video' : 'article',
        url: highlight.video || '#',
        video: highlight.video,
      };
      
      if (!yearGroups[year]) {
        yearGroups[year] = [];
      }
      yearGroups[year].push(mediaItem);
    });
    
    // Convert to YearData format
    return Object.entries(yearGroups).map(([year, items]) => ({
      year: parseInt(year),
      count: items.length,
      items: items,
    })).sort((a, b) => b.year - a.year);
  }, [apiData]);

  // Get current year's data
  const currentYearData = useMemo(() => {
    return mockMediaData.find(data => data.year === selectedYear) || (mockMediaData[0] || { year: 2025, count: 0, items: [] });
  }, [selectedYear, mockMediaData]);

  // Calculate pagination
  const totalPages = Math.ceil((currentYearData.items || []).length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = (currentYearData.items || []).slice(startIndex, startIndex + itemsPerPage);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setCurrentPage(1); // Reset to first page when changing year
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleMediaClick = (item: MediaItem) => {
    if (item.type === 'video' && item.video) {
      // Toggle video player for this item
      setPlayingVideo(playingVideo === item.id ? null : item.id);
    } else if (item.url) {
      window.open(item.url, '_blank');
    }
  };

  if (!apiData) {
    return null;
  }

  return (
    <div className=" ">
      <TopNavigation />

      <div className={`${nav.isNavigationOpen ? "" : "z-[9999999999999]"} flex relative`}>
        {/* Left Side Icon */}
        <div className="lg:w-1/6 hidden lg:flex items-center justify-center">
          <div className="fixed top-1/4 left-14">
            <img
              src="/images/media-mentions/media-mentions.png"
              alt="media mentions"
              className="w-8 h-8 object-contain"
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full lg:w-2/3 px-4 lg:px-8 pt-8">
          {/* Main Title */}
          <div className="mb-8 lg:pl-0 pl-20">
            <h1 className="text-2xl lg:text-3xl font-black text-[#23B14D] mb-4">
              {apiData?.mainPage.title.toUpperCase() || "MEDIA & MENTIONS"}
            </h1>
            <h2 className="text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
              {apiData?.mainPage.subHeadline || "In the News"}
            </h2>
            <p className="text-gray-600 lg:text-lg mb-6">
              {apiData?.mainPage.description || "See how we are making headlines in the green energy sector."}
            </p>
          </div>

          {/* Recent Highlights Section */}
          <div className="mb-8">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">
              Recent Highlights - {selectedYear}
            </h3>
            
            {/* Media Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {currentItems.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                  onClick={() => handleMediaClick(item)}
                >
                  <div className="relative">
                    {playingVideo === item.id && item.type === 'video' && item.video ? (
                      <video
                        src={item.video}
                        controls
                        autoPlay
                        className="w-full h-32 object-cover"
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <>
                        <img 
                          src={item.thumbnail} 
                          alt={item.title}
                          className="w-full h-32 object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/images/media-mentions/placeholder.png";
                          }}
                        />
                        {item.type === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white bg-opacity-80 rounded-full p-2">
                              <div className="w-8 h-8 bg-[#23B14D] rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">▶</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500">{item.source}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-4 mb-8">
              <button 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`text-2xl transition-colors duration-200 ${
                  currentPage === 1 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-[#23B14D] hover:text-green-600 cursor-pointer'
                }`}
                aria-label="Previous page"
              >
                ‹
              </button>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
              
              <button 
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`text-2xl transition-colors duration-200 ${
                  currentPage === totalPages 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-[#23B14D] hover:text-green-600 cursor-pointer'
                }`}
                aria-label="Next page"
              >
                ›
              </button>
            </div>
          </div>

          {/* Bottom Quote */}
          <div className="text-center mb-8">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
              {apiData?.mainPage.key.text.split(apiData.mainPage.key.highlighted)[0]}
              <span className="text-[#23B14D]">{apiData?.mainPage.key.highlighted}</span>
              {apiData?.mainPage.key.text.split(apiData.mainPage.key.highlighted)[1]}
            </h3>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-1/4 px-4 pt-8">
          {/* Years Filter */}
          <div className="mb-8">
            <h4 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">Filter by Year</h4>
            <div className="space-y-2">
              {mockMediaData.map((yearData) => (
                <div key={yearData.year}>
                  <button
                    onClick={() => handleYearChange(yearData.year)}
                    className={`text-lg font-bold transition-colors duration-200 ${
                      selectedYear === yearData.year 
                        ? 'text-[#23B14D]' 
                        : 'text-gray-800 hover:text-[#23B14D]'
                    }`}
                  >
                    {yearData.year} ({yearData.count})
                  </button>
                  
                  {selectedYear === yearData.year && (
                    <div className="text-sm text-gray-600 ml-4 space-y-1 mt-2">
                      {yearData.items.slice(0, 6).map((item) => (
                        <div 
                          key={item.id}
                          className="cursor-pointer hover:text-[#23B14D] transition-colors duration-200"
                          onClick={() => handleMediaClick(item)}
                        >
                          {item.title}
                        </div>
                      ))}
                      {yearData.items.length > 6 && (
                        <div className="text-[#23B14D] font-semibold">
                          +{yearData.items.length - 6} more...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Media Request */}
      <div className="flex justify-end px-4 lg:px-8 my-8 mb-40">
        <a 
          href={apiData?.mainPage.cta[0]?.href || "#"}
          className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
        >
          <img
            src="/images/media-mentions/submit.png"
            alt={apiData?.mainPage.cta[0]?.text || "Submit Media Request"}
            className="h-12 object-contain"
          />
        </a>
      </div>
       
      <Chatbot />
    </div>
  )
}

export default MediaMentions