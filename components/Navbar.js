"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
    const pathname = usePathname();
    const { plan, saved } = usePlan();

    return (
        <header className="bg-[#0a0a0c] border-b border-white/10 sticky top-0 z-40">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold tracking-wide">
                    <span className="text-[#ccff00] text-xl">⚡</span>
                    FITLOG
                </Link>

                <nav className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1">
                    <Link
                        href="/"
                        className={
                            "px-4 py-1.5 rounded-full text-sm " +
                            (pathname === "/"
                                ? "bg-white/15 text-white font-semibold"
                                : "text-gray-400 hover:text-white")
                        }
                    >
                        Workouts
                    </Link>
                    <Link
                        href="/my-plan"
                        className={
                            "px-4 py-1.5 rounded-full text-sm " +
                            (pathname === "/my-plan"
                                ? "bg-white/15 text-white font-semibold"
                                : "text-gray-400 hover:text-white")
                        }
                    >
                        My Plan
                    </Link>
                </nav>

                <Link href="/my-plan" className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1.5">
                        <span className="text-gray-400">Plan</span>
                        <span className="bg-[#ccff00] text-black font-bold w-5 h-5 rounded-full flex items-center justify-center text-[11px]">
                            {plan.length}
                        </span>
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="text-gray-400">Saved</span>
                        <span className="border border-white/40 text-white font-bold w-5 h-5 rounded-full flex items-center justify-center text-[11px]">
                            {saved.length}
                        </span>
                    </span>
                </Link>
            </div>
        </header>
    );
}
