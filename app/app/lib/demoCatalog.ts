// app/lib/demoCatalog.ts
export type RewinCondition = "Excelente" | "Muy bueno";

export type Variant = {
  capacityGB: number;
  condition: RewinCondition;
  esimOnly: boolean;
  stock: number;
  priceEUR: number; // PVP Rewin (calculado)
};

export type Product = {
  slug: string;
  model: string; // "iPhone 11", "iPhone 11 Pro", etc.
  variants: Variant[];
};

// ====== REWIN PRICING (MVP DEMO) ======
function marginByModel(baseModel: string): number {
  const m = baseModel.toLowerCase();

  if (m.includes("iphone 11")) return 0.35;
  if (m.includes("iphone 12")) return 0.30;
  if (m.includes("iphone 13")) return 0.25;
  if (m.includes("iphone 14")) return 0.22;
  if (m.includes("iphone 15")) return 0.20;

  return 0.25;
}

function conditionExtraMargin(condition: RewinCondition): number {
  return condition === "Excelente" ? 0.03 : 0.0;
}

function roundToPsychological(price: number): number {
  const roundedUp = Math.ceil(price);
  const lastDigit = roundedUp % 10;
  const toAdd = (9 - lastDigit + 10) % 10;
  return roundedUp + toAdd;
}

function pvpFromCost(costEUR: number, baseModel: string, condition: RewinCondition): number {
  const margin = marginByModel(baseModel) + conditionExtraMargin(condition);
  const pvp = costEUR * (1 + margin);
  return roundToPsychological(pvp);
}

// ====== GRADING: proveedor -> Rewin ======
function mapGradeToCondition(gradeRaw: string): RewinCondition | null {
  const g = gradeRaw.trim().toUpperCase();

  // Rewin DEMO: solo Excelente/Muy bueno (ocultamos B/C y C)
  if (g.startsWith("A+/A")) return "Excelente";
  if (g === "A/B") return "Muy bueno";

  return null;
}

// ====== parsing helpers ======
function parseCapacityGB(modelName: string): number | null {
  const m = modelName.toUpperCase().match(/(\d+)\s*GB/);
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : null;
}

