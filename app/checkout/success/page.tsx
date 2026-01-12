export default function SuccessPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">✅ Pedido confirmado (demo)</h1>
      <p className="mt-2 text-slate-700">
        Gracias. Esto es una demo: no se ha cobrado nada. En la versión real enviaremos emails y tracking.
      </p>

      <a href="/" className="inline-block mt-6 border rounded-lg px-4 py-2 hover:shadow">
        Volver a la home
      </a>
    </main>
  );
}
