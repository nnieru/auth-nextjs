import { prisma } from "@/lib/prisma";
import { HttpCode } from "@/utils/http_code";
import { NextRequest, NextResponse } from "next/server";
import { registerRequestSchema } from "./schema";
import { hashPassword } from "@/utils/password_helper";
import { METHODS } from "http";
import { ErrorResponse } from "@/utils/error_template";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        {
          code: "INVALID_REQUEST",
          message: "Request body is required",
        } satisfies ErrorResponse,
        { status: HttpCode.BadRequest }
      );
    }

    const result = registerRequestSchema.safeParse(body);

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      return NextResponse.json(
        {
          code: "VALIDATION_ERROR",
          message: "Invalid input data",
          errors: fieldErrors,
        } satisfies ErrorResponse,
        { status: HttpCode.BadRequest }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          code: "EMAIL_ALREADY_REGISTERED",
          message: "Email already registered",
        } satisfies ErrorResponse,
        {
          status: HttpCode.Conflict,
        }
      );
    }

    const hashedPassword = await hashPassword(body.password);

    const user = await prisma.user.create({
      data: {
        name: body.username,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { message: "success create account!", user },
      { status: HttpCode.Created }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        code: "INTERNAL_ERROR",
        message: "An unexpected error occurred",
      } satisfies ErrorResponse,
      { status: HttpCode.InternalServerError }
    );
  }
}
