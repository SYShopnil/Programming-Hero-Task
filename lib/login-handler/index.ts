"use server";
import { cookies } from "next/headers";
import {
  ILoginController,
  ILoginControllerResponse,
} from "@src/types/lib/login-handler";
import { searchIndividualUserByEmail } from "../user-handler";
import { redirect } from "next/navigation";
import { EAuth } from "@src/types/common";

export async function LoginController({
  email,
  password,
}: ILoginController): Promise<ILoginControllerResponse> {
  let redirectPath = "";
  const cookieStore = cookies();
  try {
    const {
      payload: { user },
    } = await searchIndividualUserByEmail(email);
    if (user && user.password == password) {
      //here jwt token will be store in the cookie (TO DO)
      cookieStore.set(EAuth.AuthTokenCookieName, user.email);
      redirectPath = "/dashboard/profile";
    } else {
      redirectPath = "/";
    }
  } catch (err) {
    redirectPath = "/";
    console.log(err);
  } finally {
    if (redirectPath) {
      redirect(redirectPath);
    } else {
      redirect("/");
    }
  }
}

export async function logoutController() {
  const cookieStore = cookies();
  let redirectUrl: string = "";
  try {
    cookieStore.delete(EAuth.AuthTokenCookieName);
    redirectUrl = "/login";
  } catch (err) {
    redirectUrl = "/";
  } finally {
    if (redirectUrl) {
      redirect(redirectUrl);
    } else {
      redirect("/");
    }
  }
}
