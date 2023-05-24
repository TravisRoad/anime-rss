import bangumi from "@/bangumi-api/bangumi";
import { calendar } from "@/bangumi-api/type";
import { NextResponse } from "next/server";

export async function GET() {
  const data: calendar = await bangumi.getCalendar();
  return NextResponse.json(data);
}
