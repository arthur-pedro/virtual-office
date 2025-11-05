import { Suspense } from "react";

import { MapViewport } from "./features/map/components/MapViewport.tsx";
import { PlayerHud } from "./features/map/components/PlayerHud.tsx";

export default function App() {
  return (
    <div className="flex h-full flex-col bg-slate-900 text-slate-100">
      <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Virtual Office
          </p>
          <h1 className="text-lg font-semibold text-slate-100">
            Prototype — Offline Navigation
          </h1>
        </div>
        <PlayerHud />
      </header>

      <main className="relative flex flex-1 overflow-hidden">
        <Suspense fallback={<p className="m-auto text-slate-400">Loading...</p>}>
          <MapViewport />
        </Suspense>
      </main>
    </div>
  );
}
