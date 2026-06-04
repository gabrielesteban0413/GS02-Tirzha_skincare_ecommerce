// frontend/src/data/categories.ts
export interface Category {
  nombre: string;
  subcategorias: string[];
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