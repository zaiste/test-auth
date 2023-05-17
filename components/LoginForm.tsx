import Image from "next/image";
import { useState } from "react";
import type { FormEvent } from "react";

type FormValues = {
  password: string;
  email: string;
};

const defaultValues: FormValues = { password: "", email: "", };

import { useSaleorAuthContext } from "@saleor/auth-sdk/react";

export const LoginForm = () => {
  const [formValues, setFormValues] = useState<FormValues>(defaultValues);
  const [errors, setErrors] = useState<string[]>([]);

  const { signIn } = useSaleorAuthContext();

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data } = await signIn(formValues);

    if (data.tokenCreate.errors) {
      setErrors(data.tokenCreate.errors.map((e) => e.message));
      setFormValues(defaultValues);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (errors.length > 0) {
      setErrors([]);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-10 flex justify-center">
        <Image src={`/saleor.png`} alt="Saleor" width={75} height={75} />
      </div>
      <form className="bg-white shadow-md rounded p-8" onSubmit={submitHandler}>
        <div className="mb-2">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={changeHandler}
            className="border rounded bg-gray-50 px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formValues.password}
            onChange={changeHandler}
            className="border rounded bg-gray-50 px-4 py-2 w-full"
          />
        </div>

        <button className="bg-slate-800 text-slate-200 hover:bg-slate-700 rounded py-2 px-4" type="submit">
          Log In
        </button>
      </form>
      <div>
        {errors.map((error) => (
          <p className="error" key={error}>
            {error}
          </p>
        ))}
      </div>
    </div>
  )
}