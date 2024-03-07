import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const TheNavbar = ({ onDeleteAll, logOut }) => {
  const handleDeleteAllClick = () => {
    onDeleteAll();
  };

  const handleLogOutClick = () => {
    logOut();
  };

  return (
    <nav className="relative flex items-center justify-between bg-neutral-800 px-5 sm:px-10 py-5">
      <div>
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/expense-tracker-app-logo.png"
            alt="expense-tracker-app"
            className="w-8"
          />
          <h1 className="text-white font-semibold text-xl sm:text-2xl">
            Expense Tracker App
          </h1>
        </Link>
      </div>

      <div>
        <button
          onClick={handleDeleteAllClick}
          title="Delete All Expenses"
          className="hover:bg-gray-200 transition-all hover:transition hover:bg-opacity-10 hover:rounded-full absolute top-2.5 sm:top-2 right-16 p-3"
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
          onClick={handleLogOutClick}
          title="Sign Out"
          className="hover:bg-gray-200 transition-all hover:transition hover:bg-opacity-10 hover:rounded-full absolute top-2.5 sm:top-2  right-5 p-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 256 256"
            className="text-white fill-current hover:cursor-pointer"
          >
            <path d="M116 216a12 12 0 0 1-12 12H48a20 20 0 0 1-20-20V48a20 20 0 0 1 20-20h56a12 12 0 0 1 0 24H52v152h52a12 12 0 0 1 12 12m108.49-96.49l-40-40a12 12 0 0 0-17 17L187 116h-83a12 12 0 0 0 0 24h83l-19.52 19.51a12 12 0 0 0 17 17l40-40a12 12 0 0 0 .01-17"></path>
          </svg>
        </button>
      </div>
    </nav>
  );
};

TheNavbar.propTypes = {
  onDeleteAll: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
};

export default TheNavbar;
