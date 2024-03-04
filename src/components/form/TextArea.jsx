import PropTypes from "prop-types";

const TextArea = ({ name, label }) => {
  return (
    <div className="relative z-0">
      <textarea
        name={name}
        type="text"
        id="floating_standard"
        rows={2}
        className="block py-2.5 px-0 w-full bg-transparent border-0 border-b-2 border-gray-400 appearance-none text-white dark:border-gray-800 dark:focus:border-cyan-500 focus:outline-none focus:ring-0 focus:border-cyan-600 peer"
        placeholder=" "
      ></textarea>
      <label
        htmlFor="floating_standard"
        className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-cyan-600 peer-focus:dark:text-cyan-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
      >
        {label}
      </label>
    </div>
  );
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TextArea;
