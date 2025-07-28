"use client";

import { useEffect, useState } from "react";
import { Feature } from "@/types/feature";
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";

const SolutionsAndFeatures = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section id="features" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <h1 className="mb-20 text-5xl font-bold text-center text-black dark:text-white">
          Our Solutions & Features
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
