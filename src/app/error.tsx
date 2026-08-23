"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useInteractiveZIndex } from "@/hooks/useInteractiveZIndex";
import TopNavigation from "./components/TopNavigation/TopNavigation";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalError = ({ error, reset }: ErrorProps) => {
  const retryButtonProps = useInteractiveZIndex();
  const homeButtonProps = useInteractiveZIndex();

  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <TopNavigation />

      <div className="flex items-center justify-center min-h-screen px-4 -mt-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <svg
                aria-hidden="true"
                className="w-12 h-12 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-none">
              Oops!
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Something went wrong
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              We encountered an unexpected error while processing your request.
            </p>
            <p className="text-base text-gray-500 mb-6">
              Please try again. If the issue continues, contact our support
              team.
            </p>

            {/* Error Details (only in development) */}
            {process.env.NODE_ENV === "development" && (
              <details className="text-left bg-gray-100 p-4 rounded-lg mb-6">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
                  Error Details (Development Only)
                </summary>
                <pre className="text-xs text-red-600 overflow-auto">
                  {error.message}
                  {error.stack && (
                    <>
                      {"\n\nStack Trace:\n"}
                      {error.stack}
                    </>
                  )}
                </pre>
              </details>
            )}
          </div>

          {/* Decorative Element */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Image
                src="/images/heroSection/logo.png"
                alt="GREEN Logo"
                width={256}
                height={64}
                className="h-16 w-auto opacity-50"
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div {...retryButtonProps.getContainerProps()}>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center px-8 py-3 font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Try Again
              </button>
            </div>

            <div {...homeButtonProps.getContainerProps()}>
              <Link
                href="/"
                className="inline-flex items-center px-8 py-3 border-2 border-red-500 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:scale-105"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Go Home
              </Link>
            </div>
          </div>

          {/* Support Information */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              If this problem persists, please contact our support team:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a
                href="mailto:info@green.com.pg"
                className="text-red-600 hover:text-red-700 hover:underline"
              >
                info@green.com.pg
              </a>
              <span className="text-gray-300">|</span>
              <Link
                href="/engage/reach-us"
                className="text-red-600 hover:text-red-700 hover:underline"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default GlobalError;
