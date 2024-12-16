"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="relative z-10 bg-white pt-16 dark:bg-gray-dark md:pt-20 lg:pt-24">
        <div className="container ">
          <div className="flex justify-center">
            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
              <div className="mb-12 max-w-[360px] lg:mb-16">
                <Link href="/" className="mb-0 inline-block">
                  <Image
                    src="/images/logo/Llogo.png"
                    alt="logo"
                    className="w-full dark:hidden"
                    width={100}
                    height={30}
                  />
                  <Image
                    src="/images/logo/Dlogo.png"
                    alt="logo"
                    className="hidden w-full dark:block"
                    width={100}
                    height={30}
                  />
                </Link>
                <p className="mb-9 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  Development Dimension for Environment and Disaster Risk Reduction.
                </p>
               
              </div>
            </div>

            <div className="w-full px-4 sm:w-1/2 md:w-1/3 lg:w-2/12 mt-6 xl:w-2/12">
              <div className="mb-10 w-full">
                <h4 className="mb-9 text-lg font-semibold text-dark dark:text-dark-light">
                  Useful Links
                </h4>
                <ul>
                 
                  <li>
                    <Link
                      href="#"
                      className="mb-2 inline-block text-base leading-loose text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="mb-2 inline-block text-base leading-loose text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full px-4 sm:w-1/2 md:w-1/3 lg:w-2/12 mt-6 xl:w-2/12">
              <div className="mb-12 w-full">
                <h4 className="mb-16 text-lg font-semibold text-dark dark:text-dark-light">
                 {""}
                </h4>
                <ul>
                  <li>
                    <Link
                      href="#"
                      className="mb-2 inline-block text-base leading-loose text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="mb-2 inline-block text-base leading-loose text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                    >
                      Pricing
                    </Link>
                  </li>
                  
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
