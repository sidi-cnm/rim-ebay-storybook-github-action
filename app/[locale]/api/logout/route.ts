import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const sessionId = cookies().get("sessionId");
  cookies().delete("jwt");
  cookies().delete("user")
  return NextResponse.json({ message: "Déconnexion réussie" });
}
