export default function Home() {
  const products = [
    {
      slug: "iphone-11",
      model: "iPhone 11",
      priceFrom: 249,
    },
    {
      slug: "iphone-12",
      model: "iPhone 12",
      priceFrom: 329,
    },
    {
      slug: "iphone-13",
      model: "iPhone 13",
      priceFrom: 429,
    },
  ];

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Rewin — iPhones reacondicionados sin riesgos
      </h1>

      <p className="mb-8 text-slate-600">
        Revisados, con batería mínima garantizada (≥85%), 12 meses de garantía y 14 días de devolución.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <a
            key={p.slug}
            href={`/p/${p.slug}`}
            className="border rounded-lg p-4 hover:shadow"
          >
            <h2 className="text-xl font-semibold">{p.model}</h2>
            <p className="mt-2 text-slate-600">Desde {p.priceFrom} €</p>
          </a>
        ))}
      </div>
    </main>
  );
}
<a
  href="https://wa.me/34666555111"
  className="inline-block mt-6 border rounded-lg px-4 py-2 hover:shadow"
>
  Hablar por WhatsApp
</a>
