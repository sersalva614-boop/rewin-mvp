export default function ProductPage({ params }: { params: { slug: string } }) {
  const title =
    params.slug === "iphone-11"
      ? "iPhone 11 reacondicionado"
      : params.slug === "iphone-12"
      ? "iPhone 12 reacondicionado"
      : params.slug === "iphone-13"
      ? "iPhone 13 reacondicionado"
      : "iPhone reacondicionado";

  return (
    <main className="p-8">
      <a href="/" className="text-sm text-slate-600 hover:underline">
        ← Volver
      </a>

      <h1 className="text-3xl font-bold mt-4">{title}</h1>
      <p className="mt-2 text-slate-700">
        Revisado, con batería mínima garantizada (≥85%), 12 meses de garantía y 14 días de devolución.
      </p>

      <div className="mt-8 border rounded-lg p-4">
        <h2 className="text-xl font-semibold">Elige tu configuración</h2>
        <p className="text-slate-600 mt-2">
          (Demo) En la versión final aquí irán capacidad, estado (Excelente/Muy bueno) y precio dinámico.
        </p>

        <a
          href="/checkout"
          className="inline-block mt-6 border rounded-lg px-4 py-2 hover:shadow"
        >
          Comprar (demo)
        </a>
      </div>
    </main>
  );
}
