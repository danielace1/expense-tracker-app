import { useState } from "react";
import TheNavbar from "./components/TheNavbar";
import FormInput from "./components/form/FormInput";
import TextArea from "./components/form/TextArea";

const App = () => {
  const [dialogbox, setdialogBox] = useState(false);

  const handleDialogBox = () => {
    setdialogBox(!dialogbox);
  };

  return (
    <>
      <TheNavbar />

      <section
        className={`bg-zinc-800 min-h-screen py-1 relative overflow-hidden`}
      >
        {/* Glass effect layer */}
        {dialogbox && (
          <div className="absolute inset-0 bg-black bg-opacity-25 backdrop-blur-sm"></div>
        )}

        <div className="bg-zinc-600 text-center py-3 text-white font-semibold">
          <p>
            There are <span className="text-green-400 text-lg"> ₹ 1000</span>{" "}
            total expenses
          </p>
        </div>
        <div className="relative flex justify-center">
          {/* form */}
          {dialogbox && (
            <form
              className={`absolute max-w-[360px] w-full bg-zinc-700 rounded-lg shadow-md px-4 py-6 space-y-6`}
            >
              <h1 className="text-white font-semibold text-xl">Add Expense</h1>
              <FormInput name="name" label="Name" />
              <TextArea name="desc" label="Description" />
              <FormInput name="amount" type="number" label="Amount" />
              <div className="mt-5 flex items-center">
                <button
                  onClick={handleDialogBox}
                  className="w-full text-cyan-500 font-semibold transition-all hover:text-cyan-600"
                >
                  Cancel
                </button>
                <button className="w-full text-cyan-500 font-semibold transition-all hover:text-cyan-600">
                  Add
                </button>
              </div>
            </form>
          )}

          <button
            onClick={handleDialogBox}
            title="Add Expense"
            className="fixed bottom-3 right-3 hover:cursor-pointer transition-all hover:transition-all hover:bg-cyan-500 bg-cyan-400 p-3 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              className="fill-current text-gray-700"
            >
              <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1"></path>
            </svg>
          </button>
        </div>
        <div className="m-3 divide-gray-700 divide-y">
          <div className="flex items-center text-white px-3 py-2 hover:cursor-pointer hover:bg-neutral-700 rounded hover:bg-opacity-20">
            <div className="flex-shrink-0">
              <img
                className="w-16 rounded-full"
                src="https://cdn1.iconfinder.com/data/icons/world-currency-sign-filled/100/Rupee-512.png"
                alt="rupee"
              />
            </div>
            <div className="flex-1 min-w-0 ms-4">
              <p className="text-lg sm:text-xl font-medium truncate dark:text-white mb-1">
                Product Name
              </p>
              <p className="text-sm text-gray-300 truncate dark:text-gray-400">
                Description
              </p>
            </div>
            <div className="inline-flex items-center text-lg font-semibold dark:text-white">
              ₹ 320
            </div>
          </div>
          <div className="flex items-center text-white px-3 py-2 hover:cursor-pointer hover:bg-neutral-700 rounded hover:bg-opacity-20">
            <div className="flex-shrink-0">
              <img
                className="w-16 rounded-full"
                src="https://cdn1.iconfinder.com/data/icons/world-currency-sign-filled/100/Rupee-512.png"
                alt="rupee"
              />
            </div>
            <div className="flex-1 min-w-0 ms-4">
              <p className="text-xl font-medium truncate dark:text-white mb-1">
                Product Name
              </p>
              <p className="text-sm text-gray-300 truncate dark:text-gray-400">
                Description
              </p>
            </div>
            <div className="inline-flex items-center text-lg font-semibold dark:text-white">
              ₹ 320
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
