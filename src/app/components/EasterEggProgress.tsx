"use client";
import { useEasterEggs } from "../context/EasterEggContext";

export default function EasterEggProgress() {
  const { eggs } = useEasterEggs();
  const discovered = eggs.filter((egg) => egg.discovered).length;
  const total = eggs.length;

  return (
    <div className="fixed bottom-4 right-4 text-sm text-gray-500">
      <p>
        Easter eggs found: {discovered}/{total}
      </p>
    </div>
  );
}
