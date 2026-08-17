"use client";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface D6ChatbotProps {
  canvasAnchored?: boolean;
  triggerClassName?: string;
  triggerStyle?: React.CSSProperties;
  triggerVariant?: "default" | "figmaCanvas";
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isStreaming?: boolean;
}

const D6Chatbot: React.FC<D6ChatbotProps> = ({
  canvasAnchored = false,
  triggerClassName = "",
  triggerStyle,
  triggerVariant = "default",
}) => {
  const hasResponsiveTrigger = Boolean(triggerClassName);
  const isFigmaCanvasTrigger = triggerVariant === "figmaCanvas";
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [promptInputValue, setPromptInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const promptInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const behavior = messages.length > 0 ? "smooth" : "auto";
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend || isLoading) return;

    // If sending from prompt, open chat and clear prompt
    if (messageText) {
      setIsOpen(true);
      setPromptInputValue("");
    } else {
      setInputValue("");
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Create bot message for streaming
    const botMessageId = (Date.now() + 1).toString();
    const botMessage: Message = {
      id: botMessageId,
      text: "",
      sender: "bot",
      timestamp: new Date(),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, botMessage]);

    try {
      const response = await fetch(
        "https://api.infina.greendigitall.com/ask/stream-direct",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: textToSend,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const jsonStr = line.slice(6); // Remove 'data: ' prefix
                const data = JSON.parse(jsonStr);

                if (data.token) {
                  accumulatedText += data.token;
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === botMessageId
                        ? { ...msg, text: accumulatedText }
                        : msg,
                    ),
                  );
                } else if (data.type === "done") {
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === botMessageId
                        ? { ...msg, isStreaming: false }
                        : msg,
                    ),
                  );
                  break;
                }
              } catch {
                // Skip invalid JSON lines
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? {
                ...msg,
                text: "Sorry, I'm having trouble connecting right now. Please try again later.",
                isStreaming: false,
              }
            : msg,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePromptKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(promptInputValue);
    }
  };

  const handlePromptSubmit = () => {
    handleSendMessage(promptInputValue);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Chat Dialog */}
      {isOpen && (
        <div className="fixed z-[60] right-4 bottom-20 w-80 lg:w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-[#23B14D] text-white p-3 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#23B14D] font-bold text-lg">G</span>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Have a question?</h3>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleChat}
              className="text-white hover:bg-green-600 rounded-full p-1 transition-colors"
              aria-label="Close chat"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-[#23B14D] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <div className="bg-gray-200 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm text-gray-700">
                    Enter your question below and a representative will get
                    right back to you.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date().toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                    , {formatTime(new Date())}
                  </p>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.sender === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === "user" ? "bg-gray-300" : "bg-[#23B14D]"
                  }`}
                >
                  <span
                    className={`font-bold text-sm ${
                      message.sender === "user" ? "text-gray-600" : "text-white"
                    }`}
                  >
                    {message.sender === "user" ? "U" : "G"}
                  </span>
                </div>
                <div
                  className={`rounded-lg p-3 max-w-[80%] ${
                    message.sender === "user"
                      ? "bg-white border border-gray-200"
                      : "bg-gray-200"
                  }`}
                >
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {message.text}
                  </p>
                  {message.isStreaming && (
                    <div className="flex items-center mt-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(message.timestamp).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                    , {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white rounded-b-lg border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message"
                disabled={isLoading}
                className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#23B14D] focus:border-transparent text-sm disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className="bg-[#23B14D] text-white p-3 rounded-full hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                {isLoading ? (
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Trigger */}
      <div
        className={`${canvasAnchored ? "absolute" : "fixed"} z-[50] ${
          canvasAnchored ? "" : "right-1 lg:right-2 bottom-2"
        } ${triggerClassName}`}
        style={
          isFigmaCanvasTrigger
            ? {
                /* Canonical position from Figma node 7080:56395 — 418×52px */
                top: 899,
                left: 1498,
                width: 418,
                height: 52,
                right: "auto",
                bottom: "auto",
              }
            : canvasAnchored
              ? {
                  right: "calc(var(--d6-right-safe-inset, 0px) + 0.5rem)",
                  ...triggerStyle,
                }
              : triggerStyle
        }
      >
        <div
          className={
            isFigmaCanvasTrigger ? "relative h-[52px] w-[418px]" : "relative"
          }
        >
          {isFigmaCanvasTrigger ? (
            <>
              {/*
               * Parallelogram trigger — same CSS pattern as the Energy page Chatbot.
               * Outer div uses skewX(-16deg) to create the slant; inner div counter-
               * rotates with skewX(16deg) to keep text/icon upright.
               * Matches Figma node 7080:65088: 418×52px, green left border, white
               * semi-transparent fill with backdrop-blur, green shadow.
               */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: "skewX(-16deg)",
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  borderLeft: "3px solid #23B14D",
                  borderTop: "1px solid rgba(209,213,219,0.8)",
                  borderRight: "1px solid rgba(209,213,219,0.8)",
                  borderBottom: "1px solid rgba(209,213,219,0.8)",
                  boxShadow: "4px 4px 20px 1px rgba(93,222,60,0.25), 0 4px 20px rgba(0,0,0,0.06)",
                  borderRadius: "2px",
                }}
              >
                <div
                  style={{
                    transform: "skewX(16deg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "100%",
                    padding: "0 18px 0 22px",
                  }}
                >
                  <input
                    ref={promptInputRef}
                    type="text"
                    value={promptInputValue}
                    onChange={(e) => setPromptInputValue(e.target.value)}
                    onKeyDown={handlePromptKeyDown}
                    placeholder="Let's Talk Energy"
                    aria-label="Let's Talk Energy"
                    style={{
                      flex: 1,
                      border: 0,
                      background: "transparent",
                      outline: "none",
                      fontSize: 13,
                      fontWeight: 600,
                      fontStyle: "italic",
                      color: "#1a1a1a",
                      cursor: "text",
                      fontFamily: "var(--font-montserrat, Montserrat, sans-serif)",
                      letterSpacing: "0.2px",
                    }}
                  />
                  <button
                    type="button"
                    aria-label="Send prompt"
                    style={{
                      flexShrink: 0,
                      border: 0,
                      background: "transparent",
                      padding: 0,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      transition: "transform 0.15s",
                    }}
                    onClick={handlePromptSubmit}
                  >
                    <img
                      src="/images/mike.svg"
                      alt="Send message"
                      style={{ display: "block", width: 16, height: 16, opacity: 0.7 }}
                    />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <img
                src="/images/letstalkenergy.png"
                alt="call to action"
                className="w-62 lg:w-auto"
              />
              <div
                className={
                  hasResponsiveTrigger
                    ? "absolute top-[47%] left-[12%] right-[19%] -translate-y-1/2"
                    : "absolute bottom-4 lg:bottom-10 left-12 lg:left-14 right-12 lg:right-20"
                }
              >
                <input
                  ref={promptInputRef}
                  type="text"
                  value={promptInputValue}
                  onChange={(e) => setPromptInputValue(e.target.value)}
                  onKeyDown={handlePromptKeyDown}
                  placeholder="Let's Talk Energy"
                  className={
                    hasResponsiveTrigger
                      ? "w-full bg-transparent text-[clamp(13px,1vw,18px)] font-semibold italic text-gray-900 outline-none placeholder:text-gray-900 placeholder:opacity-100"
                      : "outline-none placeholder:text-gray-900 placeholder:opacity-100 text-gray-900 font-semibold italic w-full text-base bg-transparent"
                  }
                />
              </div>
              <button
                type="button" aria-label="Send prompt"
                className={
                  hasResponsiveTrigger
                    ? "absolute top-1/2 right-[10%] -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 transition-transform hover:scale-110"
                    : "absolute bottom-5 lg:bottom-10 right-7 lg:right-20 cursor-pointer border-0 bg-transparent p-0 hover:scale-110 transition-transform"
                }
                onClick={handlePromptSubmit}
              >
                <img src="/images/mike.svg" alt="Send message" className="w-3 lg:w-auto" />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default D6Chatbot;
