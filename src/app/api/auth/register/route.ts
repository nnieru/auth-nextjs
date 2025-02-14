import { prisma } from "@/lib/prisma";
import { HttpCode } from "@/utils/http_code";
import { NextRequest, NextResponse } from "next/server";
import { registerRequestSchema } from "./schema";
import { hashPassword } from "@/utils/password_helper";
import { BadRequestError, ErrorResponse } from "@/utils/error_template";
import { resend } from "@/lib/resend";
import EmailVerificationTemplate from "@/utils/mail_template/email_verification_template";
import { generateVerificationToken } from "@/utils/token_generator";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      throw new BadRequestError("Request body is required");
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

    const { user, verificationToken } = await prisma.$transaction(
      async (tx) => {
        const user = await tx.user.create({
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

        const token = generateVerificationToken();
        const expiredDate = new Date(Date.now() + 1000 * 60 * 60 * 24);
        const verificationToken = await tx.verificationToken.create({
          data: {
            token: token,
            expires: expiredDate,
            userId: user.id,
          },
        });

        return { user, verificationToken };
      }
    );

    const { error } = await resend.emails.send({
      from: "Kyoko <kyoko@akayiru.xyz>",
      to: [user.email],
      subject: "Welcome to Kyoko",
      react: await EmailVerificationTemplate({
        name: user.name ?? "",
        verificationLink: `http://localhost:3000/auth/verification/${verificationToken.id}`,
        token: verificationToken.token,
      }),
    });

    if (error) {
      throw Error("Failed to send email verification");
    }

    return NextResponse.json(
      { message: "success create account!", user },
      { status: HttpCode.Created }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        code: "INTERNAL_ERROR",
        message: error.message || "An unexpected error occurred",
      } satisfies ErrorResponse,
      { status: HttpCode.InternalServerError }
    );
  }
}
