"use client";

import dynamic from "next/dynamic";

const InterventionsMap = dynamic(
  () => import("./InterventionsMap").then((m) => m.InterventionsMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[460px] rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface-alt)]" />
    ),
  },
);

export function InterventionsMapLazy() {
  return <InterventionsMap />;
}
