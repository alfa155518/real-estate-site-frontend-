import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// import middlewares
import { authUser } from "./authUser";


// Type for middlewares
type MiddlewareFn = (req: NextRequest) => NextResponse | null;

// put middlewares in array by order you want to run them first
const middlewares: MiddlewareFn[] = [authUser];

// Runner
export function runMiddlewares(req: NextRequest) {
  for (const mw of middlewares) {
    const res = mw(req);
    if (res) return res; // if middleware returns a response, return it
  }
  return NextResponse.next();
}
