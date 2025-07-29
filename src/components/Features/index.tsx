"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Typewriter } from "react-simple-typewriter";
import { Feature } from "@/types/feature";
import SingleFeature from "./SingleFeature";

const SolutionsAndFeatures = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await fetch("/api/solutions");
        const data = await res.json();
        setFeatures(data);
      } catch (error) {
        console.error("Failed to fetch features:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  useEffect(() => {
    if (inView) {
      setStartTyping(true);
    }
  }, [inView]);

  return (
    <section
      id="features"
      className="relative py-16 md:py-20 lg:py-28 h-[600px] overflow-hidden"
    >
      {/* خلفية بصورة مع أوبيستي */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 -z-10"
        style={{ backgroundImage: "url('/images/hero/m2.png')" }}
      />

      <div className="container">
        <h1
          ref={ref}
          className="mb-20 text-5xl font-bold text-center text-black dark:text-white min-h-[60px]"
        >
          {startTyping ? (
            <Typewriter
              words={["Our Solutions & Features"]}
              loop={1}
              cursor={false}
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={0}
              delaySpeed={1000}
            />
          ) : (
            ""
          )}
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse space-y-4 rounded-lg bg-gray-100 p-6 dark:bg-neutral-800"
              >
                <div className="h-8 w-2/3 rounded bg-gray-300 dark:bg-gray-500" />
                <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-500" />
                <div className="h-4 w-5/6 rounded bg-gray-300 dark:bg-gray-500" />
                <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-500" />
                <div className="h-4 w-5/6 rounded bg-gray-300 dark:bg-gray-500" />
                <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-500" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SolutionsAndFeatures;
