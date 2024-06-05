import bcrypt from "bcrypt";
import prismadb from "@/shared/lib/prismaDb";
import { LoginFormSchema } from "@/shared/schema/LoginFromSchema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is missing." }, { status: 400 });
    } else if (!password) {
      return NextResponse.json(
        { error: "Password is missing." },
        { status: 400 }
      );
    }
    const validation = LoginFormSchema.safeParse({
      email,
      password,
    });
    if (!validation.success) {
      const firstError = validation.error.errors[0].message;
      return NextResponse.json({ error: firstError }, { status: 400 });
    }
    const isUserPresent = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!isUserPresent) {
      return NextResponse.json(
        { error: "User with this email is not present in the database." },
        { status: 400 }
      );
    }
    const isValidPassword = await bcrypt.compare(
      password,
      isUserPresent.password
    );
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Password is incorrect" },
        { status: 401 }
      );
    }
    const { password: UserPassword, ...rest } = isUserPresent;
    const token = jwt.sign({ ...rest }, process.env.JWT_SECRET_KEY!, {
      expiresIn: "3d",
    });
    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV! === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 3,
    });
    return response;
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 501 }
    );
  }
}
