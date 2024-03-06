import PropTypes from "prop-types";

const ExpenseCard = ({ index, id, name, desc, amount, onEdit, onDelete }) => {
  const handleEditClick = () => {
    // Call the onEdit function and pass the expense details
    onEdit({ id, name, desc, amount });
  };

  const handleDeleteClick = () => {
    onDelete(id);
  };

  return (
    <div
      className="flex items-center text-white px-3 py-2 hover:bg-neutral-700 rounded hover:bg-opacity-20"
      id={id}
    >
      <div className="mr-3 text-sm">{index}.</div>{" "}
      <div className="flex-shrink-0">
        <img src="/Rupee-logo.webp" alt="rupee" className="w-14 rounded-full" />
      </div>
      <div className="flex-1 min-w-0 ms-4">
        <h1 className="text-lg sm:text-xl font-medium truncate dark:text-white mb-1">
          {name}
        </h1>
        <p className="text-sm text-gray-300 truncate dark:text-gray-400">
          {desc}
        </p>
      </div>
      <div className="inline-flex items-center space-x-10 font-semibold dark:text-white">
        <div className="space-x-10">
          <button onClick={handleEditClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="fill-current text-green-400 hover:cursor-pointer hover:text-green-500"
            >
              <path d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6.525q.5 0 .75.313t.25.687q0 .375-.262.688T11.5 5H5v14h14v-6.525q0-.5.313-.75t.687-.25q.375 0 .688.25t.312.75V19q0 .825-.587 1.413T19 21zm4-7v-2.425q0-.4.15-.763t.425-.637l8.6-8.6q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4q0 .375-.137.738t-.438.662l-8.6 8.6q-.275.275-.637.438t-.763.162H10q-.425 0-.712-.288T9 14m12.025-9.6l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"></path>
            </svg>
          </button>
          <button onClick={handleDeleteClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="fill-current text-red-500 hover:cursor-pointer hover:text-red-600"
            >
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path>
            </svg>
          </button>
        </div>

        <div className="text-xl">₹ {amount}</div>
      </div>
    </div>
  );
};

ExpenseCard.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ExpenseCard;
