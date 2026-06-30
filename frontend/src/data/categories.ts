import { getSubcategoriaUrl, slugify } from "@/lib/url-utils";

// frontend/src/data/categories.ts
export interface Category {
  nombre: string;
  subcategorias: string[];
}

export interface CategoryPageItem {
  title: string;
  slug: string;
  description: string;
  image: string;
  href: string;
  badge: string;
}

export interface Categories {
  [key: string]: Category;
}

export const categorias: Categories = {
  productos: {
    nombre: "Productos",
    subcategorias: [
      "LIMPIADORES",
      "ESENCIAS",
      "EXFOLIANTES",
      "HIDRATANTES",
      "SUEROS",
      "TÓNICOS",
      "CONTORNO DE OJOS",
      "PROTECTORES SOLARES",
      "MAQUILLAJE",
      "MASCARILLAS",
      "SUPLEMENTOS",
      "TRATAMIENTO PARA CABELLO"
    ]
  },
  tratamientos: {
    nombre: "Tratamientos",
    subcategorias: [
      "ACLARANTES",
      "ANTI ENVEJECIMIENTO",
      "CONTROL DE ACNÉ",
      "CUIDADO DEL CABELLO",
      "IRRITACIÓN O ENROJECIMIENTO",
      "PIEL ROSACEA",
      "HIDRATACIÓN",
      "LUMINOSIDAD Y BRILLO",
      "MANCHAS & CICATRICES",
      "PUNTOS NEGROS",
      "PROTECCIÓN SOLAR",
      "SUPLEMENTOS"
    ]
  },
  informacion: {
    nombre: "Información",
    subcategorias: [
      "Rutinas",
      "Contacto",
      "Preguntas Frecuentes",
      "Formas de Pago",
      "Envíos y Devoluciones",
      "Tarjetas de Regalo"
    ]
  }
};

const TREATMENT_CATEGORY_IMAGE_MAP: Record<string, string> = {
  "ACLARANTES": "/images/categories/aclarantes.webp",
  "ANTI ENVEJECIMIENTO": "/images/categories/anti-aging.webp",
  "CONTROL DE ACNÉ": "/images/categories/acne-cicatrices.webp",
  "CUIDADO DEL CABELLO": "/images/categories/rutinas.webp",
  "IRRITACIÓN O ENROJECIMIENTO": "/images/categories/anti-aging.svg",
  "PIEL ROSACEA": "/images/categories/rutinas.webp",
  "HIDRATACIÓN": "/images/categories/rutinas.webp",
  "LUMINOSIDAD Y BRILLO": "/images/categories/anti-aging.webp",
  "MANCHAS & CICATRICES": "/images/categories/acne-cicatrices.webp",
  "PUNTOS NEGROS": "/images/categories/aclarantes.webp",
  "PROTECCIÓN SOLAR": "/images/categories/rutinas.webp",
  "SUPLEMENTOS": "/images/categories/anti-aging.svg",
};

const TREATMENT_CATEGORY_BADGE_MAP: Record<string, string> = {
  "ACLARANTES": "Brillo",
  "ANTI ENVEJECIMIENTO": "Rejuvenecimiento",
  "CONTROL DE ACNÉ": "Pureza",
  "CUIDADO DEL CABELLO": "Fuerza",
  "IRRITACIÓN O ENROJECIMIENTO": "Calma",
  "PIEL ROSACEA": "Suavidad",
  "HIDRATACIÓN": "Confort",
  "LUMINOSIDAD Y BRILLO": "Resplandor",
  "MANCHAS & CICATRICES": "Uniforme",
  "PUNTOS NEGROS": "Purificante",
  "PROTECCIÓN SOLAR": "Defensa",
  "SUPLEMENTOS": "Bienestar",
};

const TREATMENT_CATEGORY_DESCRIPTION_MAP: Record<string, string> = {
  "ACLARANTES": "Tratamientos concentrados para mejorar luminosidad y un tono más uniforme.",
  "ANTI ENVEJECIMIENTO": "Fórmulas diseñadas para fortalecer, reafirmar y suavizar la piel madura.",
  "CONTROL DE ACNÉ": "Soluciones específicas para reducir brotes, limpiar poros y equilibrar la piel.",
  "CUIDADO DEL CABELLO": "Productos que nutren, fortifican y protegen la fibra capilar y el cuero cabelludo.",
  "IRRITACIÓN O ENROJECIMIENTO": "Fórmulas calmantes que ayudan a recuperar la comodidad y el equilibrio cutáneo.",
  "PIEL ROSACEA": "Cuidado suave para reducir rojeces y proteger la piel sensible.",
  "HIDRATACIÓN": "Tratamientos que restauran la barrera cutánea y mantienen la piel fresca y confortable.",
  "LUMINOSIDAD Y BRILLO": "Ingredientes que revitalizan la piel apagada y aportan un acabado radiante.",
  "MANCHAS & CICATRICES": "Cuidado focalizado para mejorar el tono y la textura en zonas con imperfecciones.",
  "PUNTOS NEGROS": "Rutinas que ayudan a limpiar poros y reducir la apariencia de puntos negros.",
  "PROTECCIÓN SOLAR": "Defensa diaria para proteger la piel de los daños UV y el fotoenvejecimiento.",
  "SUPLEMENTOS": "Apoyo nutricional pensado para cuidar la piel desde adentro.",
};

export const CATEGORY_PAGE_ITEMS: CategoryPageItem[] = categorias.tratamientos.subcategorias.map((subcategoria) => ({
  title: subcategoria,
  slug: slugify(subcategoria),
  description:
    TREATMENT_CATEGORY_DESCRIPTION_MAP[subcategoria] ??
    "Encuentra los mejores productos para tu piel en cada categoría de tratamiento.",
  image: TREATMENT_CATEGORY_IMAGE_MAP[subcategoria] ?? "/images/categories/rutinas.webp",
  href: getSubcategoriaUrl("tratamientos", subcategoria),
  badge: TREATMENT_CATEGORY_BADGE_MAP[subcategoria] ?? "Especial",
}));
