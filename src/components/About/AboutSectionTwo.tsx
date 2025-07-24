"use client";
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import { useEffect, useState } from "react";

const AboutSectionTwo = () => {
  const [data, setData] = useState([]);
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
      }
    };
    fetchData();
  }, []);
  return (
    <section className="py-12 md:py-20 lg:py-20">
      <div className="container">
       <div className="w-full px-4 text-start">
  <h1 className="mb-6 text-4xl font-bold text-black dark:text-white">
    {data[0]?.section_title ?? "Section Title"}
  </h1>
</div>


        {/* الأعمدة: صورة + نص */}
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="relative mx-auto mb-12 flex aspect-square items-center justify-center text-center lg:m-0"
              data-wow-delay=".15s"
            >
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
            </div>
          </div>

          <div className="w-full px-12 lg:w-1/2">
            <div className="max-w-[470px]">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="wow fadeInUp mb-6"
                  data-wow-delay={`${0.15 * (index + 1)}s`}
                >
                  <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                    {item.title}
                  </h3>
                  <p className="pr-[10px] text-base font-medium leading-relaxed text-body-color">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
