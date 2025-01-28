import { project as ProjectType } from "@/types/project";
import Image from "next/image";
import Link from "next/link";

const SingleProject = ({ project }: { project: ProjectType | undefined }) => {
  if (!project) {
    return <div>Error: Project data is not available.</div>;
  }

  const { project_name, project_id, date, image_path } = project;
  const formattedDate = date ? new Date(date).getFullYear() : "N/A";

  return (
<div
  className="group relative overflow-hidden rounded-3xl bg-white shadow-one duration-300 hover:scale-105 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark transform transition-all mb-8"
>
      <Link
        href={`/blog-details/${project_id}`}
        className="relative block  w-full"
      >
        <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold capitalize text-white">
          {formattedDate}
        </span>

        <div className="relative h-96 w-full overflow-hidden">
          <Image
            src={`/images/projects/${image_path}`}
            alt="project image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </Link>
      <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
        <h3>
          <Link
            href={`/blog-details/${project_id}`}
            className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl line-clamp-3 max-w-full max-h-[10rem]"
            >
            {project_name} 
          </Link>
        </h3>
        <p className="mb-6 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
          paragraph
        </p>
        <div className="flex items-center">
          <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
            <div className="mr-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={`/images/projects/${image_path}`}
                  alt="project image"
                  layout="fill"
                  objectFit="cover"
                />{" "}
              </div>
            </div>
            <div className="w-full">
              <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                By author.name
              </h4>
              <p className="text-xs text-body-color">author.designation</p>
            </div>
          </div>
          <div className="inline-block">
            <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
              Date
            </h4>
            <p className="text-xs text-body-color">publishDate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
