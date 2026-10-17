import { motion } from "motion/react"
import { rise, stagger } from "./login_page";
export function BrandPanel({ reduce }: { reduce: boolean }) {
  const drift = (x: number, y: number, d: number) =>
    reduce
      ? {}
      : {
          animate: { x: [0, x, 0], y: [0, y, 0] },
          transition: { duration: d, repeat: Infinity, ease: "easeInOut" as const },
        };

  return (
    <div className="relative hidden overflow-hidden rounded-3xl bg-linear-to-b from-[#5BA3DB] via-[#B7D6EC] to-[#EAF3F9] lg:block">
      <motion.div
        {...drift(30, 24, 12)}
        className="absolute -right-10 top-10 size-72 rounded-full bg-[#2B7BB9]/60 blur-3xl"
      />
      <motion.div
        {...drift(-24, -30, 15)}
        className="absolute right-0 top-1/2 size-60 rounded-full bg-[#F2B263]/50 blur-3xl"
      />
      <motion.div
        {...drift(26, -20, 13)}
        className="absolute -left-10 bottom-24 size-64 rounded-full bg-[#8FD3C9]/70 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="absolute inset-x-8 top-[20%] select-none text-[7.5rem] font-semibold leading-none tracking-tighter text-white xl:text-[9rem]"
      >
        Fluent
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={
          reduce
            ? { opacity: 1, scale: 1 }
            : { opacity: 1, scale: 1, y: [0, -14, 0] }
        }
        transition={
          reduce
            ? { duration: 0.6 }
            : {
                opacity: { duration: 0.8, delay: 0.5 },
                scale: { duration: 0.8, delay: 0.5 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.3 },
              }
        }
        className="absolute left-[34%] top-[34%] size-40 rounded-full shadow-[0_30px_60px_-10px_rgba(13,43,69,0.35)] xl:size-48"
        style={{
          background:
            "radial-gradient(circle at 30% 22%, rgba(255,255,255,0.95), rgba(255,255,255,0) 32%), radial-gradient(circle at 72% 82%, #8FD3C9, transparent 58%), linear-gradient(140deg, #5BA3DB 0%, #2B7BB9 55%, #F2B263 120%)",
        }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="absolute inset-x-8 bottom-8 text-[#0D2B45]"
      >
        <motion.h2 variants={rise} className="text-3xl font-semibold tracking-tight">
          Learn English by speaking it
        </motion.h2>
        <motion.p variants={rise} className="mt-3 max-w-md text-[15px] leading-relaxed text-[#0D2B45]/70">
          Practice real conversations with an AI partner, get instant
          pronunciation feedback, and book live tutors when you want a human to
          push you further.
        </motion.p>
      </motion.div>
    </div>
  );
}