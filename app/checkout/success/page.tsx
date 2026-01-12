export default async function SuccessPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const get = (k: string) => {
    const v = searchParams[k];
    return Array.isArray(v) ? v[0] : v;
  };

  const order = get('order');
  const model = get('model');
  const storage = get('storage');
  const condition = get('condition');
  const total = get('total');

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">¡Pedido confirmado! (Demo)</h1>
      <p className="text-slate-700">
        Esta es una demo: no se ha realizado ningún cobro. Úsalo para validar la experiencia de compra.
      </p>

      <div className="border rounded-2xl p-5">
        <div className="text-sm text-slate-600">Pedido #{order ?? '—'}</div>
        <div className="mt-2">Producto: <b>{model ?? '—'}</b></div>
        <div className="mt-1">Variante: {storage ?? '—'}GB · {condition ?? '—'}</div>
        <div className="mt-2">Total: <b>{total ?? '—'} €</b></div>
      </div>

      <a className="underline" href="/">Volver a Rewin</a>
    </div>
  );
}
