"use client";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { BsExclamationCircle } from "react-icons/bs";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import Otp from "./Otp";

type FormValues = {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
};

const Forms = () => {
  const form = useForm<FormValues>();
  const [otp, setOtp] = useState(false);
  const [dat, setDat] = useState<FormValues>();

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data: FormValues) => {
    if (data.password === data.confirmPassword) {
      const newData = {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };
      //Post Request in here
      const res = await fetch("https://akil-backend.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newData,
          role: "user",
        }),
      });

      const user = await res.json();

      if (user.success) {
        setOtp(true);
        setDat(newData);
        console.log(user.message);
      }
    }
  };

  const signInWithGoogle = async () => {
    await signIn("google", {
      redirect: false,
      callbackUrl: "/joblist",
    });
  };

  const signInWithGitHub = async () => {
    await signIn("github", {
      redirect: false,
      callbackUrl: "/joblist",
    });
  };

  return (
    <>
      {!otp && (
        <div className="flex justify-center items-center flex-col">
          <div className="flex justify-center">
            <span className="text-4xl mt-4 font-black text-[#202430]">
              Sign Up Today!
            </span>
          </div>

          <div className="flex flex-col justify-center items-center gap-5 w-1/2">
            <div className="flex flex-row mt-5 gap-1">
              <button
                onClick={signInWithGoogle}
                className="flex items-center border border-gray-400 font-bold rounded-l-lg py-2 px-5 w-1/2 hover:bg-gray-200"
              >
                <FaGoogle className="mr-2" />
                Sign Up with Google
              </button>
              <button
                onClick={signInWithGitHub}
                className="flex items-center border border-gray-400 font-bold rounded-r-lg py-2 px-5 w-1/2 hover:bg-gray-200"
              >
                <FaGithub className="mr-2" />
                Sign Up with GitHub
              </button>
            </div>

            <div className="flex w-3/4 items-center gap-5 py-6 text-sm text-slate-600">
              <div className="h-px w-full bg-slate-200"></div>
              <span className="w-full">Or Sign Up with Email</span>
              <div className="h-px w-full bg-slate-200"></div>
            </div>

            <div className="flex flex-col justify-center gap-5 w-3/4">
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-5"
              >
                <div className="mb-3 flex flex-col gap-2">
                  <label
                    htmlFor="password"
                    className="text-[#515B6F] font-semibold"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="border border-gray-400 rounded-lg py-2 px-5 w-full"
                    id="name"
                    placeholder="john doe"
                    {...register("name", {
                      required: "name is a Required page",
                    })}
                  />
                  {errors.name && (
                    <div className="flex flex-row align-middle mt-2">
                      <BsExclamationCircle className="text-red-500 mt-1.5 small" />
                      <p className="text-red-500 px-3">{errors.name.message}</p>
                    </div>
                  )}
                </div>

                <div className="mb-3 flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-[#515B6F] font-semibold"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="border border-gray-400 rounded-lg py-2 px-5 w-full"
                    id="email"
                    placeholder="Your Email"
                    {...register("email", {
                      required: "Email Field is Required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="flex flex-row align-middle mt-2">
                      <BsExclamationCircle className="text-red-500 mt-1.5 small" />
                      <p className="text-red-500 px-3">
                        {errors.email.message}
                      </p>
                    </div>
                  )}
                </div>
                <div className="mb-3 flex flex-col gap-2">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="border border-gray-400 rounded-lg py-2 px-5 w-full"
                    id="password"
                    placeholder="********"
                    {...register("password", {
                      required: "Password Field is Required",
                    })}
                  />
                  {errors.password && (
                    <div className="flex flex-row align-middle mt-2">
                      <BsExclamationCircle className="text-red-500 mt-1.5 small" />
                      <p className="text-red-500 px-3">
                        {errors.password.message}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mb-3 flex flex-col gap-2">
                  <label htmlFor="password" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="border border-gray-400 rounded-lg py-2 px-5 w-full"
                    id="confirmPassword"
                    placeholder="Your Password"
                    {...register("confirmPassword", {
                      required: "Confirmation field is Required",
                    })}
                  />
                  {errors.confirmPassword && (
                    <div className="flex flex-row align-middle mt-2">
                      <BsExclamationCircle className="text-red-500 mt-1.5 small" />
                      <p className="text-red-500 px-3">
                        {errors.confirmPassword.message}
                      </p>
                    </div>
                  )}
                </div>

                <div className="">
                  <button
                    type="submit"
                    className="border border-gray-400 bg-[#4640DE] hover:bg-[#2721dd] text-white font-bold rounded-3xl py-2 px-5 w-full"
                  >
                    SignUp
                  </button>
                </div>
              </form>
            </div>
            <DevTool control={control}></DevTool>
          </div>
        </div>
      )}
      {otp && dat && <Otp>{dat}</Otp>}
    </>
  );
};

export default Forms;
