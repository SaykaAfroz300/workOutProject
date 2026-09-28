"use client";

import { useState } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";

export default function MyPlanPage() {
  const { plan, saved, loaded, removeFromPlan, removeFromSaved, markDone } =
    usePlan();

  const [activeTab, setActiveTab] = useState("today");
  const [sortBy, setSortBy] = useState("duration");

  if (!loaded) {
    return (
      <div className="text-center py-32 text-gray-400">
        Loading workouts…
      </div>
    );
  }

  const totalExercises = plan.length;
  const totalMinutes = plan.reduce((sum, item) => sum + item.duration, 0);
  const totalCalories = plan.reduce(
    (sum, item) => sum + item.caloriesBurned,
    0
  );

  const currentList = activeTab === "today" ? plan : saved;

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }
    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="font-[Oswald,sans-serif] text-3xl font-bold uppercase mb-1">
        My Plan
      </h1>
      <p className="text-gray-400 mb-7">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Exercises" value={totalExercises} />
        <StatCard label="Minutes" value={totalMinutes} />
        <StatCard label="Calories" value={totalCalories} />
      </div>

      {/* tabs + sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div className="flex gap-1 bg-[#14161d] border border-white/10 rounded-full p-1">
          <button
            onClick={() => setActiveTab("today")}
            className={
              "px-4 py-1.5 rounded-full text-sm font-semibold " +
              (activeTab === "today"
                ? "bg-[#ccff00] text-black"
                : "text-gray-400")
            }
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={
              "px-4 py-1.5 rounded-full text-sm font-semibold " +
              (activeTab === "saved"
                ? "bg-white/15 text-white"
                : "text-gray-400")
            }
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#14161d] border border-white/10 rounded-lg px-3 py-1.5 text-white"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* list or empty state */}
      {sortedList.length === 0 ? (
        <div className="bg-[#14161d] border border-white/10 rounded-xl text-center py-20 px-6">
          <h3 className="font-bold uppercase mb-2">Nothing Here Yet</h3>
          <p className="text-gray-400 mb-5">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#ccff00] text-black font-bold px-5 py-2.5 rounded-lg"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedList.map((item) => (
            <div
              key={item.id}
              className="bg-[#14161d] border border-white/10 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center gap-3"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="font-bold uppercase text-sm">{item.name}</h3>
                <p className="text-gray-400 text-xs mb-1">{item.equipment}</p>
                <div className="flex gap-3 text-xs text-gray-400">
                  <span>⏱ {item.duration} min</span>
                  <span>🔥 {item.caloriesBurned} kcal</span>
                  <span>⭐ {item.rating}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/workout/${item.id}`}
                  className="border border-white/30 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-white/5"
                >
                  View Details
                </Link>

                {activeTab === "today" && (
                  <button
                    onClick={() => markDone(item.id)}
                    className={
                      "px-3 py-1.5 rounded-lg text-xs font-semibold " +
                      (item.done
                        ? "bg-[#ccff00] text-black"
                        : "border border-white/30 hover:bg-white/5")
                    }
                  >
                    ✓ Mark as Done
                  </button>
                )}

                <button
                  onClick={() =>
                    activeTab === "today"
                      ? removeFromPlan(item.id)
                      : removeFromSaved(item.id)
                  }
                  className="border border-white/30 px-2.5 py-1.5 rounded-lg text-xs hover:bg-white/5"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-[#14161d] border border-white/10 rounded-xl p-4">
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      <p className="text-[#ccff00] text-2xl font-bold">{value}</p>
    </div>
  );
}
