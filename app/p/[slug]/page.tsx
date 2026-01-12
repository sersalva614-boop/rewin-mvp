import { getProductBySlug, RewinCondition, Variant } from "../../lib/demoCatalog";

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return (
      <main className="p-8">
        <a href="/" className="text-sm text-slate-600 hover:underline">← Volver</a>
        <h1 className="text-2xl font-bold mt-4">Producto no encontrado</h1>
      </main>
    );
  }

  const capacities = unique(product.variants.map((v) => v.capacityGB)).sort((a, b) => a - b);
  const conditions: RewinCondition[] = ["Excelente", "Muy bueno"];

  const variantsFor = (capacityGB: number, condition: RewinCondition): Variant[] =>
    product.variants.filter((v) => v.capacityGB === capacityGB && v.condition === condition);

  const totalStock = product.variants.reduce((s, v) => s + v.stock, 0);

  return (
    <main className="p-8">
      <a href="/" className="text-sm text-slate-600 hover:underline">← Volver</a>

      <h1 className="text-3xl font-bold mt-4">{product.model} reacondicionado</h1>
      <p className="mt-2 text-slate-700">
        Revisado, con batería mínima garantizada (≥85%), 12 meses de garantía y 14 días de devolución.
      </p>

      <div className="mt-6 border rounded-lg p-4">
        <p className="text-slate-600">Stock total: <b>{totalStock}</b></p>

        <div className="mt-6">
          {capacities.map((cap) => (
            <div key={cap} className="mt-6">
              <h2 className="text-xl font-semibold">{cap} GB</h2>

              {conditions.map((cond) => {
                const vars = variantsFor(cap, cond);
                if (vars.length === 0) return null;

                const stockCond = vars.reduce((s, v) => s + v.stock, 0);
                const hasEsim = vars.some((v) => v.esimOnly);
                const minPrice = vars.map((v) => v.priceEUR).sort((a, b) => a - b)[0];

                return (
                  <div key={`${cap}-${cond}`} className="mt-3 border rounded-lg p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="font-semibold">{cond}</div>
                        <div className="text-slate-600 text-sm">
                          Stock: {stockCond}{hasEsim ? " · Incluye unidades eSIM" : ""}
                        </div>
                      </div>
                      <div className="text-slate-900 font-semibold">{minPrice} €</div>
                    </div>
                  </div>
                );
              })}

              <p className="text-slate-500 text-sm mt-2">
                Rewin vende solo Excelente (A+/A) y Muy bueno (A/B). B/C y C se excluyen.
              </p>
            </div>
          ))}
        </div>

        <a href="/checkout" className="inline-block mt-8 text-center border rounded-lg px-4 py-2 hover:shadow">
          Comprar (demo)
        </a>
      </div>
    </main>
  );
}
