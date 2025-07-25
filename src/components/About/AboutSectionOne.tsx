"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const AboutSectionOne = () => {
  const [paragraph, setParagraph] = useState("");
  const [loading, setLoading] = useState(true); // 🔸 حالة التحميل

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/Vision");
        const data = await res.json();
        setParagraph(data?.[0]?.description || "");
      } catch (error) {
        console.error("Failed to fetch paragraph:", error);
      } finally {
        setLoading(false); // 🔸 انتهاء التحميل
      }
    };

    fetchData();
  }, []);

  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-20">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl lg:text-[40px]/[48px]">
                Our Vision
              </h2>

              {loading ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-500" />
                  <div className="h-4 w-11/12 rounded bg-gray-300 dark:bg-gray-500" />
                  <div className="h-4 w-10/12 rounded bg-gray-300 dark:bg-gray-500" />
                  <div className="h-4 w-9/12 rounded bg-gray-300 dark:bg-gray-500" />
                  <div className="h-4 w-8/12 rounded bg-gray-300 dark:bg-gray-500" />
                </div>
              ) : (
                <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  {paragraph}
                </p>
              )}
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div className="relative mx-auto flex aspect-[25/24] max-w-[700px] items-center justify-center lg:mr-0">
                <Image
                  src="/images/about/Wastewater.jpg"
                  alt="about-image"
                  width={700}
                  height={700}
                  className="mx-auto max-w-full rounded-2xl drop-shadow-three dark:hidden dark:drop-shadow-none"
                />
                <Image
                  src="/images/about/Wastewater.jpg"
                  alt="about-image"
                  width={700}
                  height={700}
                  className="mx-auto hidden max-w-full rounded-2xl drop-shadow-three dark:block dark:drop-shadow-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default AboutSectionOne;
