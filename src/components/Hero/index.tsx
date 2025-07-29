"use client";
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
  const [titleText, setTitleText] = useState("Welcome to Dimetric");
  const [descriptionText, setDescriptionText] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch("/api/managment/WelcomeMessage");

        if (!response.ok) throw new Error("Failed to fetch welcome message");

        const data = await response.json();
        setTitleText(data[0].title);
        setDescriptionText(data[0].description);
      } catch (error) {
        console.error("Error fetching welcome message:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white dark:bg-gray-dark h-screen flex items-center justify-center"
    >
      {/* Background Video */}
      <video
        className="absolute left-0 top-0 z-0 h-full w-full object-cover"
        src="/images/video/v1.mp4"
        autoPlay
        muted
        playsInline
      />
      {/* Overlay */}
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/40" />
      {/* Content */}
      <div className="relative z-20 max-w-[800px] px-4 text-center text-white">
        {/* Title */}
        <div className="mb-5 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl min-h-[80px] flex items-center justify-center">
          {loading ? (
            <div className="h-10 w-[60%] animate-pulse rounded bg-gray-300 dark:bg-gray-600" />
          ) : (
            titleText
          )}
        </div>
        {/* Description */}
        {loading ? (
          <div className="mb-12 flex flex-col items-center space-y-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-4 w-[90%] animate-pulse rounded-sm bg-gray-300 dark:bg-gray-600"
              />
            ))}
          </div>
        ) : (
          <div className="mb-12 text-base sm:text-lg md:text-xl min-h-[120px] flex items-start justify-center">
            <Typewriter
              words={[descriptionText]}
              loop={1}
              cursor={showCursor}
              
              typeSpeed={25}
              deleteSpeed={50}
              delaySpeed={1000}
              onLoopDone={() => setShowCursor(false)}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
