"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const AboutSectionTwo = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/wasteManagementFeatures");
        if (!res.ok) {
          throw new Error("Failed to fetch about data");
        }
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="py-6 md:py-20 lg:py-20">
      <div className="container">
        {/* العنوان */}
        <div className="w-full px-4 text-start mb-1">
          {loading ? (
            <div className="h-10 w-1/2 rounded bg-gray-300 dark:bg-gray-500 animate-pulse" />
          ) : (
            <h1 className="text-4xl font-bold text-black dark:text-white">
              {data[0]?.section_title ?? "Section Title"}
            </h1>
          )}
        </div>

        {/* الأعمدة: صورة + نص */}
        <div className="-mx-4 flex flex-wrap items-center">
          {/* الصورة */}
          <div className="w-full px-4 lg:w-1/2">
            <div className="relative mx-auto mb-12 flex aspect-square items-center justify-center text-center lg:m-0">
              {loading ? (
                <div className="h-[400px] w-[400px] rounded-2xl bg-gray-300 dark:bg-gray-500 animate-pulse" />
              ) : (
                <>
                  <Image
                    src="/images/about/COMPOSTING.jpg"
                    alt="about image"
                    width={700}
                    height={700}
                    className="rounded-2xl drop-shadow-three dark:hidden dark:drop-shadow-none"
                  />
                  <Image
                    src="/images/about/COMPOSTING.jpg"
                    alt="about image"
                    width={700}
                    height={700}
                    className="hidden rounded-2xl drop-shadow-three dark:block dark:drop-shadow-none"
                  />
                </>
              )}
            </div>
          </div>

          {/* النصوص */}
          <div className="w-full px-12 lg:w-1/2">
            <div className="max-w-[470px]">
              {loading ? (
                // Skeleton للعناصر
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="mb-6 animate-pulse space-y-2">
                    <div className="h-6 w-2/3 rounded bg-gray-300 dark:bg-gray-500" />
                    <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-500" />
                    <div className="h-4 w-5/6 rounded bg-gray-300 dark:bg-gray-500" />
                  </div>
                ))
              ) : (
                data.map((item, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="mb-2 text-xl font-bold text-black dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
                      {item.description}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
