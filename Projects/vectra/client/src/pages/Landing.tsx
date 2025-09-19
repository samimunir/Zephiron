import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const nav = useNavigate();
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Navigate your career with <span className="text-brand-600">precision</span>.
        </h1>
        <p className="mt-5 text-neutral-600 dark:text-neutral-300">
          Vectra helps you track applications, visualize progress, and tap into a focused community.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button onClick={()=>nav("/login")} className="rounded-xl bg-brand-600 px-5 py-3 text-white shadow-soft hover:bg-brand-700">Get started</button>
          <button onClick={()=>nav("/")} className="rounded-xl border border-neutral-300 px-5 py-3 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800">Learn more</button>
        </div>
      </motion.div>
    </section>
  );
}