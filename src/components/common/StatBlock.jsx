// src/components/common/StatBlock.jsx
export default function StatBlock({ label, value }) {
  return (
    <div className="px-6 py-6 sm:py-7 text-center break-words">
      <dt className="text-sm font-medium text-slate-400">{label}</dt>
      <dd className="mt-2 text-2xl sm:text-3xl font-semibold text-white">
        {value}
      </dd>
    </div>
  );
}
