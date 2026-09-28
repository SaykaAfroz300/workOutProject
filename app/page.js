import WorkoutCard from "@/components/WorkoutCard";

// we don't want next.js to try to cache this at build time,
// we just want fresh data every time someone visits the page
async function getWorkouts() {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export default async function HomePage() {
  const workouts = await getWorkouts();

  return (
    <div>
      {/* Hero / Banner */}
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-10 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <p className="text-[#ccff00] text-sm font-bold tracking-[0.2em] mb-3">
            WORKOUT LIBRARY
          </p>
          <h1 className="font-[Oswald,sans-serif] text-4xl md:text-5xl font-bold uppercase leading-tight mb-5">
            Train With Intent.
            <br />
            Log Every Set.
          </h1>
          <p className="text-gray-400 max-w-md mb-7">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3 rounded-lg hover:brightness-95"
          >
            🏋️ BROWSE WORKOUTS
          </a>
        </div>

        <div className="flex-1 flex justify-center">
          {workouts[0] && (
            <img
              src={workouts[0].image}
              alt="workout banner"
              className="max-h-80 rounded-2xl object-cover"
            />
          )}
        </div>
      </section>

      {/* Library */}
      <section id="library" className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="font-[Oswald,sans-serif] text-2xl md:text-3xl font-bold uppercase mb-1">
          The Library
        </h2>
        <p className="text-gray-400 mb-7">
          Twelve lifts covering every major muscle group.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>
    </div>
  );
}
