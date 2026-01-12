'use client';

import { useEffect, useState } from 'react';
import { getVariantById } from '../../lib/catalog';

type VariantDetail = {
  id: number;
  storageGb: number;
  conditionLabel: string;
  batteryMinPercent: number;
  priceEur: number;
  stock: number;
  esimOnly: boolean;
  product: { id: number; model: string; slug: string };
};

function getQueryParam(name: string) {
  if (typeof window === 'undefined') return null;
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

export default function CheckoutPage() {
  const [variant, setVariant] = useState<VariantDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');

  const [accept, setAccept] = useState(false);

  useEffect(() => {
    const variantId = getQueryParam('variantId');
    if (!variantId) {
      setError('Falta variantId');
      setLoading(false);
      return;
    }
    const v = getVariantById(Number(variantId));
    if (!v) setError('Variante no encontrada en la demo');
    else setVariant(v);
    setLoading(false);
  }, []);

  async function onPay() {
    if (!variant) return;
    if (!accept) {
      setError('Debes aceptar las condiciones.');
      return;
    }
    // DEMO: no cobramos, solo simulamos un pedido
    const fakeOrderId = Math.floor(Math.random() * 900000 + 100000);
    const qs = new URLSearchParams({
      order: String(fakeOrderId),
      email,
      name,
      phone,
      addressLine1,
      addressLine2,
      postalCode,
      city,
      province,
      model: variant.product.model,
      storage: String(variant.storageGb),
      condition: variant.conditionLabel,
      total: String(variant.priceEur),
    });
    window.location.href = `/checkout/success?${qs.toString()}`;
  }

  if (loading) return <div>Cargando checkout…</div>;
  if (error) return <div className="text-red-700">{error}</div>;
  if (!variant) return <div>No encontrado</div>;

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-2xl font-semibold">Checkout (Demo)</h1>
        <p className="text-sm text-slate-600">Esta es una demo: no se realiza ningún cobro.</p>

        <div className="border rounded-2xl p-5 space-y-3">
          <h2 className="font-semibold">Datos de contacto</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <input className="border rounded-lg px-3 py-2" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input className="border rounded-lg px-3 py-2" placeholder="Nombre y apellidos" value={name} onChange={(e)=>setName(e.target.value)} />
            <input className="border rounded-lg px-3 py-2" placeholder="Teléfono (opcional)" value={phone} onChange={(e)=>setPhone(e.target.value)} />
          </div>
        </div>

        <div className="border rounded-2xl p-5 space-y-3">
          <h2 className="font-semibold">Dirección de envío</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <input className="border rounded-lg px-3 py-2 md:col-span-2" placeholder="Dirección" value={addressLine1} onChange={(e)=>setAddressLine1(e.target.value)} />
            <input className="border rounded-lg px-3 py-2 md:col-span-2" placeholder="Piso / puerta (opcional)" value={addressLine2} onChange={(e)=>setAddressLine2(e.target.value)} />
            <input className="border rounded-lg px-3 py-2" placeholder="Código postal" value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} />
            <input className="border rounded-lg px-3 py-2" placeholder="Ciudad" value={city} onChange={(e)=>setCity(e.target.value)} />
            <input className="border rounded-lg px-3 py-2" placeholder="Provincia" value={province} onChange={(e)=>setProvince(e.target.value)} />
          </div>
        </div>

        <div className="border rounded-2xl p-5">
          <label className="flex gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={accept} onChange={(e)=>setAccept(e.target.checked)} />
            He leído y acepto las <a className="underline" href="/legal/condiciones">condiciones</a>, la <a className="underline" href="/legal/devoluciones">política de devoluciones</a> y la <a className="underline" href="/legal/privacidad">política de privacidad</a>.
          </label>
        </div>

        <button onClick={onPay} className="w-full md:w-auto px-5 py-3 rounded-lg bg-slate-900 text-white">
          Simular compra
        </button>
      </div>

      <aside className="border rounded-2xl p-5 h-fit">
        <h2 className="font-semibold">Resumen</h2>
        <div className="mt-3 text-sm text-slate-700">
          <div className="font-semibold">{variant.product.model} reacondicionado</div>
          <div>{variant.storageGb}GB · {variant.conditionLabel}</div>
          <div>Batería ≥ {variant.batteryMinPercent}%</div>
        </div>
        <div className="mt-4 border-t pt-4 flex justify-between">
          <div>Total</div>
          <div className="font-semibold">{variant.priceEur} €</div>
        </div>
        <div className="mt-3 text-xs text-slate-600">
          12 meses de garantía · 14 días de devolución · (Demo sin cobro)
        </div>
      </aside>
    </div>
  );
}
