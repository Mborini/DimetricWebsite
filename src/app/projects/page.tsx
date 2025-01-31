"use client";
import { useEffect, useState } from "react";
import SingleProject from "@/components/Projects/SingleProject";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { FaSpinner } from "react-icons/fa";

const Project = () => {
  const [projects, setProject] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error("Error fetching Projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Breadcrumb
        pageName="Projects"
        description="Explore our projects and get to know more about them."
      />
      <section className="pb-[120px] pt-[25px]">
        <div className="container">
          {loading ? (
            <p>
              <div className="flex items-center justify-center">
                <FaSpinner className="animate-spin text-primary" size={35} />
              </div>
            </p>
          ) : (
            <div className="-mx-4 flex flex-wrap justify-center">
              {projects.map((Project) => (
                <div
                  key={Project.project_id}
                  className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
                >
                  <SingleProject project={Project} />
                </div>
              ))} 
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Project;
