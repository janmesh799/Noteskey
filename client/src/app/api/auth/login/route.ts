import { backendUrl } from "@/store/auth/API";
import { LoginCreds } from "@/store/auth/Types";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const loginUrl = backendUrl + "/api/auth/login";

export async function POST(req: NextRequest) {
  try {
    // Read the body as text
    const body = await req.text();

    // Parse the text to JSON
    const data: LoginCreds | null = body ? JSON.parse(body) : null;

    console.log(data);

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    console.log(loginUrl);
    console.log( "all cookies = ", cookies().getAll("userId"));

    const response = await axios.post(loginUrl, data, config);
    console.log(response.data);
    if (response.data.success === true) {
      cookies().set("userId", response.data.userId, {
        httpOnly: true,
        maxAge: 24 * 60 * 60,
      });
    }

    return NextResponse.json(response.data);
  } catch (err: any) {
    console.log("message = ", err.message);
    return NextResponse.json({
      success: false,
      message: "Some Issue with next login api",
      error: err.message,
    });
  }
}
