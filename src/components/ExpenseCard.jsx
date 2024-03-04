import PropTypes from "prop-types";

const ExpenseCard = ({ name, desc, rupees }) => {
  return (
    <div className="flex items-center text-white px-3 py-2 hover:cursor-pointer hover:bg-neutral-700 rounded hover:bg-opacity-20">
      <div className="flex-shrink-0">
        <img className="w-16 rounded-full" src="/Rupee-logo.webp" alt="rupee" />
      </div>
      <div className="flex-1 min-w-0 ms-4">
        <p className="text-lg sm:text-xl font-medium truncate dark:text-white mb-1">
          {name}
        </p>
        <p className="text-sm text-gray-300 truncate dark:text-gray-400">
          {desc}
        </p>
      </div>
      <div className="inline-flex items-center text-lg font-semibold dark:text-white">
        ₹ {rupees}
      </div>
    </div>
  );
};

ExpenseCard.propTypes = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  rupees: PropTypes.number.isRequired,
};

export default ExpenseCard;
