import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
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
      <Features />
      <Map />
      <Brands />
      <AboutSectionOne />
       <AboutSectionTwo />
    {/*  <Testimonials /> */}
      {/* <Pricing /> */}
     <LatestProjects/>
      <Contact />
    </>
  );
}
