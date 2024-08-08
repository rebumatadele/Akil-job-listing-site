'use client';

import React, { useEffect, useRef, useState, ChangeEvent, KeyboardEvent, FormEvent } from "react";
import { useRouter } from 'next/navigation';


interface OtpProps {
  email: string;
}

const Otp: React.FC<OtpProps> = ({ email }) => {
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);
  const [value, setValue] = useState<string[]>(new Array(4).fill(""));
  const router = useRouter();

  const onClickHandler = (index: number) => {
    inputRef.current[index]?.setSelectionRange(1, 1);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (/^[0-9]$/.test(val)) {
      const newValue = [...value];
      newValue[index] = val;
      setValue(newValue);
      if (index < value.length - 1) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (value[index]) {
        const newValue = [...value];
        newValue[index] = "";
        setValue(newValue);
      } else if (index > 0) {
        inputRef.current[index - 1]?.focus();
        const newValue = [...value];
        newValue[index - 1] = "";
        setValue(newValue);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://akil-backend.onrender.com/verify-email', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          OTP: value.join("") 
        })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        console.log("Submitted OTP:", data);
        router.push('/api/auth/signin'); 
      } else {
        console.error("Error submitting OTP:", data);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleResend = async () => {
    console.log("Resend OTP");
  }

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  return (
    <div className="mt-36 flex justify-center">
      <div className="mb-24 md:w-[408px] flex flex-col items-center"> 
        <h1 className="text-2xl font-bold mb-4">Verify Email</h1>
        <p className="text-[#7C8493] mb-4">
          We&apos;ve sent a verification code to the email address you provided. To complete the verification process, please enter the code here.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex">
            {value.map((item, index) => (
              <input
                key={index}
                ref={(input) => { inputRef.current[index] = input; }}
                value={item}
                placeholder="0"
                onChange={(e) => onChangeHandler(e, index)}
                onClick={() => onClickHandler(index)}
                onKeyDown={(e) => onKeyDownHandler(e, index)}
                className="border rounded-sm w-[75px] h-[50px] text-center m-[4px] font-[1.2em]"
              />
            ))}
          </div>
          <p>
          You can request to <span onClick={handleResend} className="cursor-pointer text-blue-500">Resend</span> code in 0:30           
          </p>
          <button type="submit" className="border w-full mt-4 rounded-3xl h-12 bg-[#9e9bf0] text-white font-semibold">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default Otp;
