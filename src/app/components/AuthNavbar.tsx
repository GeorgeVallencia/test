"use client";

import { auth } from "@/firebase";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AuthNavbar() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [signOutError, setSignOutError] = useState("");

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  async function handleSignOut() {
    setSignOutError("");
    try {
      await signOut(auth);
    } catch {
      setSignOutError("Could not sign out. Please try again.");
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <nav aria-label="Main navigation" className="flex items-center gap-2 sm:gap-3">
        <a href="#subjects" className="hidden rounded-full border border-slate-200 px-5 py-2.5 text-sm font-semibold transition hover:border-[#ff4500] hover:text-[#ff4500] sm:inline-flex">
          Explore subjects
        </a>
        {user === undefined ? (
          <span aria-label="Checking account" className="h-10 w-28 animate-pulse rounded-full bg-slate-100" />
        ) : user ? (
          <>
            <div className="flex min-w-0 items-center gap-2 rounded-full bg-slate-50 py-1.5 pl-1.5 pr-2 sm:pr-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fff1eb] text-sm font-bold uppercase text-[#ff4500]" aria-hidden="true">
                {(user.displayName || user.email || "U").charAt(0)}
              </span>
              <span className="max-w-24 truncate text-xs font-semibold text-slate-700 sm:max-w-44 sm:text-sm">
                {user.displayName || user.email || "Your account"}
              </span>
            </div>
            <button type="button" onClick={handleSignOut} className="cursor-pointer rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold transition hover:border-[#ff4500] hover:text-[#ff4500] sm:px-5">
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link href="/auth" className="rounded-full px-4 py-2.5 text-sm font-semibold transition hover:text-[#ff4500] sm:px-5">
              Log in
            </Link>
            <Link href="/auth" className="rounded-full bg-[#ff4500] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#e63e00] sm:px-5">
              Sign up
            </Link>
          </>
        )}
      </nav>
      {signOutError && <p role="alert" className="text-xs text-rose-600">{signOutError}</p>}
    </div>
  );
}
