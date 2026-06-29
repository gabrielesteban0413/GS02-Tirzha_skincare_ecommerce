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

export const CATEGORY_PAGE_ITEMS: CategoryPageItem[] = [
  {
    title: "Cremas Hidratantes",
    slug: "cremas-hidratantes",
    description: "Formulas que restauran la barrera cutánea, calman la sensación de tirantez y dejan la piel suave y confortable.",
    image: "/images/categories/rutinas.webp",
    href: "/productos",
    badge: "Hidratación",
  },
  {
    title: "Limpiadores Faciales",
    slug: "limpiadores-faciales",
    description: "Limpieza delicada y efectiva para preparar la piel, eliminar impurezas y mantener el equilibrio diario.",
    image: "/images/categories/acne-cicatrices.webp",
    href: "/productos",
    badge: "Limpieza",
  },
  {
    title: "Contorno de Ojos",
    slug: "contorno-de-ojos",
    description: "Tratamientos específicos para hidratar, reducir signos de cansancio y cuidar la delicada zona periocular.",
    image: "/images/categories/anti-aging.webp",
    href: "/productos",
    badge: "Reparación",
  },
  {
    title: "Tónicos Faciales",
    slug: "tonicos-faciales",
    description: "Texturas ligeras que equilibran, reafirman y preparan la piel para continuar con tu rutina de cuidado.",
    image: "/images/categories/anti-aging.svg",
    href: "/productos",
    badge: "Equilibrio",
  },
  {
    title: "Ampollas - Sérums",
    slug: "ampollas-serums",
    description: "Concentrados de alta eficacia para tratar luminosidad, textura, firmeza y respuestas específicas de la piel.",
    image: "/images/categories/aclarantes.webp",
    href: "/productos",
    badge: "Tratamiento",
  },
  {
    title: "Mascarillas",
    slug: "mascarillas",
    description: "Sesiones intensivas de hidratación, calma o luminosidad para dar un impulso extra a tu rutina.",
    image: "/images/categories/rutinas.webp",
    href: "/productos",
    badge: "Ritual",
  },
  {
    title: "Protector Solar",
    slug: "protector-solar",
    description: "Protección diaria esencial para cuidar la piel del sol y prevenir daños visibles a largo plazo.",
    image: "/images/categories/anti-aging.webp",
    href: "/productos",
    badge: "Protección",
  },
  {
    title: "Kits Personalizados",
    slug: "kits-personalizados",
    description: "Combinaciones pensadas para crear rutinas completas según tus objetivos y tipo de piel.",
    image: "/images/categories/anti-aging.svg",
    href: "/rutinas",
    badge: "Rutina",
  },
];