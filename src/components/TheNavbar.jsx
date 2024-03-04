import { Link } from "react-router-dom";

const TheNavbar = () => {
  return (
    <nav className="relative flex items-center justify-between bg-neutral-800 px-10 py-5">
      <div>
        <Link to="/">
          <h1 className="text-white font-semibold text-xl sm:text-2xl">
            Expense Tracker App
          </h1>
        </Link>
      </div>
      <div>
        <div className="">
          <button
            title="Delete All Expenses"
            className="hover:bg-gray-200 transition-all hover:transition hover:bg-opacity-10 hover:rounded-full absolute top-2 right-16 p-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              className="text-white fill-current hover:cursor-pointer"
            >
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zm3.17-6.41a.996.996 0 1 1 1.41-1.41L12 12.59l1.41-1.41a.996.996 0 1 1 1.41 1.41L13.41 14l1.41 1.41a.996.996 0 1 1-1.41 1.41L12 15.41l-1.41 1.41a.996.996 0 1 1-1.41-1.41L10.59 14zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1"></path>
            </svg>
          </button>
          <button
            title="Sign Out"
            className="hover:bg-gray-200 transition-all hover:transition hover:bg-opacity-10 hover:rounded-full absolute top-2 right-5 p-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              className="text-white fill-current hover:cursor-pointer"
            >
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TheNavbar;
