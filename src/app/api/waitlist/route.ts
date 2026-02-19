import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

// In-memory rate limit: max 5 attempts per IP per minute.
// On Vercel/serverless, instances don’t share memory; for stricter limits across all
// traffic use Upstash Redis + @upstash/ratelimit (free tier).
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry) return false;
  if (now >= entry.resetAt) {
    rateLimitMap.delete(ip);
    return false;
  }
  return entry.count >= RATE_LIMIT_MAX;
}

function recordRateLimit(ip: string): void {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now >= entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return;
  }
  entry.count += 1;
  // Prune old entries occasionally
  if (rateLimitMap.size > 5000) {
    for (const [key, val] of rateLimitMap) {
      if (Date.now() >= val.resetAt) rateLimitMap.delete(key);
    }
  }
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again in a minute." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const rawEmail = typeof body === "object" && body !== null ? body.email : undefined;

    if (!rawEmail || typeof rawEmail !== "string") {
      recordRateLimit(ip);
      return NextResponse.json(
        { error: "Please enter your email address." },
        { status: 400 }
      );
    }
    const trimmed = rawEmail.trim();
    if (!trimmed.includes("@") || !trimmed.includes(".") || trimmed.length < 5) {
      recordRateLimit(ip);
      return NextResponse.json(
        { error: "Please enter a valid email (e.g. you@example.com)." },
        { status: 400 }
      );
    }

    const email = normalizeEmail(rawEmail);
    const supabase = createServiceRoleClient();

    const { error } = await supabase.from("waitlist").insert({ email });

    if (error) {
      recordRateLimit(ip);
      if (error.code === "23505") {
        return NextResponse.json({ error: "You already signed up." }, { status: 409 });
      }
      throw error;
    }

    recordRateLimit(ip);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Waitlist error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
