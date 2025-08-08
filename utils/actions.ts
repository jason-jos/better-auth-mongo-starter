"use server";

import { auth } from "@/lib/auth";

import { redirect } from "next/navigation";

export async function signUp(formdata: FormData) {
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
    console.log("Something went wrong in signup", error);
  }
  redirect("/dashboard");
}

export async function signIn(formdata: FormData) {
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
    console.log("error signing in", error);
  }
  redirect("/dashboard");
}
