import { NextResponse } from "next/server";

import { APP_CONFIG } from "@/constants/config";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    app: APP_CONFIG.name,
    timestamp: new Date().toISOString(),
  });
}
