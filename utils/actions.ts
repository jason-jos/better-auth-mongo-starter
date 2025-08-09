"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";

import { redirect } from "next/navigation";
interface State {
  errorMessage?: String | null;
}

export async function signUp(prevState: State, formdata: FormData) {
  const rawFormData = {
    firstName: formdata.get("firstname") as string,
    lastName: formdata.get("lastname") as string,
    email: formdata.get("email") as string,
    password: formdata.get("pwd") as string,
  };

  const { firstName, lastName, email, password } = rawFormData;

  try {
    const user = await auth.api.signUpEmail({
      body: {
        name: `${firstName} ${lastName}`,
        email,
        password,
      },
    });
    console.log(user);
  } catch (error) {
    if (error instanceof APIError) {
      switch (error.status) {
        case "UNPROCESSABLE_ENTITY":
          return { errorMessage: "User already exists." };
        case "BAD_REQUEST":
          return { errorMessage: "Invalid email." };
        default:
          return { errorMessage: "Something went wrong." };
      }
    }
    console.log("Something went wrong in signup", error);
  }
  redirect("/dashboard");
}

export async function signIn(prevState: State, formdata: FormData) {
  const rawFormData = {
    email: formdata.get("email") as string,
    password: formdata.get("pwd") as string,
  };
  const { email, password } = rawFormData;
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    console.log("signed in!!!");
  } catch (error) {
    if (error instanceof APIError) {
      switch (error.status) {
        case "UNAUTHORIZED":
          return { errorMessage: "User Not Found." };
        case "BAD_REQUEST":
          return { errorMessage: "Invalid email." };
        default:
          return { errorMessage: "Something went wrong." };
      }
    }
    console.log("error signing in", error);
  }
  redirect("/dashboard");
}
