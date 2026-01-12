import { getProductBySlug } from '../../../lib/catalog';
import ProductSelector from '../../../components/ProductSelector';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return (
      <div className="border rounded-2xl p-6">
        <h1 className="text-2xl font-semibold">Producto no encontrado</h1>
        <p className="mt-2 text-slate-700">Este iPhone no está disponible en la demo.</p>
        <a className="inline-block mt-4 underline" href="/">Volver al catálogo</a>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <section className="grid lg:grid-cols-2 gap-8">
        <div className="border rounded-2xl p-6">
          <div className="aspect-[4/3] bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
            Imagen del producto
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">{product.model} reacondicionado</h1>
          <p className="text-slate-700">Revisado, certificado y con garantía Rewin.</p>
          <ProductSelector productSlug={product.slug} model={product.model} variants={product.variants} />
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <div className="border rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Estados Rewin</h2>
          <p className="mt-2 text-sm text-slate-700">Todos los iPhones son 100% funcionales. La diferencia entre estados es estética.</p>
          <ul className="mt-3 text-sm text-slate-700 list-disc pl-5 space-y-1">
            <li><b>Excelente</b>: aspecto como nuevo, microarañazos mínimos.</li>
            <li><b>Muy bueno</b>: marcas leves visibles, sin daños estructurales.</li>
          </ul>
        </div>
        <div className="border rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Batería garantizada</h2>
          <p className="mt-2 text-sm text-slate-700">Batería mínima 85% garantizada o batería nueva instalada.</p>
          <h3 className="text-lg font-semibold mt-5">Compra sin riesgos</h3>
          <p className="mt-2 text-sm text-slate-700">14 días de devolución y 12 meses de garantía gestionada por Rewin.</p>
        </div>
      </section>
    </div>
  );
}
