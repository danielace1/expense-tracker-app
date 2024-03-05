import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { ref, onValue, push } from "firebase/database";
import { database } from "../firebase";

import TheNavbar from "../components/TheNavbar";
import FormInput from "../components/form/FormInput";
import TextArea from "../components/form/TextArea";
import { useForm } from "react-hook-form";
import ExpenseCard from "../components/ExpenseCard";

const COLLECTION_NAME = "people/";

const Schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(30, { message: "Name must be at most 30 characters" }),
  desc: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(50, { message: "Description must be at most 200 characters" }),
  amount: z
    .string()
    .min(1, { message: "Amount must be at least 1 characters" }),
});

const UserLayout = () => {
  const [dialogbox, setdialogBox] = useState(false);
  const [expenseCard, setexpenseCard] = useState([]);
  const [total, settotal] = useState("0");

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(Schema) });

  const handleDialogBox = () => {
    setdialogBox(!dialogbox);
    reset();
  };

  const sendInfoToFirebase = (data) => {
    setdialogBox(false);

    try {
      push(ref(database, COLLECTION_NAME), {
        name: data.name,
        desc: data.desc,
        amount: data.amount,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    reset();
  };

  // fetching data from Firebase
  useEffect(() => {
    const starCountRef = ref(database, COLLECTION_NAME);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Extract keys from the snapshot
        const keys = Object.keys(data);
        const newData = keys.map((key) => ({ id: key, ...data[key] }));

        const totalAmount = newData.reduce(
          (total, expense) => total + parseFloat(expense.amount),
          0
        );
        settotal(totalAmount);

        setexpenseCard([...newData]);
      } else {
        console.log("No records found!");
      }
    });
  }, []);

  return (
    <>
      <TheNavbar />

      <main>
        <section
          className={`bg-zinc-800 min-h-screen py-1 relative overflow-hidden `}
        >
          {/* Glass effect layer */}
          {dialogbox && (
            <div className="absolute inset-0 bg-black bg-opacity-25 backdrop-blur-sm"></div>
          )}

          <div className="bg-zinc-600 text-center py-3 text-white font-semibold">
            <p>
              There are{" "}
              <span className="text-green-400 text-lg"> ₹ {total}</span> total
              expenses
            </p>
          </div>

          <div className="relative flex justify-center">
            {/* form */}
            {dialogbox && (
              <form
                onSubmit={handleSubmit(sendInfoToFirebase)}
                className={`absolute max-w-[360px] w-full bg-zinc-700 rounded-lg shadow-md px-4 py-6 space-y-6 animate-fade`}
              >
                <h1 className="text-white font-semibold text-xl">
                  Add Expense
                </h1>
                <FormInput
                  name="name"
                  label="Name"
                  register={register("name")}
                  error={errors.name}
                />
                <TextArea
                  name="desc"
                  label="Description"
                  register={register("desc")}
                  error={errors.desc}
                />
                <FormInput
                  name="amount"
                  type="number"
                  label="Amount"
                  register={register("amount")}
                  error={errors.amount}
                />
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

            {/* Add Expense Button */}
            <button
              type="button"
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

          {/* Expense Cards */}
          <div className="m-3 divide-gray-700 divide-y">
            {expenseCard.map((expense, id) => (
              <ExpenseCard
                key={id}
                id={id + 1}
                name={expense.name}
                desc={expense.desc}
                rupees={expense.amount}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default UserLayout;
