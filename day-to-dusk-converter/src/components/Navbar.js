import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("");
  useEffect(() => {
    setActiveLink(router.pathname);
  }, [router.pathname]);
  return (
    <div className="container flex justify-between items-center max-w-[1420px] py-2 sm:py-6 left-1/2  m-auto px-6 md:px-16 lg:px-40 3xl:px-96  z-50  ">
      <a className="flex items-center w-2/3 sm:w-52 " href="/">
        <div className="font-bold text-xl sm:text-2xl">
          <span className="text-gray-900">Virtual Staging</span>&nbsp;
          <span className="text-blue-600">AI</span>
        </div>
      </a>
      <nav className="transition-opacity">
        <div className="hidden sm:flex items-center flex-row gap-x-6">
          <span>
            <Link
              className={`flex items-center font-semibold text-gray-400 transition-colors hover:text-gray-800 ${
                activeLink === "/" ? "font-bold text-gray-800" : ""
              } `}
              href="/"
            >
              Home
            </Link>
          </span>
          <span>
            <Link
              t
              className={`flex items-center font-semibold text-gray-400 transition-colors hover:text-gray-800 ${
                activeLink === "/ImageHistory" ? "font-bold text-gray-800" : ""
              }`}
              href="/ImageHistory"
            >
              Gallery
            </Link>
          </span>
          <span>
            <button
              className=" transition-all flex text-base font-semibold  rounded-lg   px-6 py-2  md:mr-4 text-white bg-blue-500 border-blue-500 hover:bg-blue-600 h-full border border-solid"
              onClick={() => {
                localStorage.clear();
                router.replace("/login");
              }}
            >
              Logout
            </button>
          </span>
        </div>
      </nav>
    </div>
  );
}
