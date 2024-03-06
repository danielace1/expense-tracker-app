import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { v4 as uuidv4 } from "uuid";

import { ref, onValue, set, update, child } from "firebase/database";
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
  // for create
  const [dialogbox, setdialogBox] = useState(false);
  // for update
  const [updateform, setUpdateForm] = useState(false);
  const [expenseCard, setexpenseCard] = useState([]);
  const [total, settotal] = useState("0");
  const [expenseDetails, setexpenseDetails] = useState([]);

  // create form handlers
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(Schema) });

  // update form handlers
  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    setValue: setValue2,
  } = useForm({
    resolver: zodResolver(Schema),
  });

  //  update form default values when expenseDetails changes
  useEffect(() => {
    if (expenseDetails) {
      setValue2("id", expenseDetails.id);
      setValue2("name", expenseDetails.name);
      setValue2("desc", expenseDetails.desc);
      setValue2("amount", expenseDetails.amount);
    }
  }, [expenseDetails, setValue2]);

  const handleEditExpense = (expense) => {
    setexpenseDetails(expense);
    setUpdateForm(!updateform);
  };

  // Update the expense data in the database
  const updateExpenseData = async (expense, id) => {
    const expenseData = {
      id: id,
      name: expense.name,
      desc: expense.desc,
      amount: expense.amount,
    };

    const updates = {};
    updates[`${COLLECTION_NAME}${id}`] = expenseData;

    try {
      await update(ref(database), updates);
      setUpdateForm(!updateform);
    } catch (error) {
      console.error("Error updating expense data:", error);
    }
  };

  const handleEditFormSubmit = async (data) => {
    const existingId = expenseDetails.id;
    await updateExpenseData(data, existingId);
  };

  // cancel form
  const handelCancel = () => {
    setUpdateForm(!updateform);
  };

  const handleDialogBox = () => {
    setdialogBox(!dialogbox);
    reset();
  };

  // create and sending to server
  const sendInfoToFirebase = (data) => {
    setdialogBox(false);

    try {
      const unique_id = uuidv4();

      const expenseRef = child(
        ref(database),
        `${COLLECTION_NAME}/${unique_id}`
      );
      set(expenseRef, {
        id: unique_id,
        name: data.name,
        desc: data.desc,
        amount: data.amount,
      });

      data.id = unique_id;
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    reset();
  };

  // fetching data from Firebase (read)
  useEffect(() => {
    const starCountRef = ref(database, COLLECTION_NAME);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Extract id from the snapshot
        const keys = Object.keys(data);
        const newData = keys.map((key) => ({ id: key, ...data[key] }));

        // Calculating Total Amount
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

  // delete action
  const handleDelete = async (expenseId) => {
    try {
      const updates = {};
      updates[`${COLLECTION_NAME}${expenseId}`] = null;

      await update(ref(database), updates);

      const deleteExpenseCard = expenseCard.filter(
        (expense) => expense.id !== expenseId
      );
      setexpenseCard(deleteExpenseCard);

      if (deleteExpenseCard.length === 0) {
        settotal(0);
      }

      alert("Expense deleted successfully!");
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  // Function to delete all expenses
  const handleDeleteAll = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete all expenses?"
    );

    if (confirmDelete) {
      try {
        await set(ref(database, COLLECTION_NAME), null);
        setexpenseCard([]);
        settotal(0);
        alert("All expenses deleted successfully!");
      } catch (error) {
        console.error("Error deleting all expenses:", error);
      }
    }
  };

  return (
    <>
      <TheNavbar onDeleteAll={handleDeleteAll} />

      <main>
        <section
          className={`relative bg-zinc-800 min-h-screen py-1 overflow-hidden `}
        >
          {/* Glass effect layer */}
          {(dialogbox || updateform) && (
            <div className="absolute inset-0 bg-black bg-opacity-25 backdrop-blur-sm"></div>
          )}

          <div className="bg-zinc-600 text-center py-3 text-white font-semibold">
            <p>
              There are{" "}
              <span className="text-green-400 text-xl">
                {" "}
                ₹ {total.toLocaleString()}
              </span>{" "}
              total expenses
            </p>
          </div>

          <div className="relative flex justify-center">
            {(expenseCard.length === 0 || expenseDetails.length === null) && (
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/256/6289/6289296.png"
                  alt="no expense data"
                  className="mt-20 opacity-40 lg:w-96"
                />
              </div>
            )}

            {/* Create form */}
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
                    type="button"
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
                index={id + 1}
                id={expense.id}
                name={expense.name}
                desc={expense.desc}
                amount={expense.amount}
                onEdit={handleEditExpense}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Update Expense Details */}
          <div className="flex justify-center">
            {updateform && (
              <form
                onSubmit={handleSubmit2(handleEditFormSubmit)}
                className={`absolute top-14 max-w-[360px] w-full bg-zinc-700 rounded-lg shadow-md px-4 py-6 space-y-6 animate-fade`}
              >
                <h1 className="text-white font-semibold text-xl">
                  Update Expense
                </h1>
                <FormInput
                  name="name"
                  label="Name"
                  register={register2("name")}
                  error={errors2.name}
                />
                <TextArea
                  name="desc"
                  label="Description"
                  register={register2("desc")}
                  error={errors2.desc}
                />
                <FormInput
                  name="amount"
                  type="number"
                  label="Amount"
                  register={register2("amount")}
                  error={errors2.amount}
                />
                <div className="mt-5 flex items-center">
                  <button
                    type="button"
                    onClick={handelCancel}
                    className="w-full text-cyan-500 font-semibold transition-all hover:text-cyan-600"
                  >
                    Cancel
                  </button>
                  <button className="w-full text-cyan-500 font-semibold transition-all hover:text-cyan-600">
                    Update
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default UserLayout;
