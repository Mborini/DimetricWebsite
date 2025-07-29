"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Typewriter } from "react-simple-typewriter";
import SingleProject from "@/components/Projects/SingleProject";
import SectionTitle from "@/components/Common/SectionTitle";

const LatestProjects = () => {
  const [projects, setProject] = useState([]);
  const [loading, setLoading] = useState(true);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  const [startTyping, setStartTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/latestProjects");
        if (!response.ok) throw new Error("Network response was not ok");
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

  useEffect(() => {
    if (inView) {
      setStartTyping(true);
    }
  }, [inView]);

  return (
    <section className="pb-[120px]">
      <div className="container">
        <div ref={ref} className="text-center mb-[40px] min-h-[60px]">
          {startTyping ? (
            <h2 className="text-4xl font-bold text-black dark:text-white">
              <Typewriter
                words={["Our Latest Projects"]}
                loop={1}
                cursor={showCursor}
                cursorStyle="|"
                cursorBlinking={false}
                typeSpeed={50}
                deleteSpeed={0}
                delaySpeed={1000}
                onLoopDone={() => setShowCursor(false)}
              />
            </h2>
          ) : (
            <h2 className="text-4xl font-bold text-black dark:text-white">&nbsp;</h2>
          )}
          <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
            <Typewriter
                words={["Explore our latest projects and innovations"]}
                loop={1}
                cursor={showCursor}
                cursorStyle="|"
                cursorBlinking={false}
                typeSpeed={50}
                deleteSpeed={0}
                delaySpeed={1000}
                onLoopDone={() => setShowCursor(false)}
              />
          </p>
        </div>
      </div>

      <div className="container">
        {loading ? (
          <div className="-mx-4 flex flex-wrap justify-center">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-10 animate-pulse"
              >
                <div className="rounded-xl border p-6 shadow-md dark:border-gray-700">
                  <div className="h-48 w-full rounded bg-gray-300 dark:bg-gray-500 mb-4" />
                  <div className="h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-500 mb-3" />
                  <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-500 mb-2" />
                  <div className="h-4 w-5/6 rounded bg-gray-300 dark:bg-gray-500" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="-mx-4 flex flex-wrap justify-center">
            {projects.slice(0, 6).map((project) => (
              <div
                key={project.project_id}
                className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-8"
              >
                <SingleProject project={project} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestProjects;
