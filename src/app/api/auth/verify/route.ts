import { BadRequestError, ErrorResponse } from "@/utils/error_template";
import { HttpCode } from "@/utils/http_code";
import { NextRequest, NextResponse } from "next/server";
import { VerificationSchema } from "./schema";
import { prisma } from "@/lib/prisma";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      throw new BadRequestError("Request body is required");
    }

    const result = VerificationSchema.safeParse(body);

    if (!result.success) {
      const { fieldErrors } = result.error?.flatten();
      return NextResponse.json(
        {
          code: "VALIDATION_ERROR",
          message: "Invalid input data",
          errors: fieldErrors,
        } satisfies ErrorResponse,
        { status: HttpCode.BadRequest }
      );
    }

    const verification = await prisma.verificationToken.findFirst({
      where: {
        id: body.verificationId,
      },
      select: {
        token: true,
        expires: true,
        userId: true,
      },
    });

    if (!verification) {
      return NextResponse.json(
        {
          code: "VERIFICATION_NOT_FOUND",
          message: "Verification token not found",
        } satisfies ErrorResponse,
        { status: HttpCode.NotFound }
      );
    }

    if (verification.expires < new Date()) {
      return NextResponse.json(
        {
          code: "VERIFICATION_TOKEN_EXPIRED",
          message: "Verification token expired",
        } satisfies ErrorResponse,
        { status: HttpCode.BadRequest }
      );
    }

    if (verification.token !== body.token) {
      return NextResponse.json(
        {
          code: "INVALID_VERIFICATION_TOKEN",
          message: "Invalid verification token",
        } satisfies ErrorResponse,
        { status: HttpCode.BadRequest }
      );
    }

    await prisma.user.update({
      where: {
        id: verification.userId,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    return NextResponse.json(
      {
        code: "VERIFICATION_SUCCESS",
        message: "Email successfully verified",
      },
      { status: HttpCode.OK }
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
};
