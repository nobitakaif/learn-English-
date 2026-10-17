"use client";

import { useEffect, useState } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Flame,
  Loader2,
  Lock,
  Mail,
  Mic,
  Target,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* ---------- animation variants ---------- */

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ---------- small pieces ---------- */

function Counter({ to, delay = 0 }: { to: number; delay?: number }) {
  const value = useMotionValue(0);
  const rounded = useTransform(value, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(value, to, { duration: 1.6, delay, ease: "easeOut" });
    return () => controls.stop();
  }, [to, delay, value]);

  return <motion.span>{rounded}</motion.span>;
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
        <Mic className="size-5" />
      </div>
      <span
        className={`text-xl font-semibold tracking-tight ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        FluentPath
      </span>
    </div>
  );
}

/* ---------- left side: what the platform does ---------- */

const features = [
  {
    icon: Mic,
    title: "Speak with an AI partner",
    text: "Practice real conversations out loud and get instant feedback on every sentence.",
  },
  {
    icon: Users,
    title: "Book live tutors",
    text: "One-to-one lessons with certified teachers who match your goals and schedule.",
  },
  {
    icon: Target,
    title: "Follow a path built for you",
    text: "A short level check creates a plan around your job, your exam, or your next trip.",
  },
];

function LessonPreview({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={
        reduce
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 1, y: [0, -8, 0], scale: 1 }
      }
      transition={
        reduce
          ? { duration: 0.4 }
          : {
              opacity: { duration: 0.6, delay: 0.5 },
              scale: { duration: 0.6, delay: 0.5 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 },
            }
      }
      className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur-md"
    >
      <div className="mb-4 flex items-center justify-between text-sm text-white/70">
        <span>Lesson: ordering at a café</span>
        <span className="flex items-center gap-1.5 text-highlight">
          <Flame className="size-4" /> 12-day streak
        </span>
      </div>

      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 0.45 }}
          className="max-w-[85%] rounded-2xl rounded-bl-md bg-white/10 px-4 py-2.5 text-sm text-white"
        >
          Hi! What would you like to drink today?
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8, duration: 0.45 }}
          className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-primary-foreground"
        >
          I’d like a large coffee with milk, please.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.4 }}
          className="flex flex-wrap gap-2 pt-1"
        >
          <span className="rounded-full bg-highlight px-3 py-1 text-xs font-medium text-highlight-foreground">
            Pronunciation <Counter to={92} delay={2.7} />%
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/90">
            Great word choice
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/90">
            Try “a flat white”
          </span>
        </motion.div>

        <div className="pt-2">
          <div className="mb-1.5 flex justify-between text-xs text-white/60">
            <span>Lesson progress</span>
            <span>
              <Counter to={72} delay={1.2} />%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "72%" }}
              transition={{ delay: 1.2, duration: 1.6, ease: "easeOut" }}
              className="h-full rounded-full bg-highlight"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BrandPanel({ reduce }: { reduce: boolean }) {
  const float = (x: number, y: number, d: number) =>
    reduce
      ? {}
      : {
          animate: { x: [0, x, 0], y: [0, y, 0] },
          transition: { duration: d, repeat: Infinity, ease: "easeInOut" as const },
        };

  return (
    <aside className="relative hidden overflow-hidden bg-[#0D2B45] text-white lg:flex lg:w-[54%]">
      <motion.div
        {...float(40, 30, 14)}
        className="absolute -left-24 -top-24 size-[420px] rounded-full bg-primary/40 blur-3xl"
      />
      <motion.div
        {...float(-30, -40, 18)}
        className="absolute -bottom-32 -right-24 size-[460px] rounded-full bg-[#2B7BB9]/30 blur-3xl"
      />
      <motion.div
        {...float(20, -25, 12)}
        className="absolute right-1/4 top-1/3 size-48 rounded-full bg-highlight/15 blur-3xl"
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 flex w-full flex-col justify-between gap-10 p-12 xl:p-16"
      >
        <motion.div variants={rise}>
          <Logo light />
        </motion.div>

        <div className="space-y-10">
          <motion.div variants={rise} className="space-y-4">
            <h1 className="max-w-md text-4xl font-semibold leading-[1.1] tracking-tight xl:text-5xl">
              Speak English like you mean it.
            </h1>
            <p className="max-w-md text-lg text-white/75">
              Practice real conversations, fix your pronunciation, and book a
              live tutor when you want a human to push you further.
            </p>
          </motion.div>

          <ul className="space-y-5">
            {features.map(({ icon: Icon, title, text }) => (
              <motion.li key={title} variants={rise} className="flex gap-4">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-highlight">
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="max-w-sm text-sm text-white/65">{text}</p>
                </div>
              </motion.li>
            ))}
          </ul>

          <LessonPreview reduce={reduce} />
        </div>

        <motion.dl variants={rise} className="flex gap-10 text-sm text-white/65">
          {[
            ["2M+", "learners"],
            ["1,500", "certified tutors"],
            ["4.8", "app rating"],
          ].map(([n, l]) => (
            <div key={l}>
              <dt className="text-2xl font-semibold text-white">{n}</dt>
              <dd>{l}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </aside>
  );
}

/* ---------- right side: login ---------- */

function LoginPanel() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<"email" | "google" | null>(null);
  const [error, setError] = useState("");

  async function handleGoogle() {
    setError("");
    setLoading("google");
    try {
      // TODO: connect your auth, for example:
      // await signIn("google", { callbackUrl: "/dashboard" });
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
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    setLoading("email");
    try {
      // TODO: connect your auth, for example:
      // await signIn("credentials", { email, password, callbackUrl: "/dashboard" });
      void email;
      void password;
      await new Promise((r) => setTimeout(r, 1200));
    } catch {
      setError("That email or password doesn’t match. Try again.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <main className="relative flex flex-1 items-center justify-center bg-background px-6 py-12">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="w-full max-w-sm"
      >
        <motion.div variants={rise} className="mb-10 lg:hidden">
          <Logo />
        </motion.div>

        <motion.div variants={rise} className="mb-8 space-y-2">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Welcome back
          </h2>
          <p className="text-muted-foreground">
            Log in to pick up your lesson where you left off.
          </p>
        </motion.div>

        <motion.div variants={rise}>
          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogle}
              disabled={loading !== null}
              className="h-11 w-full gap-3 bg-card text-base"
            >
              {loading === "google" ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              Continue with Google
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={rise}
          className="my-6 flex items-center gap-4 text-sm text-muted-foreground"
        >
          <span className="h-px flex-1 bg-border" />
          or log in with email
          <span className="h-px flex-1 bg-border" />
        </motion.div>

        <form onSubmit={handleEmail} className="space-y-5">
          <motion.div variants={rise} className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@company.com"
                required
                className="h-11 bg-card pl-10"
              />
            </div>
          </motion.div>

          <motion.div variants={rise} className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a
                href="/forgot-password"
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
                className="h-11 bg-card px-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="text-sm text-destructive"
            >
              {error}
            </motion.p>
          )}

          <motion.div variants={rise}>
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={loading !== null}
                className="group h-11 w-full text-base"
              >
                {loading === "email" ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <>
                    Log in
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>
        </form>

        <motion.p
          variants={rise}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          New to FluentPath?{" "}
          <a href="/signup" className="font-medium text-primary hover:underline">
            Create a free account
          </a>
        </motion.p>
      </motion.div>
    </main>
  );
}


export default function LoginPage() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="flex min-h-screen">
      <BrandPanel reduce={reduce} />
      <LoginPanel />
    </div>
  );
}