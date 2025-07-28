import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import PartnersCompnent from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import SolutionsAndFeatures from "@/components/Features";
import Hero from "@/components/Hero";
import Map from "@/components/Map";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import { Metadata } from "next";
import SingleProject from "@/components/Projects/SingleProject";
import { useEffect, useState } from "react";
import LatestProjects from "./projects/LatestProjects/LatestProjects";

export const metadata: Metadata = {
  title: "Dimetric - Development Dimension for Environment and Disaster Risk Reduction",
  description: "Development Dimension for Environment and Disaster Risk Reduction",
  // other metadata
};

export default function Home() {

  
  return (
    <>
      <ScrollUp />
      <Hero />
      <SolutionsAndFeatures />
      <Map />
      <PartnersCompnent />
      <AboutSectionOne />
       <AboutSectionTwo />
    {/*  <Testimonials /> */}
      {/* <Pricing /> */}
     <LatestProjects/>
      <Contact />
    </>
  );
}
