export default function CancelPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Pago cancelado</h1>
      <p className="text-slate-700">No se ha realizado ningún cargo. Puedes volver al producto e intentarlo de nuevo.</p>
      <a className="underline" href="/">Volver a Rewin</a>
    </div>
  );
}
