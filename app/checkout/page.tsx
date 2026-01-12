export default function CheckoutPage() {
  return (
    <main className="p-8">
      <a href="/" className="text-sm text-slate-600 hover:underline">
        ← Volver
      </a>

      <h1 className="text-3xl font-bold mt-4">Checkout (demo)</h1>
      <p className="mt-2 text-slate-700">
        Esto es una demo: no se cobra nada. Sirve para enseñar el flujo de compra.
      </p>

      <div className="mt-8 grid gap-4 max-w-md">
        <input className="border rounded-lg p-3" placeholder="Email" />
        <input className="border rounded-lg p-3" placeholder="Nombre y apellidos" />
        <input className="border rounded-lg p-3" placeholder="Dirección" />
        <input className="border rounded-lg p-3" placeholder="Código postal" />

        <label className="text-sm text-slate-700">
          <input type="checkbox" defaultChecked /> Acepto condiciones y política de devoluciones
        </label>

        <a
          href="/success"
          className="inline-block text-center border rounded-lg px-4 py-2 hover:shadow"
        >
          Confirmar pedido (demo)
        </a>
      </div>
    </main>
  );
}
