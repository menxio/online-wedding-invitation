"use client";

import { useActionState } from "react";
import { loginAdmin } from "@/app/admin/actions";

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(loginAdmin, null);
  return (
    <form action={action} className="mt-9 space-y-5">
      <div><label htmlFor="email" className="block text-xs font-bold tracking-[0.14em] uppercase">Email</label><input id="email" name="email" type="email" required autoComplete="email" className="mt-2 min-h-12 w-full border border-[#d9c8ba] bg-white px-3" /></div>
      <div><label htmlFor="password" className="block text-xs font-bold tracking-[0.14em] uppercase">Password</label><input id="password" name="password" type="password" required autoComplete="current-password" className="mt-2 min-h-12 w-full border border-[#d9c8ba] bg-white px-3" /></div>
      {state?.error ? <p role="alert" className="text-sm text-[#8c1d35]">{state.error}</p> : null}
      <button disabled={pending} className="min-h-12 w-full bg-[#681c2f] px-5 text-xs font-bold tracking-[0.16em] text-white uppercase disabled:opacity-60">{pending ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
