import { DEMO_PRODUCTS, getPriceFromForProduct, getStockForProduct } from "./lib/demoCatalog";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-2">Rewin — iPhones reacondicionados sin riesgos</h1>
      <p className="text-slate-700 mb-6">
        Revisados, con batería mínima garantizada (≥85%), 12 meses de garantía y 14 días de devolución.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DEMO_PRODUCTS.map((p) => {
          const from = getPriceFromForProduct(p);
          return (
            <a key={p.slug} href={`/p/${p.slug}`} className="border rounded-lg p-4 hover:shadow">
              <h2 className="text-xl font-semibold">{p.model}</h2>
              <p className="mt-2 text-slate-800 font-semibold">{from ? `Desde ${from} €` : "Precio: —"}</p>
              <p className="mt-2 text-slate-600 text-sm">
                Variantes: {p.variants.length} · Stock: {getStockForProduct(p)}
              </p>
            </a>
          );
        })}
      </div>
    </main>
  );
}