function parseBaseModel(modelName: string): string {
  return modelName.replace(/\s*\d+\s*GB\s*/i, "").trim();
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/á/g, "a")
    .replace(/é/g, "e")
    .replace(/í/g, "i")
    .replace(/ó/g, "o")
    .replace(/ú/g, "u")
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ====== Tus filas (model | grade | qty | costEUR) ======
// Nota: "100+" lo convertimos a 100 en demo.
const rows: Array<{ modelName: string; grade: string; qty: number; costEUR: number }> = [
  { modelName: "iPhone 11 128GB", grade: "A/B", qty: 12, costEUR: 177 },
  { modelName: "iPhone 11 128GB", grade: "A+/A", qty: 3, costEUR: 191 },
  { modelName: "iPhone 11 128GB", grade: "A+/A (ESIM)", qty: 6, costEUR: 191 },
  { modelName: "iPhone 11 256GB", grade: "A/B", qty: 3, costEUR: 198 },
  { modelName: "iPhone 11 64GB", grade: "A/B", qty: 51, costEUR: 162 },
  { modelName: "iPhone 11 64GB", grade: "A+/A", qty: 16, costEUR: 172 },

  { modelName: "iPhone 11 Pro 256GB", grade: "A/B", qty: 2, costEUR: 215 },
  { modelName: "iPhone 11 Pro 256GB", grade: "A+/A", qty: 1, costEUR: 230 },
  { modelName: "iPhone 11 Pro 512GB", grade: "A/B", qty: 1, costEUR: 242 },
  { modelName: "iPhone 11 Pro 64GB", grade: "A/B", qty: 10, costEUR: 194 },

  { modelName: "iPhone 11 Pro Max 256GB", grade: "A+/A", qty: 31, costEUR: 255 },
  { modelName: "iPhone 11 Pro Max 256GB", grade: "A+/A (ESIM)", qty: 8, costEUR: 255 },
  { modelName: "iPhone 11 Pro Max 256GB", grade: "A+/A (OEM)", qty: 1, costEUR: 265 },
  { modelName: "iPhone 11 Pro Max 512GB", grade: "A+/A", qty: 2, costEUR: 280 },
  { modelName: "iPhone 11 Pro Max 512GB", grade: "A+/A (ESIM)", qty: 2, costEUR: 280 },
  { modelName: "iPhone 11 Pro Max 64GB", grade: "A+/A", qty: 55, costEUR: 235 },
  { modelName: "iPhone 11 Pro Max 64GB", grade: "A+/A (ESIM)", qty: 4, costEUR: 235 },
  { modelName: "iPhone 11 Pro Max 64GB", grade: "B/C", qty: 1, costEUR: 207 }, // se excluye

  { modelName: "iPhone 12 128GB", grade: "A/B", qty: 21, costEUR: 200 },
  { modelName: "iPhone 12 64GB", grade: "A/B", qty: 31, costEUR: 180 },
  { modelName: "iPhone 12 64GB", grade: "A+/A", qty: 2, costEUR: 190 },
  { modelName: "iPhone 12 64GB", grade: "B/C", qty: 10, costEUR: 160 }, // excluye
  { modelName: "iPhone 12 64GB", grade: "C", qty: 5, costEUR: 155 },    // excluye

  { modelName: "iPhone 12 mini 128GB", grade: "B/C", qty: 10, costEUR: 145 }, // excluye
  { modelName: "iPhone 12 mini 256GB", grade: "A/B", qty: 1, costEUR: 180 },
  { modelName: "iPhone 12 mini 256GB", grade: "A+/A (ESIM)", qty: 1, costEUR: 190 },
  { modelName: "iPhone 12 mini 256GB", grade: "B/C", qty: 6, costEUR: 170 },  // excluye
  { modelName: "iPhone 12 mini 64GB", grade: "A+/A (ESIM)", qty: 1, costEUR: 160 },
  { modelName: "iPhone 12 mini 64GB", grade: "B/C", qty: 22, costEUR: 135 },  // excluye
  { modelName: "iPhone 12 mini 64GB", grade: "C", qty: 1, costEUR: 128 },     // excluye

  { modelName: "iPhone 12 Pro 128GB", grade: "A/B", qty: 3, costEUR: 253 },
  { modelName: "iPhone 12 Pro 128GB", grade: "A+/A", qty: 2, costEUR: 265 },
  { modelName: "iPhone 12 Pro 128GB", grade: "A+/A (ESIM)", qty: 15, costEUR: 265 },
  { modelName: "iPhone 12 Pro 128GB", grade: "A+/A (OEM)", qty: 4, costEUR: 280 },
  { modelName: "iPhone 12 Pro 256GB", grade: "A/B", qty: 1, costEUR: 270 },
  { modelName: "iPhone 12 Pro 256GB", grade: "B/C", qty: 1, costEUR: 255 }, // excluye
  { modelName: "iPhone 12 Pro 512GB", grade: "A/B", qty: 2, costEUR: 295 },

  { modelName: "iPhone 12 Pro Max 128GB", grade: "A/B", qty: 9, costEUR: 330 },
  { modelName: "iPhone 12 Pro Max 128GB", grade: "A+/A (ESIM)", qty: 5, costEUR: 340 },
  { modelName: "iPhone 12 Pro Max 256GB", grade: "A/B", qty: 5, costEUR: 350 },
  { modelName: "iPhone 12 Pro Max 512GB", grade: "A/B", qty: 2, costEUR: 370 },

  { modelName: "iPhone 13 128GB", grade: "A/B", qty: 3, costEUR: 250 },
  { modelName: "iPhone 13 128GB", grade: "B/C", qty: 37, costEUR: 240 }, // excluye
  { modelName: "iPhone 13 256GB", grade: "A/B", qty: 20, costEUR: 265 },
  { modelName: "iPhone 13 256GB", grade: "B/C", qty: 2, costEUR: 250 }, // excluye
  { modelName: "iPhone 13 512GB", grade: "A/B", qty: 1, costEUR: 290 },

  { modelName: "iPhone 13 mini 128GB", grade: "A/B", qty: 37, costEUR: 235 },
  { modelName: "iPhone 13 mini 128GB", grade: "A+/A (ESIM)", qty: 11, costEUR: 250 },
  { modelName: "iPhone 13 mini 128GB", grade: "B/C", qty: 5, costEUR: 225 }, // excluye

  { modelName: "iPhone 13 Pro 128GB", grade: "A/B", qty: 2, costEUR: 315 },
  { modelName: "iPhone 13 Pro 128GB", grade: "B/C", qty: 1, costEUR: 306 }, // excluye
  { modelName: "iPhone 13 Pro 1TB", grade: "A/B", qty: 1, costEUR: 385 },
  { modelName: "iPhone 13 Pro 1TB", grade: "B/C", qty: 1, costEUR: 375 }, // excluye
  { modelName: "iPhone 13 Pro 256GB", grade: "A/B", qty: 1, costEUR: 340 },
  { modelName: "iPhone 13 Pro 512GB", grade: "B/C", qty: 1, costEUR: 350 }, // excluye

  { modelName: "iPhone 13 Pro Max 128GB", grade: "A/B", qty: 4, costEUR: 420 },
  { modelName: "iPhone 13 Pro Max 128GB", grade: "B/C", qty: 5, costEUR: 410 }, // excluye
  { modelName: "iPhone 13 Pro Max 512GB", grade: "B/C", qty: 1, costEUR: 435 }, // excluye

  { modelName: "iPhone 14 128GB", grade: "A/B", qty: 100, costEUR: 310 }, // 100+
  { modelName: "iPhone 14 128GB", grade: "A+/A", qty: 1, costEUR: 330 },
  { modelName: "iPhone 14 256GB", grade: "A/B", qty: 1, costEUR: 330 },

  { modelName: "iPhone 14 Plus 128GB", grade: "A+/A", qty: 57, costEUR: 360 },
  { modelName: "iPhone 14 Plus 128GB", grade: "B/C", qty: 1, costEUR: 330 }, // excluye
  { modelName: "iPhone 14 Plus 256GB", grade: "A+/A", qty: 4, costEUR: 380 },
  { modelName: "iPhone 14 Plus 256GB", grade: "A+/A (OEM)", qty: 1, costEUR: 395 },

  { modelName: "iPhone 14 Pro 128GB", grade: "A+/A (OEM)", qty: 1, costEUR: 505 },
  { modelName: "iPhone 14 Pro 256GB", grade: "A/B", qty: 1, costEUR: 490 },

  { modelName: "iPhone 14 Pro Max 128GB", grade: "A/B", qty: 10, costEUR: 550 },
  { modelName: "iPhone 14 Pro Max 512GB", grade: "A/B", qty: 2, costEUR: 595 },

  { modelName: "iPhone 15 128GB", grade: "A/B", qty: 8, costEUR: 440 },
  { modelName: "iPhone 15 128GB", grade: "A+/A", qty: 1, costEUR: 460 },

  { modelName: "iPhone 15 Plus 128GB", grade: "A/B", qty: 1, costEUR: 565 },

  { modelName: "iPhone 15 Pro 128GB", grade: "A+/A", qty: 1, costEUR: 679 },
  { modelName: "iPhone 15 Pro 256GB", grade: "A/B", qty: 1, costEUR: 680 },

  { modelName: "iPhone 15 Pro Max 256GB", grade: "A/B", qty: 9, costEUR: 751 },
  { modelName: "iPhone 15 Pro Max 256GB", grade: "A+/A", qty: 2, costEUR: 765 },
];

