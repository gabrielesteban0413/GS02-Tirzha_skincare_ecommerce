// frontend/src/lib/url-utils.ts
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ & /g, "-")
    .replace(/[áäâ]/g, "a")
    .replace(/[éëê]/g, "e")
    .replace(/[íïî]/g, "i")
    .replace(/[óöô]/g, "o")
    .replace(/[úüû]/g, "u")
    .replace(/[ñ]/g, "n")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getSubcategoriaUrl(categoria: string, subcategoria: string): string {
  const subSlug = slugify(subcategoria);
  if (categoria === "productos") {
    return `/productos/tipo/${subSlug}`;
  }
  if (categoria === "tratamientos") {
    return `/tratamientos/${subSlug}`;
  }
  // Para informacion, mapear según corresponda
  if (categoria === "informacion") {
    const infoMap: Record<string, string> = {
      "Rutinas": "/rutinas",
      "Contacto": "/informacion/contacto",
      "Preguntas Frecuentes": "/faq",
      "Formas de Pago": "/informacion/formas-de-pago",
      "Envíos y Devoluciones": "/informacion/envios-y-devoluciones",
      "Tarjetas de Regalo": "/informacion/tarjetas-de-regalo",
    };
    return infoMap[subcategoria] || `/informacion/${subSlug}`;
  }
  return `/${subSlug}`;
}