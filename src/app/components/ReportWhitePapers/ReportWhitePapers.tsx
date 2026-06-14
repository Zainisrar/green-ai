"use client";
import React from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useReportsWhitepapers } from "../../../hooks/useReportsWhitepapers";

interface Report {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  img: string;
  href: string;
  year: number;
}

const ReportWhitePapers = () => {
  const [grid, setGrid] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedYear, setSelectedYear] = React.useState<number | null>(null);
  const reportsPerPage = 6;

  const { data: apiReports } = useReportsWhitepapers();

  // Transform API data to match component structure
  const allReports: Report[] = React.useMemo(() => {
    if (!apiReports) return [];
    
    return apiReports.map(report => ({
      id: report.id,
      title: report.title,
      subTitle: report.subtitle,
      description: report.description,
      img: report.featuredImg.src,
      href: report.pptx,
      year: parseInt(report.year),
    }));
  }, [apiReports]);

  if (!apiReports) {
    return null;
  }

  // Filter reports by selected year
  const filteredReports = selectedYear 
    ? allReports.filter(report => report.year === selectedYear)
    : allReports;

  // Calculate pagination
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);
  const startIndex = (currentPage - 1) * reportsPerPage;
  const currentReports = filteredReports.slice(startIndex, startIndex + reportsPerPage);

  // Group reports by year for sidebar
  const reportsByYear = allReports.reduce((acc, report) => {
    if (!acc[report.year]) {
      acc[report.year] = [];
    }
    acc[report.year].push(report);
    return acc;
  }, {} as Record<number, Report[]>);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleYearFilter = (year: number | null) => {
    setSelectedYear(year);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    
    // Previous buttons
    buttons.push(
      <button 
        key="first"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className={`px-2 py-1 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:text-[#23B14D] cursor-pointer'}`}
      >
        «
      </button>
    );
    
    buttons.push(
      <button 
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-2 py-1 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:text-[#23B14D] cursor-pointer'}`}
      >
        ‹
      </button>
    );

    // Page number buttons
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 ${
            currentPage === i 
              ? 'font-bold text-[#23B14D]' 
              : 'text-gray-600 hover:text-[#23B14D] cursor-pointer'
          }`}
        >
          {i}
        </button>
      );
    }

    // Next buttons
    buttons.push(
      <button 
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-2 py-1 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:text-[#23B14D] cursor-pointer'}`}
      >
        ›
      </button>
    );
    
    buttons.push(
      <button 
        key="last"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`px-2 py-1 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:text-[#23B14D] cursor-pointer'}`}
      >
        »
      </button>
    );

    return buttons;
  };

  return (
    <React.Fragment>
      <div className="">
        <TopNavigation />
          
        <div className="flex h-full lg:mb-0 mb-20">
          {/* Left Side */}
          <div className="hidden lg:flex w-1/6 items-center justify-center">
            <div className="fixed top-1/4 left-4 lg:left-24">
              <img
                className="w-5 lg:w-8"
                src="/images/reports/reports.png"
                alt="reports and whitepapers"
              />
            </div>
          </div>

          {/* Main Content Area */}

          <div className="w-full lg:flex-1 lg:min-w-0 px-4 lg:px-8 pt-8">
            {/* Main Title */}
            <div className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-black text-gray-800 mb-4">
                <span className="text-[#23B14D]">REPORTS &</span> WHITEPAPERS
              </h1>
              <h2 className="text-xl lg:text-2xl font-bold text-[#23B14D] italic mb-4">
                Research that powers policy, investment, and innovation.
              </h2>
              <p className="text-gray-600 text-base mb-6">
                From remote microgrids to intelligent hybrid architectures — our
                work in the field is driving data-based insights, engineering
                frameworks, and decision-grade research.{" "}
                <span className="text-[#23B14D] font-semibold">GREEN</span>{" "}
                publishes original reports to inform ministries, funders, policy
                developers, and sector innovators shaping the energy transition
                across PNG and beyond.
              </p>
            </div>

            {/* Reports Section */}
            <div className="mb-8">
              {/* View Toggle Header */}
                <div className="lg:hidden flex flex-col px-6">
            {/* Years Filter */}
            <div className="mb-8">
              <div className="space-y-2">
                <button
                  onClick={() => handleYearFilter(null)}
                  className={`text-lg font-bold block w-full text-left ${
                    selectedYear === null ? 'text-[#23B14D]' : 'text-gray-800 hover:text-[#23B14D]'
                  }`}
                >
                  All Years ({allReports.length})
                </button>
                
                {Object.entries(reportsByYear)
                  .sort(([a], [b]) => Number(b) - Number(a))
                  .map(([year, reports]) => (
                    <div key={year}>
                      <button
                        onClick={() => handleYearFilter(Number(year))}
                        className={`text-lg font-bold block w-full text-left ${
                          selectedYear === Number(year) ? 'text-[#23B14D]' : 'text-gray-800 hover:text-[#23B14D]'
                        }`}
                      >
                        {year} ({reports.length})
                      </button>
                      {selectedYear === Number(year) && (
                        <div className="text-sm text-gray-600 ml-4 mt-2 space-y-1">
                          {reports.slice(0, 6).map((report) => (
                            <div key={report.id} className="hover:text-[#23B14D] cursor-pointer">
                              {report.title}
                            </div>
                          ))}
                          {reports.length > 6 && (
                            <div className="text-gray-500">
                              +{reports.length - 6} more...
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

          </div>
              <div className={`flex items-center px-6 ${grid ? "justify-between" : "justify-end"}`}>
                
                {grid && (
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800">Title</h3>
                )}
                <div className="flex items-center space-x-4">
                  <div
                    onClick={() => setGrid(true)}
                    className={`cursor-pointer p-2 rounded ${grid ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  >
                    <img src="/images/reports/threeBar.png" alt="list view" />
                  </div>
                  <div
                    onClick={() => setGrid(false)}
                    className={`cursor-pointer p-2 rounded ${!grid ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                  >
                    <img src="/images/reports/grid.png" alt="grid view" />
                  </div>
                </div>
              </div>

              {/* Reports Display */}
              <div className="divide-y divide-gray-200">
                {grid ? (
                  // List View
                  currentReports.map((report) => (
                    <div key={report.id} className="flex lg:flex-row flex-col gap-4 items-start lg:items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-800 break-words">
                          {report.title}
                        </h4>
                        <span className="text-sm text-[#23B14D] shrink-0">
                          {report.subTitle}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 shrink-0">
                        <a 
                          href={"https://g-stack.green.com.pg/"+report.href} 
                          download
                          className="cursor-pointer hover:opacity-80 transition-opacity"
                        >
                          <img
                            src="/images/reports/download.png"
                            alt="download report"
                          />
                        </a>
                        <a 
                          href={"https://g-stack.green.com.pg/"+report.href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="cursor-pointer hover:opacity-80 transition-opacity"
                        >
                          <img src="/images/reports/view.png" alt="view report" />
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  // Grid View
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
                    {currentReports.map((report) => (
                      <div
                        key={report.id}
                        className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="relative">
                          <img
                            src={report.img}
                            alt={report.title}
                            className="w-full h-40 object-cover"
                          />
                          <span className="absolute top-3 left-3 bg-[#23B14D] text-white text-xs font-semibold px-2 py-1 rounded">
                            {report.year}
                          </span>
                        </div>
                        <div className="flex flex-col flex-1 p-4">
                          <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-1 line-clamp-2">
                            {report.title}
                          </h3>
                          <h4 className="text-base font-semibold mb-3 text-[#23B14D] line-clamp-1">
                            {report.subTitle}
                          </h4>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {report.description}
                          </p>
                          <div className="flex items-center justify-end gap-3 mt-auto pt-2 border-t border-gray-100">
                            <a
                              href={"https://g-stack.green.com.pg/"+report.href}
                              download
                              className="cursor-pointer hover:opacity-80 transition-opacity"
                            >
                              <img
                                src="/images/reports/download.png"
                                alt="download report"
                              />
                            </a>
                            <a
                              href={"https://g-stack.green.com.pg/"+report.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="cursor-pointer hover:opacity-80 transition-opacity"
                            >
                              <img
                                src="/images/media-press/explore.png"
                                alt="explore report"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mb-8">
                {renderPaginationButtons()}
              </div>
            )}

            {/* Results Info */}
            <div className="text-center text-sm text-gray-600 mb-4">
              Showing {startIndex + 1}-{Math.min(startIndex + reportsPerPage, filteredReports.length)} of {filteredReports.length} reports
              {selectedYear && ` for ${selectedYear}`}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:block hidden lg:w-1/4 px-4 pt-8">
            {/* Years Filter */}
            <div className="mb-8">
              <div className="space-y-2">
                <button
                  onClick={() => handleYearFilter(null)}
                  className={`text-lg font-bold block w-full text-left ${
                    selectedYear === null ? 'text-[#23B14D]' : 'text-gray-800 hover:text-[#23B14D]'
                  }`}
                >
                  All Years ({allReports.length})
                </button>
                
                {Object.entries(reportsByYear)
                  .sort(([a], [b]) => Number(b) - Number(a))
                  .map(([year, reports]) => (
                    <div key={year}>
                      <button
                        onClick={() => handleYearFilter(Number(year))}
                        className={`text-lg font-bold block w-full text-left ${
                          selectedYear === Number(year) ? 'text-[#23B14D]' : 'text-gray-800 hover:text-[#23B14D]'
                        }`}
                      >
                        {year} ({reports.length})
                      </button>
                      {selectedYear === Number(year) && (
                        <div className="text-sm text-gray-600 ml-4 mt-2 space-y-1">
                          {reports.slice(0, 6).map((report) => (
                            <div key={report.id} className="hover:text-[#23B14D] cursor-pointer">
                              {report.title}
                            </div>
                          ))}
                          {reports.length > 6 && (
                            <div className="text-gray-500">
                              +{reports.length - 6} more...
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* Quote Box */}
            <div className="italic relative mt-6">
              <img
                src="/images/reports/shape1.png"
                alt=""
                role="presentation"
                className="pointer-events-none absolute top-0 left-0 w-8 h-auto"
              />
              <h3 className="relative z-10 px-10 py-12 text-lg lg:text-xl font-bold leading-relaxed text-gray-800">
                We Don't Just <span className="text-[#23B14D]">Build</span> Systems.
                We Build <span className="text-[#23B14D]">Evidence.</span>
              </h3>
              <img
                src="/images/reports/shape2.png"
                alt=""
                role="presentation"
                className="pointer-events-none absolute bottom-0 right-0 w-8 h-auto"
              />
            </div>
          </div>
        </div>
  
        <Chatbot />
      </div>
    </React.Fragment>
  );
};

export default ReportWhitePapers;