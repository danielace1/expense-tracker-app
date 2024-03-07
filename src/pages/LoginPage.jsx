import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { ref, set } from "firebase/database";
import { database } from "../firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Schema = z.object({
  email: z.string().email({ message: "Enter your email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const LoginPage = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  let userUID = "";

  const [createAcctForm, setcreateAcctForm] = useState(false);

  // create form handlers
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(Schema) });

  // login form handlers
  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm({
    resolver: zodResolver(Schema),
  });

  // create acct
  const createAcct = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const newUser = userCredential.user;

      setcreateAcctForm(false);
      alert("Hey, your account has been created!");
      reset();
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-credential") {
        alert("Invalid email or password");
      } else if (error.code === "auth/email-already-in-use") {
        alert("Email already in use, Please Login!");
      }
    }
  };

  // login
  const navigate = useNavigate();
  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const newUser = userCredential.user;

      userUID = newUser.uid;

      // Use the UID as the collection name
      const userRef = ref(database, `people/${newUser.uid}`);

      set(userRef, {
        email: newUser.email,
        // Add any other user data you want to store
      });

      navigate(`/user/${newUser.uid}`);
    } catch (error) {
      console.log(error.message);
      if (error.code === "auth/invalid-credential") {
        alert("Invalid email or password");
      } else if (error.code === "auth/invalid-email") {
        alert("Enter your valid email address");
      }
    }
  };

  // Redirect to the user page if the user is already logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate(`/user/${user.uid}`);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <header className="flex items-center justify-between bg-neutral-800 px-2 sm:px-10 py-5 text-white font-semibold text-lg sm:text-xl">
        <div className="flex-1 sm:ml-5 flex justify-center items-center  space-x-3">
          <img
            src="/expense-tracker-app-logo.png"
            alt="expense-tracker-app"
            className="w-8"
          />
          <h1>Welcome to Expense Tracker App</h1>
        </div>
        <div>
          <a
            href="https://github.com/danielace1/expense-tracker-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              className="fill-current hover:text-gray-300 hover:cursor-pointer"
            >
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"></path>
            </svg>
          </a>
        </div>
      </header>
      <section className="bg-zinc-900 min-h-screen pt-14 sm:pt-20">
        <div className="mx-auto card px-8 py-6 rounded-lg bg-zinc-800 max-w-sm sm:max-w-lg">
          {/* Login Form */}
          <div className={createAcctForm ? "hidden" : "block"}>
            <div className="text-center">
              <h1 className="text-center font-bold text-2xl sm:text-3xl text-white">
                Hello There,
              </h1>
              <span className="text-cyan-500 font-semibold text-sm sm:text-base">
                Login to track your Expense
              </span>
            </div>

            <form className="space-y-8 py-5" onSubmit={handleSubmit2(login)}>
              <div>
                <label
                  htmlFor="email2"
                  className="block mb-3 text-white font-semibold"
                >
                  Your Email
                </label>
                <input
                  id="email2"
                  name="email"
                  className="p-2 rounded w-[100%] focus:outline-cyan-600 bg-zinc-300"
                  placeholder="you@awesome.com"
                  type="email"
                  {...register2("email")}
                  onChange={(e) => setemail(e.target.value)}
                />
                {errors2.email && (
                  <span className="text-red-500 text-xs">
                    {errors2.email.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password2"
                  className="block mb-3 text-white font-semibold"
                >
                  Your Password
                </label>
                <input
                  id="password2"
                  name="password"
                  className="p-2 rounded w-[100%] focus:outline-cyan-600 bg-zinc-300"
                  placeholder="Password"
                  type="password"
                  {...register2("password")}
                  onChange={(e) => setpassword(e.target.value)}
                />
                {errors2.password && (
                  <span className="text-red-500 text-xs">
                    {errors2.password.message}
                  </span>
                )}
              </div>
              <button
                type="submit"
                onClick={login}
                className="!mt-8 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold p-2 rounded w-[100%] text-lg"
              >
                Login
              </button>
              <div className="flex items-center justify-center">
                <p className="text-white">
                  Not registered yet?
                  <span
                    onClick={() => setcreateAcctForm(!false)}
                    className="text-cyan-500 font-semibold hover:cursor-pointer hover:underline"
                  >
                    {"  "}
                    Sign Up
                  </span>
                </p>
              </div>
            </form>
          </div>

          {/* Create account form */}
          <div className={createAcctForm ? "block" : "hidden"}>
            <div className="text-center">
              <h1 className="text-center font-bold text-2xl sm:text-3xl text-white">
                Hello There,
              </h1>
              <span className="text-cyan-500 font-semibold text-sm sm:text-base">
                Create account to track your Expense
              </span>
            </div>

            <form
              className="space-y-8 py-5"
              onSubmit={handleSubmit(createAcct)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-3 text-white font-semibold"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  className="p-2 rounded w-[100%] focus:outline-cyan-600 bg-zinc-300"
                  placeholder="you@awesome.com"
                  type="email"
                  {...register("email")}
                  onChange={(e) => setemail(e.target.value)}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-3 text-white font-semibold"
                >
                  Your Password
                </label>
                <input
                  id="password"
                  name="password"
                  className="p-2 rounded w-[100%] focus:outline-cyan-600 bg-zinc-300"
                  placeholder="Password"
                  type="password"
                  {...register("password")}
                  onChange={(e) => setpassword(e.target.value)}
                />
                {errors.password && (
                  <span className="text-red-500 text-xs">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <button
                type="submit"
                onClick={createAcct}
                className="!mt-8 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold p-2 rounded w-[100%] text-lg"
              >
                Sign up
              </button>
              <div className="flex items-center justify-center">
                <p className="text-white">
                  Already have an account?
                  <span
                    onClick={() => setcreateAcctForm(!true)}
                    className="text-cyan-500 font-semibold hover:cursor-pointer hover:underline"
                  >
                    {"  "}
                    Sign in
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
