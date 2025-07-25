"use client";
import { Partners } from "@/types/partners";
import Image from "next/image";
import { useEffect, useState } from "react";

const PartnersComponent = () => {
  const [partnerData, setPartners] = useState<Partners[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch("/api/partners");
        const data = await res.json();
        setPartners(data);
      } catch (error) {
        console.error("Failed to fetch partners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading)
    return (
      <section className="pt-16">
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center justify-center">
            <div className="w-[70%] px-4">
              <p className="mb-6 text-center text-4xl font-bold text-gray-800 dark:text-white">
                Our Partners
              </p>

              {/* Skeleton grid 2 items side by side */}
              <div className="flex flex-wrap justify-around rounded-xl bg-gray-light px-8 py-4 dark:bg-gray-dark sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center px-3 py-1 sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2"
                  >
                    <div className="mb-3 h-[80px] w-[150px] animate-pulse rounded-md bg-gray-300 dark:bg-gray-500" />
                    <div className="h-6 w-2/3 animate-pulse rounded bg-gray-300 dark:bg-gray-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );

  return (
    <section className="pt-16">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center justify-center">
          <div className="w-[70%] px-4">
            <h1 className="mb-6 text-center text-4xl font-bold text-gray-800 dark:text-white">
              Our Partners
            </h1>
            <div className="flex flex-wrap items-center justify-around rounded-xl bg-gray-light px-8 py-4 dark:bg-gray-dark sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]">
              {partnerData.map((partner) => (
                <SinglePartner key={partner.id} partner={partner} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersComponent;

const SinglePartner = ({ partner }: { partner: Partners }) => {
  const { href, name, image_url } = partner;

  return (
    <div className="flex flex-col items-center justify-center px-0 py-1 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        title={name}
        className="group flex flex-col items-center"
      >
        <div className="relative mb-3 h-[80px] w-[150px] transition-transform duration-300 group-hover:scale-105">
          <Image
            src={image_url}
            alt={name}
            fill
            className="object-contain drop-shadow-md"
          />
        </div>
        <span className="text-center text-lg font-semibold text-gray-800 transition duration-200 group-hover:text-primary dark:text-white">
          {name}
        </span>
      </a>
    </div>
  );
};
