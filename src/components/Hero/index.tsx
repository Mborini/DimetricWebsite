"use client";
import { useEffect, useState } from "react";

const Hero = () => {
  const [title, setTitle] = useState("Welcome to Dimetric");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch("/api/managment/WelcomeMessage");

        if (!response.ok) {
          throw new Error("Failed to fetch welcome message");
        }
        const data = await response.json();
        setTitle(data[0].title);
        setDescription(data[0].description);
      } catch (error) {
        console.error("Error fetching welcome message:", error);
      }
    };
    fetchMessage();
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white dark:bg-gray-dark"
    >
      {/* ✅ Background Video */}
      <video
        className="absolute left-0 top-0 z-0 h-full w-full object-cover"
        src="/images/video/v1.mp4"
        autoPlay
        muted
        playsInline
      />

      {/* ✅ Overlay for better text visibility (optional) */}
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/40" />

      {/* ✅ Content */}
      <div className="relative z-20 pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center text-white">
                <h1 className="mb-5 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                  {title}
                </h1>
                {description ? (
                  <p className="mb-12 text-base sm:text-lg md:text-xl">
                    {description}
                  </p>
                ) : (
                  <div className="mb-12 flex flex-col items-center space-y-2">
                    {/* Skeleton Loading */}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="h-4 w-[90%] animate-pulse rounded-sm bg-gray-300 dark:bg-gray-600"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
