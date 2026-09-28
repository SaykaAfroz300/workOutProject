import Link from "next/link";

export default function WorkoutCard({ workout }) {
    return (
        <Link
            href={`/workout/${workout.id}`}
            className="block bg-[#14161d] border border-white/10 rounded-xl overflow-hidden hover:border-[#ccff00]/60 transition"
        >
            <img
                src={workout.image}
                alt={workout.name}
                className="w-full h-44 object-cover"
            />

            <div className="p-4">
                <div className="flex gap-2 mb-3">
                    {workout.muscleGroups.map((tag) => (
                        <span
                            key={tag}
                            className="bg-[#ccff00] text-black text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="font-bold uppercase text-sm mb-1">{workout.name}</h3>
                <p className="text-gray-400 text-xs mb-3">{workout.equipment}</p>

                <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>⏱ {workout.duration} min</span>
                    <span>🔥 {workout.caloriesBurned} kcal</span>
                    <span>⭐ {workout.rating}</span>
                </div>
            </div>
        </Link>
    );
}
