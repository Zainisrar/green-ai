import React from "react";
import TopNavigation from "../../../components/TopNavigation/TopNavigation";
import Link from "next/link";

export default function NotFound() {
  return (
    <React.Fragment>
      <div className="">
        <TopNavigation />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h2>
            <p className="text-gray-600 mb-8 max-w-md">
              The article you're looking for doesn't exist or may have been moved. 
              Please check the URL or browse our available articles.
            </p>
            <div className="space-x-4">
              <button 
                onClick={() => window.history.back()}
                className="px-6 py-2 bg-[#23B14D] text-white rounded hover:bg-green-600 transition-colors"
              >
                Go Back
              </button>
              <Link 
                href="/enlighten/insights-articles"
                className="inline-block px-6 py-2 border border-[#23B14D] text-[#23B14D] rounded hover:bg-[#23B14D] hover:text-white transition-colors"
              >
                View All Articles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}