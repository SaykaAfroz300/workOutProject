"use client";

import { createContext, useContext, useEffect, useState } from "react";

// this context stores the "Today's Plan" list and the "Saved" list
// so the Navbar, Details page and My Plan page can all share the same data

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [toastMsg, setToastMsg] = useState("");
  const [loaded, setLoaded] = useState(false);

  // when the app first loads, grab whatever was saved in localStorage before
  useEffect(() => {
    const oldPlan = localStorage.getItem("fitlogPlan");
    const oldSaved = localStorage.getItem("fitlogSaved");

    if (oldPlan) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPlan(JSON.parse(oldPlan));
    }
    if (oldSaved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSaved(JSON.parse(oldSaved));
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoaded(true);
  }, []);

  // every time plan changes, save it back to localStorage
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("fitlogPlan", JSON.stringify(plan));
    }
  }, [plan, loaded]);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("fitlogSaved", JSON.stringify(saved));
    }
  }, [saved, loaded]);

  function showToast(msg) {
    setToastMsg(msg);
    // hide it again after a couple seconds
    setTimeout(() => {
      setToastMsg("");
    }, 2500);
  }

  function addToPlan(workout) {
    const alreadyIn = plan.find((item) => item.id === workout.id);
    if (alreadyIn) {
      showToast("Already in today's plan");
      return;
    }
    if (plan.length >= 5) {
      showToast("Plan is full — 5 lifts max for today");
      return;
    }
    setPlan([...plan, { ...workout, done: false }]);
    showToast("Added to today's plan");
  }

  function addToSaved(workout) {
    const alreadyIn = saved.find((item) => item.id === workout.id);
    if (alreadyIn) {
      showToast("Already saved");
      return;
    }
    setSaved([...saved, workout]);
    showToast("Saved for later");
  }

  function removeFromPlan(id) {
    setPlan(plan.filter((item) => item.id !== id));
    showToast("Removed from today's plan");
  }

  function removeFromSaved(id) {
    setSaved(saved.filter((item) => item.id !== id));
    showToast("Removed from saved");
  }

  function markDone(id) {
    setPlan(
      plan.map((item) => {
        if (item.id === id) {
          return { ...item, done: !item.done };
        }
        return item;
      })
    );
    showToast("Updated");
  }

  const value = {
    plan,
    saved,
    loaded,
    toastMsg,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    markDone,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  return useContext(PlanContext);
}
