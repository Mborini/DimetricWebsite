"use client";
import { useEffect, useState } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb";
import ProjectForm from "@/components/Projects/ProjectForm";

const Project = () => {
  return (
    <>
      <Breadcrumb
        pageName="Add Project"
        description="Explore our projects and get to know more about them."
      />
      <section className="pb-[120px] pt-[25px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <ProjectForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default Project;