// ====== Generación agregada por producto/variante ======
export const DEMO_PRODUCTS: Product[] = (() => {
  const productMap = new Map<string, Product>();

  for (const r of rows) {
    const condition = mapGradeToCondition(r.grade);
    if (!condition) continue;

    const capacityGB = parseCapacityGB(r.modelName);
    if (!capacityGB) continue;

    const model = parseBaseModel(r.modelName);
    const productSlug = slugify(model);
    const esimOnly = r.grade.toUpperCase().includes("ESIM");

    const p = productMap.get(productSlug) ?? { slug: productSlug, model, variants: [] };

    const key = `${capacityGB}|${condition}|${esimOnly ? "esim" : "normal"}`;
    const existing = p.variants.find(
      (v) => `${v.capacityGB}|${v.condition}|${v.esimOnly ? "esim" : "normal"}` === key
    );

    const priceEUR = pvpFromCost(r.costEUR, model, condition);

    if (existing) {
      existing.stock += r.qty;
      // En DEMO recalculamos con el último coste visto (en real haríamos FIFO/media).
      existing.priceEUR = priceEUR;
    } else {
      p.variants.push({ capacityGB, condition, esimOnly, stock: r.qty, priceEUR });
    }

    productMap.set(productSlug, p);
  }

  const products = Array.from(productMap.values());

  for (const p of products) {
    p.variants.sort((a, b) => {
      if (a.capacityGB !== b.capacityGB) return a.capacityGB - b.capacityGB;
      if (a.condition !== b.condition) return a.condition === "Excelente" ? -1 : 1;
      return Number(a.esimOnly) - Number(b.esimOnly);
    });
  }

  products.sort((a, b) => a.model.localeCompare(b.model));
  return products;
})();

export function getProductBySlug(slug: string): Product | undefined {
  return DEMO_PRODUCTS.find((p) => p.slug === slug);
}

export function getStockForProduct(p: Product): number {
  return p.variants.reduce((sum, v) => sum + v.stock, 0);
}

export function getPriceFromForProduct(p: Product): number | null {
  const prices = p.variants.map((v) => v.priceEUR).filter((n) => Number.isFinite(n));
  if (prices.length === 0) return null;
  return prices.sort((a, b) => a - b)[0];
}
