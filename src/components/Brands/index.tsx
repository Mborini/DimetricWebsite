"use client";
import { Partners  } from "@/types/partners";
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

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <section className="pt-16">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white">
              Our Partners
            </h2>
            <div className="flex flex-wrap items-center justify-around rounded-sm bg-gray-light px-8 py-4 dark:bg-gray-dark sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]">
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
    <div className="flex flex-col items-center justify-center px-3 py-1 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        title={name}
        className="flex flex-col items-center group"
      >
        <div className="relative w-[150px] h-[80px] mb-3 transition-transform duration-300 group-hover:scale-105">
          <Image
            src={image_url}
            alt={name}
            fill
            className="object-contain drop-shadow-md"
          />
        </div>
        <span className="text-lg font-semibold text-center text-gray-800 dark:text-white group-hover:text-primary transition duration-200">
          {name}
        </span>
      </a>
    </div>
  );
};

