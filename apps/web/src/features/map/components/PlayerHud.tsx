import { usePlayerStore } from "../state/playerStore.ts";

export function PlayerHud() {
  const player = usePlayerStore((state) => state.player);

  return (
    <div className="rounded-md border border-slate-800 bg-slate-900/80 px-3 py-2 shadow-lg shadow-slate-950/40">
      <p className="text-xs font-medium uppercase text-slate-400">
        {player.role}
      </p>
      <p className="text-sm font-semibold text-slate-100">
        {player.displayName} —{" "}
        <span className="font-normal text-slate-300">{player.status}</span>
      </p>
      <p className="text-xs text-slate-500">
        ({Math.round(player.position.x)}, {Math.round(player.position.y)})
      </p>
    </div>
  );
}
