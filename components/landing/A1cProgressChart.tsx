export default function A1cProgressChart({
  id,
  startA1c,
  threeMonthA1c,
  reversedMonths,
  medicineStoppedDays,
}: {
  id: string;
  startA1c: number;
  threeMonthA1c: number;
  reversedMonths: number;
  medicineStoppedDays: number;
}) {
  const gradientId = `a1cGradient-${id}`;
  const yMax = 11;
  const yMin = 5;
  const chartW = 280;
  const chartH = 120;
  const padX = 24;
  const padY = 16;

  const toY = (val: number) =>
    padY + ((yMax - val) / (yMax - yMin)) * (chartH - padY * 2);

  const startX = padX;
  const month3X = chartW * 0.35;
  const month6X = chartW * 0.62;
  const endX = chartW - padX;

  const startY = toY(startA1c);
  const month3Y = toY(threeMonthA1c);
  const endY = toY(5.4);

  const path = `M ${startX} ${startY} C ${month3X * 0.5} ${startY} ${month3X * 0.7} ${month3Y} ${month3X} ${month3Y} S ${month6X} ${endY} ${endX} ${endY}`;

  return (
    <div className="rounded-xl border border-brand-border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2 text-[10px] font-shop uppercase tracking-wide text-brand-muted">
        <span>Start of program</span>
        <span>Within 3 months</span>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-brand-muted">🩸 A1C:</span>
          <span className="font-bold text-red-600">{startA1c}</span>
          <span className="flex-1 border-t border-dashed border-brand-border" />
          <span className="rounded-full bg-brand-green px-2.5 py-0.5 font-bold text-white">
            {threeMonthA1c}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-brand-muted">💊 Medicines:</span>
          <span className="font-bold text-red-600">1</span>
          <span className="flex-1 border-t border-dashed border-brand-border" />
          <span className="rounded-full bg-brand-green px-2.5 py-0.5 font-bold text-white">
            0
          </span>
        </div>
      </div>

      <div className="relative mx-auto mb-2 flex justify-center">
        <span className="absolute -left-1 top-1/2 -translate-y-1/2 rounded-full bg-[#d4a574] px-2 py-1 text-[9px] font-bold uppercase text-white">
          Medicine Stopped
          <br />
          {medicineStoppedDays} Days
        </span>
        <svg
          viewBox={`0 0 ${chartW} ${chartH + 40}`}
          className="h-auto w-full max-w-[300px]"
          aria-hidden
        >
          <text x="4" y="14" className="fill-brand-muted text-[8px]">
            A1C
          </text>
          {[5, 8, 11].map((v) => (
            <g key={v}>
              <line
                x1={padX}
                y1={toY(v)}
                x2={chartW - padX}
                y2={toY(v)}
                stroke="#e5e7e3"
                strokeWidth="0.5"
              />
              <text
                x="4"
                y={toY(v) + 3}
                className="fill-brand-muted text-[8px]"
              >
                {v}
              </text>
            </g>
          ))}

          <path
            d={path}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#3d6b4f" />
            </linearGradient>
          </defs>

          <line
            x1={month3X}
            y1={padY}
            x2={month3X}
            y2={chartH}
            stroke="#9ca3af"
            strokeDasharray="3 3"
          />
          <rect
            x={month3X - 42}
            y={month3Y - 28}
            width="84"
            height="22"
            rx="11"
            fill="#7c3aed"
          />
          <text
            x={month3X}
            y={month3Y - 14}
            textAnchor="middle"
            className="fill-white text-[7px] font-bold"
          >
            {threeMonthA1c} HbA1c in 3 months
          </text>

          <line
            x1={month6X}
            y1={padY}
            x2={month6X}
            y2={chartH}
            stroke="#9ca3af"
            strokeDasharray="3 3"
          />
          <rect
            x={month6X - 52}
            y={endY - 36}
            width="104"
            height="22"
            rx="11"
            fill="#0d9488"
          />
          <text
            x={month6X}
            y={endY - 22}
            textAnchor="middle"
            className="fill-white text-[7px] font-bold"
          >
            Reversed Diabetes in {reversedMonths} months
          </text>

          <text
            x={chartW / 2}
            y={chartH + 28}
            textAnchor="middle"
            className="fill-brand-muted text-[8px]"
          >
            one year program
          </text>
        </svg>
      </div>
    </div>
  );
}
