import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/shared/lib/prismaDb";
import bcrypt from "bcrypt";
import { RegisterFormSchema } from "@/shared/schema/RegisterFormSchema";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await req.json();
    if (!firstName) {
      return NextResponse.json(
        { error: "First Name is missing." },
        { status: 400 }
      );
    } else if (!lastName) {
      return NextResponse.json(
        { error: "Last Name is missing." },
        { status: 400 }
      );
    } else if (!email) {
      return NextResponse.json({ error: "Email is missing." }, { status: 400 });
    } else if (!password) {
      return NextResponse.json(
        { error: "Password is missing." },
        { status: 400 }
      );
    }
    const validation = RegisterFormSchema.safeParse({
      firstName,
      lastName,
      email,
      password,
    });
    if (!validation.success) {
      const firstError = validation.error.errors[0].message;
      return NextResponse.json({ error: firstError }, { status: 400 });
    }
    const isUserPresent = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    if (isUserPresent) {
      return NextResponse.json(
        { error: "User with this email already registered." },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await prismadb.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      { message: "Registed successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 501 }
    );
  }
}
