"use client";

import { usePlan } from "@/context/PlanContext";

export default function Toast() {
  const { toastMsg } = usePlan();

  if (!toastMsg) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#ccff00] text-black font-semibold px-5 py-3 rounded-lg shadow-lg">
      {toastMsg}
    </div>
  );
}
