import { backendUrl } from "@/store/auth/API";
import { LoginCreds } from "@/store/auth/Types";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const validateUrl = backendUrl + "/api/auth/validate";

export async function GET(req: NextRequest) {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    console.log(validateUrl);
    console.log("all cookies = ", cookies().getAll("userId"));
    cookies.set(
      "userId",
      cookies().get("userId") ? cookies().get("userId") : ""
    );
    const response = await axios.get(validateUrl, config);
    console.log(response.data);
    console.log(response.headers);
    return NextResponse.json(response.data);
  } catch (err: any) {
    console.log("message = ", err.message);
    return NextResponse.json({
      success: false,
      message: "Some Issue with next validate api",
      error: err.message,
    });
  }
}
