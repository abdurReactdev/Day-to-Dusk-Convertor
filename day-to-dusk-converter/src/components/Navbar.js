export default function Navbar() {
  return (
    <div className="container flex justify-between items-center max-w-[1420px] py-2 sm:py-6 left-1/2  m-auto px-6 md:px-16 lg:px-40 3xl:px-96  z-50 ">
      <a className="flex items-center w-2/3 sm:w-52 " href="/">
        <div className="font-bold text-xl sm:text-2xl">
          <span className="text-gray-900">Virtual Staging</span>&nbsp;
          <span className="text-blue-600">AI</span>
        </div>
      </a>
      <nav className="transition-opacity">
        <div className="hidden sm:flex items-center flex-row gap-x-6">
          <span>
            <a
              className="flex items-center font-semibold text-gray-400 transition-colors hover:text-gray-800 font-bold text-gray-800"
              href="/"
            >
              Home
            </a>
          </span>
          <span>
            <a
              className="flex items-center font-semibold text-gray-400 transition-colors hover:text-gray-800"
              href="/gallery"
            >
              Gallery
            </a>
          </span>
        </div>
      </nav>
    </div>
  );
}
