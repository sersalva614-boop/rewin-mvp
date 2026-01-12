import { getProducts } from '../lib/catalog';

export default async function Home() {
  const products = getProducts();

  return (
    <div className="space-y-10">
      <section className="border rounded-2xl p-6">
        <h1 className="text-3xl font-semibold">iPhones reacondicionados, sin riesgos.</h1>
        <p className="mt-2 text-slate-700">
          Revisados y certificados. Batería mínima 85% garantizada, 12 meses de garantía y 14 días de devolución.
        </p>
        <div className="mt-5 flex gap-3 flex-wrap">
          <a href="#catalogo" className="px-4 py-2 rounded-lg bg-slate-900 text-white">Ver iPhones</a>
          <a href="/legal/devoluciones" className="px-4 py-2 rounded-lg border">Devoluciones y garantía</a>
        </div>
      </section>

      <section id="catalogo" className="space-y-4">
        <h2 className="text-xl font-semibold">Catálogo</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <a key={p.id} href={`/p/${p.slug}`} className="border rounded-2xl p-4 hover:shadow-sm transition">
              <div className="text-sm text-slate-600">Apple</div>
              <div className="text-lg font-semibold">{p.model}</div>
              <div className="mt-2 text-slate-700">
                Desde <span className="font-semibold">{p.fromPriceEur ?? '-'} €</span>
              </div>
              <div className="mt-3 text-sm text-slate-600">
                {p.variants.length} variantes · {p.variants.reduce((s, v) => s + v.stock, 0)} en stock
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
