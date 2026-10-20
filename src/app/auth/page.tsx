"use client";

import { auth } from "@/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

// ✅ FIX: Renamed explicitly to AuthComponent to avoid naming conflicts with NextJS routing
export default function AuthComponent() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
      }
      router.push("/"); 
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white border border-slate-200 p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-6">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff4500] text-xl font-black text-white mx-auto mb-3">Q</span>
          <h1 className="text-2xl font-black text-slate-900">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {isSignUp ? "Join Quizzy to track your scores and rewards" : "Log in to continue your streak"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-100 rounded-xl text-sm font-semibold text-rose-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#ff4500] text-slate-800 text-sm font-medium transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-20 rounded-xl border border-slate-200 focus:outline-none focus:border-[#ff4500] text-slate-800 text-sm font-medium transition"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-3 my-auto h-fit cursor-pointer text-xs font-bold text-slate-500 transition hover:text-[#ff4500]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full bg-[#ff4500] hover:bg-[#e63e00] disabled:bg-slate-300 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition duration-200 mt-2"
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-slate-100">
          <button 
            type="button"
            onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
            className="cursor-pointer text-sm font-semibold text-[#ff4500] hover:underline"
          >
            {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </main>
  );
}
