import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import SolutionsAndFeatures from "@/components/Features";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Solutions & Services",
    description: "Explore our features and services",
  // other metadata
};

const SolutionsAndServicesPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Our Solutions & Services" 
        description="explore our features and services "
      />
      

      <SolutionsAndFeatures />
    </>
  );
};

export default SolutionsAndServicesPage;
