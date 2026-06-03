export const SkinSolution = {
  BRIGHTENING: 'aclarantes',
  ANTI_AGING: 'anti-envejecimiento',
  ACNE_CONTROL: 'control-de-acne',
  HAIR_CARE: 'cuidado-del-cabello',
  IRRITATION_REDNESS: 'irritacion-o-enrojecimiento',
  ROSACEA: 'piel-rosacea',
  HYDRATION: 'hidratacion',
  LUMINOSITY_GLOW: 'luminosidad-y-brillo',
  DARK_SPOTS_SCARS: 'manchas-y-cicatrices',
  BLACKHEADS: 'puntos-negros',
  SUN_PROTECTION: 'proteccion-solar',
  SUPPLEMENTS: 'suplementos',
} as const;
export type SkinSolution = typeof SkinSolution[keyof typeof SkinSolution];
export const SkinSolutionDisplay: Record<SkinSolution, string> = {
  [SkinSolution.BRIGHTENING]: 'Aclarantes',
  [SkinSolution.ANTI_AGING]: 'Anti Envejecimiento',
  [SkinSolution.ACNE_CONTROL]: 'Control de Acné',
  [SkinSolution.HAIR_CARE]: 'Cuidado del Cabello',
  [SkinSolution.IRRITATION_REDNESS]: 'Irritación o Enrojecimiento',
  [SkinSolution.ROSACEA]: 'Piel Rosácea',
  [SkinSolution.HYDRATION]: 'Hidratación',
  [SkinSolution.LUMINOSITY_GLOW]: 'Luminosidad y Brillo',
  [SkinSolution.DARK_SPOTS_SCARS]: 'Manchas & Cicatrices',
  [SkinSolution.BLACKHEADS]: 'Puntos Negros',
  [SkinSolution.SUN_PROTECTION]: 'Protección Solar',
  [SkinSolution.SUPPLEMENTS]: 'Suplementos',
};
