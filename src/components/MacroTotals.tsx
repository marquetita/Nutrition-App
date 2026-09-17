import type { Macros } from '../types';

export function MacroTotals({ totals }: { totals: Required<Macros> }) {
  return (
    <div className="grid grid-cols-4 gap-2 rounded-xl bg-slate-900 p-4">
      <TotalStat label="Protein" value={totals.protein} unit="g" highlight />
      <TotalStat label="Fat" value={totals.fat} unit="g" />
      <TotalStat label="Carbs" value={totals.carbs} unit="g" />
      <TotalStat label="Sugar" value={totals.sugar} unit="g" />
    </div>
  );
}

function TotalStat({
  label,
  value,
  unit,
  highlight,
}: {
  label: string;
  value: number;
  unit: string;
  highlight?: boolean;
}) {
  return (
    <div className="text-center">
      <div className={`text-xl font-semibold ${highlight ? 'text-cyan-400' : 'text-slate-100'}`}>
        {Math.round(value * 10) / 10}
        <span className="ml-0.5 text-sm text-slate-500">{unit}</span>
      </div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}
