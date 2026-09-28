"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function WorkoutDetailsPage() {
  const params = useParams();
  const workoutId = params.id;

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToPlan, addToSaved } = usePlan();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    fetch(`https://api.abcz.workers.dev/api/fitlog/${workoutId}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [workoutId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-3">
        <div className="w-10 h-10 border-4 border-white/20 border-t-[#ccff00] rounded-full animate-spin"></div>
        <p className="text-gray-400 text-sm">Loading workout…</p>
      </div>
    );
  }

  if (!workout || workout.error) {
    return (
      <div className="text-center py-32 text-gray-400">
        Sorry, we couldn&apos;t find that workout.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
      <img
        src={workout.image}
        alt={workout.name}
        className="w-full h-full max-h-[520px] rounded-xl object-cover"
      />

      <div>
        <h1 className="font-[Oswald,sans-serif] text-3xl font-bold uppercase mb-3">
          {workout.name}
        </h1>
        <p className="text-gray-400 mb-4">{workout.description}</p>

        <div className="flex gap-2 mb-6">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="bg-[#ccff00] text-black text-xs font-bold uppercase px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="bg-[#14161d] border border-white/10 rounded-xl p-4 mb-6 text-sm">
          <SpecRow label="Equipment" value={workout.equipment} />
          <SpecRow label="Difficulty" value={workout.difficulty} />
          <SpecRow label="Sets" value={workout.sets} />
          <SpecRow label="Reps" value={workout.reps} />
          <SpecRow label="Duration" value={`${workout.duration} min`} />
          <SpecRow label="Calories" value={`${workout.caloriesBurned} kcal`} />
          <SpecRow label="Rating" value={workout.rating} last />
        </div>

        <h2 className="font-bold uppercase text-sm mb-2">Instructions</h2>
        <ol className="list-decimal list-inside text-gray-400 space-y-1 mb-7">
          {workout.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => addToPlan(workout)}
            className="bg-[#ccff00] text-black font-bold px-5 py-3 rounded-lg flex items-center gap-2 hover:brightness-95"
          >
            ➕ Add to today&apos;s plan
          </button>
          <button
            onClick={() => addToSaved(workout)}
            className="border border-white/30 text-white font-bold px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-white/5"
          >
            🔖 Save for later
          </button>
        </div>
      </div>
    </div>
  );
}

function SpecRow({ label, value, last }) {
  return (
    <div
      className={
        "flex justify-between py-2" +
        (last ? "" : " border-b border-white/10")
      }
    >
      <span className="text-gray-400 uppercase text-xs tracking-wide">
        {label}
      </span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
