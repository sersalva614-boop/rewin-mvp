'use client';

import { useMemo, useState } from 'react';

type Variant = {
  id: number;
  storageGb: number;
  conditionLabel: string;
  batteryMinPercent: number;
  priceEur: number;
  stock: number;
  esimOnly: boolean;
};

type Props = {
  productSlug: string;
  model: string;
  variants: Variant[];
};

export default function ProductSelector({ productSlug, model, variants }: Props) {
  const storages = useMemo(() => Array.from(new Set(variants.map(v=>v.storageGb))).sort((a,b)=>a-b), [variants]);
  const [storage, setStorage] = useState<number>(storages[0] ?? 128);
  const conditions = useMemo(
    () => variants
      .filter(v => v.storageGb === storage)
      .sort((a, b) => a.conditionLabel.localeCompare(b.conditionLabel)),
    [variants, storage]
  );
  const [variantId, setVariantId] = useState<number>(conditions[0]?.id ?? variants[0]?.id);

  const selected = variants.find(v => v.id === variantId);

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        {storages.map(s => (
          <button
            key={s}
            onClick={() => { setStorage(s); const v = variants.find(v=>v.storageGb===s); if (v) setVariantId(v.id); }}
            className={`px-3 py-2 rounded-lg border ${storage===s ? 'bg-slate-900 text-white' : ''}`}
          >
            {s} GB
          </button>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap">
        {conditions.map(v => (
          <button
            key={v.id}
            onClick={() => setVariantId(v.id)}
            className={`px-3 py-2 rounded-lg border ${variantId===v.id ? 'bg-slate-900 text-white' : ''}`}
            title={v.conditionLabel}
          >
            {v.conditionLabel}
          </button>
        ))}
      </div>

      <div className="border rounded-2xl p-4">
        <div className="text-2xl font-semibold">{selected ? `${selected.priceEur} €` : '-'}</div>
        <div className="mt-2 text-sm text-slate-700">
          Batería ≥ {selected?.batteryMinPercent ?? 85}% · 12 meses de garantía · 14 días de devolución
        </div>
        {selected?.esimOnly && (
          <div className="mt-2 text-sm text-amber-700">
            Importante: este modelo es solo compatible con eSIM.
          </div>
        )}
        <div className="mt-4 flex gap-3 flex-wrap">
          <a
            href={`/checkout?variantId=${selected?.id}&qty=1`}
            className={`px-4 py-2 rounded-lg ${selected && selected.stock>0 ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-500 pointer-events-none'}`}
          >
            Comprar con garantía Rewin
          </a>
          <div className="text-sm text-slate-600 self-center">
            Stock: {selected?.stock ?? 0}
          </div>
        </div>
      </div>
    </div>
  );
}
