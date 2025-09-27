"use server";

import { cookies } from "next/headers";

export async function getCookie(name: string): Promise<string | undefined> {
  try {
    const cookieStore = cookies();
    return (await cookieStore).get(name)?.value;
  } catch {
    return undefined;
  }
}
