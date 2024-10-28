import Image from "next/image";

const AboutSectionTwo = () => {
  return (
    <section className="py-12 md:py-20 lg:py-20">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="relative mx-auto mb-12 flex justify-center items-center aspect-square text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src="/images/about/COMPOSTING.jpg"
                alt="about image"
                width={700}
                height={700}
                className="drop-shadow-three dark:hidden dark:drop-shadow-none rounded-2xl"
              />
              <Image
                src="/images/about/COMPOSTING.jpg"
                alt="about image"
                width={700}
                height={700}
                className="hidden drop-shadow-three dark:block dark:drop-shadow-none rounded-2xl"
              />
            </div>
          </div>
          <div className="w-full  px-12 lg:w-1/2">
            <div className="max-w-[470px]">
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Efficient Waste Management
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Our waste management system ensures the efficient collection,
                  processing, and disposal of waste, focusing on minimizing
                  environmental impact through innovative practices and smart
                  resource utilization.
                </p>
              </div>
              <div className="mb-9">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Sustainable Composting Solutions
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  We offer advanced composting solutions that turn organic waste
                  into valuable compost, promoting soil health, reducing
                  landfill use, and contributing to a circular economy.
                </p>
              </div>
              <div className="mb-1">
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  Empowering Communities
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                  Our system empowers communities by providing them with the
                  tools to manage waste effectively, recycle, and contribute to
                  a sustainable future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;
