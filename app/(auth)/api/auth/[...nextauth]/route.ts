import { GET as OriginalGET, POST as OriginalPOST } from "@/app/(auth)/auth"
import { NextRequest } from "next/server";

// Wrapping the original handlers to add logging
export const GET = async (request: NextRequest) => {
  console.log("Auth endpoint reached with GET request", new Date().toISOString());
  return OriginalGET(request);
};

export const POST = async (request: NextRequest) => {
  console.log("Auth endpoint reached with POST request", new Date().toISOString());
  return OriginalPOST(request);
};