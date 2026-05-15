import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") || "en";

  const response = NextResponse.json({ message: `Locale set to ${locale}` });

  // Set the locale cookie
  response.cookies.set("locale", locale, {
    path: "/",
    expires: new Date("9999-12-31"),
  });
  return response;
}
