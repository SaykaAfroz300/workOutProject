export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-3">
      <div className="w-10 h-10 border-4 border-white/20 border-t-[#ccff00] rounded-full animate-spin"></div>
      <p className="text-gray-400 text-sm">Loading workouts…</p>
    </div>
  );
}
