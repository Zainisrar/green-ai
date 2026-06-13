"use client";
import React from "react";
import TopNavigation from "../TopNavigation/TopNavigation";
import Chatbot from "../Chatbot";
import { useEventsWebinars } from "../../../hooks/useEventsWebinars";
import { useNavigationState } from "@/hooks/useNavigationState";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  img: string;
  href: string;
  year: number;
  type: "upcoming" | "past";
}

const EventsWebinars = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedYear, setSelectedYear] = React.useState<number | null>(null);
  const [eventType, setEventType] = React.useState<"all" | "upcoming" | "past">(
    "all"
  );
  const eventsPerPage = 4;

  const { data: apiData, isLoading, error } = useEventsWebinars();

  // Transform API data to match component structure
  const allEvents: Event[] = React.useMemo(() => {
    if (!apiData) return [];

    return apiData.upcomingEvents.map((event, index) => ({
      id: index + 1,
      title: event.title,
      description: event.description,
      date: event.year, // Using year as date since API doesn't have specific date
      location: event.location,
      img: event.featuredImg.src,
      href: event.cta.href || "#",
      year: parseInt(event.year.split(" ")[1]) || new Date().getFullYear(), // Extract year from "August 2025"
      type: "upcoming" as const,
    }));
  }, [apiData]);



  if (error) {
    return (
      <React.Fragment>
        <div className="">
          <TopNavigation />
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-xl text-red-600">
              Error loading events. Please try again later.
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  // Filter events based on selected criteria
  const filteredEvents = allEvents.filter((event) => {
    const yearMatch = selectedYear ? event.year === selectedYear : true;
    const typeMatch = eventType === "all" ? true : event.type === eventType;
    return yearMatch && typeMatch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = filteredEvents.slice(
    startIndex,
    startIndex + eventsPerPage
  );

  // Group events by year for sidebar
  const eventsByYear = allEvents.reduce((acc, event) => {
    if (!acc[event.year]) {
      acc[event.year] = [];
    }
    acc[event.year].push(event);
    return acc;
  }, {} as Record<number, Event[]>);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleYearFilter = (year: number | null) => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  const handleTypeFilter = (type: "all" | "upcoming" | "past") => {
    setEventType(type);
    setCurrentPage(1);
  };

  const renderPaginationButtons = () => {
    if (totalPages <= 1) return null;

    const buttons = [];

    // Previous button
    buttons.push(
      <button
        key="prev"
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
    );

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-2 rounded ${
              currentPage === i
                ? "bg-[#23B14D] text-white font-bold"
                : "text-gray-600 hover:text-[#23B14D] hover:bg-gray-100"
            }`}
          >
            {i}
          </button>
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
      <button
        key="next"
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
    );

    return buttons;
  };

  const nav=useNavigationState()
  return (
    <React.Fragment>
      <div className="">
        <TopNavigation />
        <div className={`flex relative ${nav.isNavigationOpen?"":"z-[99999999999999999]"} h-full`}>
          {/* Left Side */}
          <div className="lg:flex hidden lg:w-1/6 items-center justify-center">
            <div className="fixed top-1/4 left-14">
              <img
                src="/images/events/events.png"
                alt="Events and Webinars"
                className="w-8"
              />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full lg:w-2/3 px-4 lg:px-8 pt-8">
            {/* Main Title */}
            <div className="mb-8 pl-20 lg:pl-0">
              <h1 className="text-2xl lg:text-3xl font-black text-[#23B14D] mb-4">
                {apiData?.mainPage.title.toUpperCase() || "EVENTS & WEBINARS"}
              </h1>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
                {apiData?.mainPage.subHeadline ||
                  "Where Innovation Meets Action."}
              </h2>
              <p className="text-gray-600 lg:text-lg mb-6">
                {apiData?.mainPage.description ||
                  "From masterclasses to ministerial panels — GREEN's events bring people together to solve energy challenges that matter."}
              </p>
            </div>

            {/* Event Type Filter */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleTypeFilter("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    eventType === "all"
                      ? "bg-[#23B14D] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  All Events ({allEvents.length})
                </button>
                <button
                  onClick={() => handleTypeFilter("upcoming")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    eventType === "upcoming"
                      ? "bg-[#23B14D] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Upcoming (
                  {allEvents.filter((e) => e.type === "upcoming").length})
                </button>
                <button
                  onClick={() => handleTypeFilter("past")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    eventType === "past"
                      ? "bg-[#23B14D] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Past Events (
                  {allEvents.filter((e) => e.type === "past").length})
                </button>
              </div>
            </div>

            {/* Events Section */}
            <div className="mb-8">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6">
                {eventType === "upcoming"
                  ? "Upcoming Events"
                  : eventType === "past"
                  ? "Past Events"
                  : "All Events"}
              </h3>

              {currentEvents.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {currentEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border border-gray-200 relative rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={event.img}
                        alt={event.title}
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/images/events/placeholder.png";
                        }}
                      />
                      <div className="p-4">
                        <h4 className="font-bold text-gray-800 text-lg lg:text-xl mb-2">
                          {event.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {event.description}
                        </p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src="/images/events/calendar.png"
                              className="w-4 h-4"
                              alt="calendar"
                            />
                            <span className="font-medium text-gray-700 text-sm">
                              {event.date}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <img
                              src="/images/events/location.png"
                              className="w-4 h-4"
                              alt="location"
                            />
                            <span className="font-medium text-gray-700 text-sm">
                              {event.location}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <a
                            href={event.href}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                          >
                            <img
                              src="/images/events/registerBtn.png"
                              className="h-8"
                              alt="register for event"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No events found for the selected criteria.
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
              {filteredEvents.length > 0 && (
                <div className="text-center text-sm text-gray-600 mb-4">
                  Showing {startIndex + 1}-
                  {Math.min(startIndex + eventsPerPage, filteredEvents.length)}{" "}
                  of {filteredEvents.length} events
                  {selectedYear && ` for ${selectedYear}`}
                  {eventType !== "all" && ` (${eventType})`}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block w-1/4 px-4 pt-8">
            {/* Years Filter */}
            <div className="mb-8">
              <h4 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">
                Filter by Year
              </h4>
              <div className="space-y-2">
                <button
                  onClick={() => handleYearFilter(null)}
                  className={`text-lg font-bold block w-full text-left ${
                    selectedYear === null
                      ? "text-[#23B14D]"
                      : "text-gray-800 hover:text-[#23B14D]"
                  }`}
                >
                  All Years ({allEvents.length})
                </button>

                {Object.entries(eventsByYear)
                  .sort(([a], [b]) => Number(b) - Number(a))
                  .map(([year, events]) => (
                    <div key={year}>
                      <button
                        onClick={() => handleYearFilter(Number(year))}
                        className={`text-lg font-bold block w-full text-left ${
                          selectedYear === Number(year)
                            ? "text-[#23B14D]"
                            : "text-gray-800 hover:text-[#23B14D]"
                        }`}
                      >
                        {year} ({events.length})
                      </button>
                      {selectedYear === Number(year) && (
                        <div className="text-sm text-gray-600 ml-4 mt-2 space-y-1">
                          {events.slice(0, 6).map((event) => (
                            <div
                              key={event.id}
                              className="hover:text-[#23B14D] cursor-pointer"
                            >
                              {event.title}
                            </div>
                          ))}
                          {events.length > 6 && (
                            <div className="text-gray-500">
                              +{events.length - 6} more...
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* Quote Box */}
            <div className="italic flex relative">
              <div>
                <img
                  src="/images/reports/shape1.png"
                  alt="Shape"
                  className="absolute -left-12 top-14 w-12"
                />
              </div>
              <div className="">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
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
              <div>
                <img
                  src="/images/reports/shape2.png"
                  alt="Shape"
                  className="-mt-4 -ml-4"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end my-4 mb-40 cursor-pointer px-4 lg:px-8">
          <a href={apiData?.mainPage.cta[0]?.href || "#"}>
            <img
              src="/images/events/host.png"
              alt={apiData?.mainPage.cta[0]?.text || "Host with Green"}
            />
          </a>
        </div>

        <Chatbot />
      </div>
    </React.Fragment>
  );
};

export default EventsWebinars;
