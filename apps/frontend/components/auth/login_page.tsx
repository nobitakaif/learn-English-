"use client";

import { useState } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { Eye, EyeOff, Loader2, Lock, Mail, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrandPanel } from "@/components/auth/BrandPanel"

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};

export const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

/* ---------- left: brand panel with glossy orb ---------- */



/* ---------- right: glass login card ---------- */

const people = [
  { i: "PR", c: "bg-primary text-primary-foreground" },
  { i: "AK", c: "bg-highlight text-highlight-foreground" },
  { i: "LM", c: "bg-[#8FD3C9] text-[#0D2B45]" },
];

function LoginCard() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState<"email" | "google" | null>(null);
  const [error, setError] = useState("");

  async function handleGoogle() {
    setError("");
    setLoading("google");
    try {
      // TODO: await signIn("google", { callbackUrl: "/dashboard" });
      await new Promise((r) => setTimeout(r, 1200));
    } catch {
      setError("Couldn’t connect to Google. Try again.");
    } finally {
      setLoading(null);
    }
  }

  async function handleEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    void data.get("email");
    void data.get("password");
    setLoading("email");
    try {
      // TODO: await signIn("credentials", { email, password, callbackUrl: "/dashboard" });
      await new Promise((r) => setTimeout(r, 1200));
    } catch {
      setError("That email or password doesn’t match. Try again.");
    } finally {
      setLoading(null);
    }
  }

  const field =
    "h-12 rounded-xl border-white/70 bg-white/70 shadow-none placeholder:text-muted-foreground/70 focus-visible:bg-white";

  return (
    <div className="flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/55 p-8 backdrop-blur-xl sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-56 [mask-image:linear-gradient(to_bottom,black,transparent)]"
          style={{
            backgroundImage:
              "linear-gradient(45deg, rgba(43,123,185,0.07) 25%, transparent 25%, transparent 75%, rgba(43,123,185,0.07) 75%), linear-gradient(45deg, rgba(43,123,185,0.07) 25%, transparent 25%, transparent 75%, rgba(43,123,185,0.07) 75%)",
            backgroundSize: "28px 28px",
            backgroundPosition: "0 0, 14px 14px",
          }}
        />

        <motion.div variants={stagger} initial="hidden" animate="show" className="relative">
          <motion.div
            variants={rise}
            className="mb-6 grid size-12 place-items-center rounded-2xl border border-white/80 bg-white text-primary"
          >
            <Mic className="size-6" />
          </motion.div>

          <motion.h1 variants={rise} className="text-3xl font-semibold tracking-tight text-foreground">
            Welcome back
          </motion.h1>
          <motion.p variants={rise} className="mt-1.5 text-sm text-muted-foreground">
            Log in to continue your English journey.
          </motion.p>

          <form onSubmit={handleEmail} className="mt-7 space-y-4">
            <motion.div variants={rise} className="space-y-2">
              <Label htmlFor="email" className="text-xs">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={`${field} pl-10`} />
              </div>
            </motion.div>

            <motion.div variants={rise} className="space-y-2">
              <Label htmlFor="password" className="text-xs">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" name="password" type={show ? "text" : "password"} required autoComplete="current-password" placeholder="Enter your password" className={`${field} px-10`} />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </motion.div>

            <motion.div variants={rise} className="flex items-center justify-between text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-muted-foreground">
                <input type="checkbox" name="remember" className="size-4 rounded border-border accent-[#2B7BB9]" />
                Remember me
              </label>
              <a href="/forgot-password" className="font-medium text-foreground hover:text-primary hover:underline">
                Forgot password?
              </a>
            </motion.div>

            {error && (
              <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} role="alert" className="text-sm text-destructive">
                {error}
              </motion.p>
            )}

            <motion.div variants={rise}>
              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" disabled={loading !== null} className="h-12 w-full rounded-full text-base">
                  {loading === "email" ? <Loader2 className="size-5 animate-spin" /> : "Log in"}
                </Button>
              </motion.div>
            </motion.div>

            <motion.div variants={rise} className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-foreground/10" />
              Or continue with
              <span className="h-px flex-1 bg-foreground/10" />
            </motion.div>

            <motion.div variants={rise}>
              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogle}
                  disabled={loading !== null}
                  className="h-12 w-full gap-3 rounded-full border-white/80 bg-white/80 text-base hover:bg-white"
                >
                  {loading === "google" ? <Loader2 className="size-5 animate-spin" /> : <GoogleIcon />}
                  Google
                </Button>
              </motion.div>
            </motion.div>
          </form>

          <motion.p variants={rise} className="mt-6 text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <a href="/signup" className="font-semibold text-foreground hover:text-primary hover:underline">
              Sign up
            </a>
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
        className="flex items-center gap-4 rounded-3xl border border-white/70 bg-white/55 px-5 py-4 backdrop-blur-xl"
      >
        <div className="flex -space-x-3">
          {people.map((p) => (
            <span key={p.i} className={`grid size-10 place-items-center rounded-full border-2 border-white text-xs font-semibold ${p.c}`}>
              {p.i}
            </span>
          ))}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">2 million+ learners</p>
          <p className="text-xs text-muted-foreground">practicing worldwide</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- page ---------- */

export function LoginPage() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-secondary/50 p-4 sm:p-8">
      <motion.div
        aria-hidden
        animate={reduce ? undefined : { x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-32 -top-32 size-[520px] rounded-full bg-primary/30 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={reduce ? undefined : { x: [0, -40, 0], y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -right-32 size-[560px] rounded-full bg-highlight/30 blur-3xl"
      />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_15%,white,transparent)] opacity-70" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative grid w-full max-w-5xl gap-3 rounded-[2rem] border border-white/80 bg-white/40 p-3 shadow-[0_40px_80px_-30px_rgba(13,43,69,0.35)] backdrop-blur-xl lg:grid-cols-[1.05fr_1fr]"
      >
        <BrandPanel reduce={reduce} />
        <LoginCard />
      </motion.div>
    </div>
  );
}