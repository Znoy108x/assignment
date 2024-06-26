import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { UserJWTPayload } from "./shared/types/JWT";

export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret || secret.length === 0) {
    throw new Error("env JWT_SECRET_KEY is not set.");
  }
  return secret;
};

const verifyJWTToken = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return verified.payload as UserJWTPayload;
  } catch (err) {
    throw new Error("Your token has expired! please sign in");
  }
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const verifyToken =
    token &&
    (await verifyJWTToken(token).catch((err) => {
      console.log(err);
    }));
  // if user is not authenticared than allow him to got to login & register page
  if (
    (req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")) &&
    !verifyToken
  ) {
    return;
  }
  const url = req.url;
  //   if user is authenticated and he tries to navigate to /login and /register than redirect to home page
  if ((url.includes("/login") || url.includes("/register")) && verifyToken) {
    return NextResponse.redirect(new URL("/", url));
  }
  if (!verifyToken) {
    return NextResponse.redirect(new URL("/login", url));
  }
}

export const config = {
  matcher: ["/", "/login", "/register"],
};
