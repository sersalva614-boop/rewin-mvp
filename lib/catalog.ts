import catalog from '../data/catalog.json';

export type Variant = {
  id: number;
  storageGb: number;
  conditionLabel: string;
  batteryMinPercent: number;
  priceEur: number;
  stock: number;
  esimOnly: boolean;
};

export type Product = {
  id: number;
  brand: string;
  model: string;
  slug: string;
  title: string;
  fromPriceEur: number | null;
  variants: Variant[];
};

type Catalog = { products: Product[] };

const CATALOG = catalog as unknown as Catalog;

export function getProducts(): Product[] {
  return CATALOG.products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return CATALOG.products.find((p) => p.slug === slug);
}

export function getVariantById(id: number): (Variant & { product: Pick<Product, 'id' | 'model' | 'slug'> }) | undefined {
  for (const p of CATALOG.products) {
    const v = p.variants.find((x) => x.id === id);
    if (v) return { ...v, product: { id: p.id, model: p.model, slug: p.slug } };
  }
  return undefined;
}
