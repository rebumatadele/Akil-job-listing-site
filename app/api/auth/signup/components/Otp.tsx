import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useRouter } from "next/navigation";

type DataType = {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
};

type FormType = {
  otp: string[];
};

interface Props {
  children: DataType;
}

const Otp = ({ children }: Props) => {
  const { control, handleSubmit, setValue, getValues } = useForm<FormType>({
    defaultValues: {
      otp: new Array(4).fill(""),
    },
  });
  const route = useRouter();

  const onSubmit = async (data: FormType) => {
    const otp = data.otp.join("");
    console.log(otp)
    const res = await fetch("https://akil-backend.onrender.com/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: children.email,
        OTP: otp,
      }),
    });

    const user = await res.json();
    if (user.success) {
      route.push("/api/auth/signin");
    }
  };

  const resend = async () => {
    const newData = {
      name: children.name,
      email: children.email,
      password: children.password,
      confirmPassword: children.confirmPassword,
    };
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
  };

  const handleChange = (index: number, value: string) => {
    const otp = getValues("otp");
    otp[index] = value;
    setValue("otp", otp, { shouldValidate: true, shouldDirty: true });
    if (index < otp.length - 1 && value) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!getValues("otp")[index] && index > 0) {
        document.getElementById(`otp-${index - 1}`)?.focus();
      }
    }
  };

  useEffect(() => {
    document.getElementById("otp-0")?.focus();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col gap-5 w-1/3 mt-10 items-center">
        <span className="text-4xl mt-4 font-black text-[#202430]">Verify Email</span>
        <p className="text-[#515B6F] font-light">
          We've sent a verification code to the email address you provided. To complete the verification process, please enter the code here.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5 w-1/3 mt-10">
        <div className="flex justify-between">
          {[0, 1, 2, 3].map((index) => (
            <Controller
              key={index}
              name={`otp[${index}]`}
              control={control}
              render={({ field }) => (
                <input
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  className="border border-gray-400 rounded-lg py-2 px-5 w-1/5 text-center"
                  placeholder="0"
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange(index, e.target.value);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              )}
            />
          ))}
        </div>

        <div className="flex flex-col items-center">
          <span>
            <span className="text-[#515B6F] font-light">You can request to</span>
            <button onClick={resend} className="text-[#4640DE] font-bold px-2">Resend</button>
            <span className="text-[#515B6F] font-light">code in</span>
          </span>
          <span>15</span>
        </div>

        <div className="py-5 flex justify-center">
          <button
            type="submit"
            className="border border-gray-400 bg-[#4640DE] hover:bg-[#2721dd] text-white font-bold rounded-3xl py-2 px-5 w-full"
          >
            Continue
          </button>
        </div>
      </form>
      <DevTool control={control}></DevTool>
    </div>
  );
};

export default Otp;
