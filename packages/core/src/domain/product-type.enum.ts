export const ProductType = {
  CLEANSER: 'limpiadores',
  ESSENCE: 'esencias',
  EXFOLIANT: 'exfoliantes',
  MOISTURIZER: 'hidratantes',
  SERUM: 'sueros',
  TONER: 'tonicos',
  EYE_CONTOUR: 'contorno-de-ojos',
  SUNSCREEN: 'protectores-solares',
  MAKEUP: 'maquillaje',
  MASK: 'mascarillas',
  SUPPLEMENT: 'suplementos',
  HAIR_TREATMENT: 'tratamiento-para-cabello',
} as const;
export type ProductType = typeof ProductType[keyof typeof ProductType];
export const ProductTypeDisplay: Record<ProductType, string> = {
  [ProductType.CLEANSER]: 'Limpiadores',
  [ProductType.ESSENCE]: 'Esencias',
  [ProductType.EXFOLIANT]: 'Exfoliantes',
  [ProductType.MOISTURIZER]: 'Hidratantes',
  [ProductType.SERUM]: 'Sueros',
  [ProductType.TONER]: 'Tónicos',
  [ProductType.EYE_CONTOUR]: 'Contorno de Ojos',
  [ProductType.SUNSCREEN]: 'Protectores Solares',
  [ProductType.MAKEUP]: 'Maquillaje',
  [ProductType.MASK]: 'Mascarillas',
  [ProductType.SUPPLEMENT]: 'Suplementos',
  [ProductType.HAIR_TREATMENT]: 'Tratamiento para Cabello',
};
