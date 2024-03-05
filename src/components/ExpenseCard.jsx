import PropTypes from "prop-types";

const ExpenseCard = ({ id, name, desc, rupees }) => {
  return (
    <div className="flex items-center text-white px-3 py-2 hover:bg-neutral-700 rounded hover:bg-opacity-20">
      <div className="mr-3 text-sm">{id}.</div>{" "}
      <div className="flex-shrink-0">
        <img src="/Rupee-logo.webp" alt="rupee" className="w-14 rounded-full" />
      </div>
      <div className="flex-1 min-w-0 ms-4">
        <p className="text-lg sm:text-xl font-medium truncate dark:text-white mb-1">
          {name}
        </p>
        <p className="text-sm text-gray-300 truncate dark:text-gray-400">
          {desc}
        </p>
      </div>
      <div className="inline-flex items-center text-xl font-semibold dark:text-white">
        ₹ {rupees}
      </div>
    </div>
  );
};

ExpenseCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  rupees: PropTypes.string.isRequired,
};

export default ExpenseCard;
