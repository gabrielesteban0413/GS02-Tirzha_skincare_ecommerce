'use client';

import { useQuery } from '@tanstack/react-query';
import { productApi, Product } from '@/infrastructure/api/product.api';

const FEATURED_PRODUCTS: Array<Partial<Product> & { slug: string; name: string; description: string; price: number; imageUrl: string }> = [
  {
    slug: 'skin1004-protector-solar-madagascar-centella-hyalu-cica-water-fit-sun-serum',
    name: 'SKIN1004 - Protector Solar Madagascar Centella Hyalu-Cica Water-Fit Sun Serum',
    description: 'Protector solar con centella y ácido hialurónico para piel hidratada y protegida.',
    price: 50000,
    imageUrl: '/images/products/protector-solar_madagascar-centella-hyalu-cica-water-fit-sun-serum.webp',
  },
  {
    slug: 'medicube-crema-facial-deep-vita-c-capsule-cream',
    name: 'medicube - Crema Facial Deep Vita C Capsule Cream',
    description: 'Hidratante facial con vitamina C para un look luminoso y nutrido.',
    price: 42000,
    imageUrl: '/images/products/hidratante_medicube-crema-facial-deep-vita-c-capsule-cream.webp',
  },
  {
    slug: 'dr-althea-crema-345-relief',
    name: 'Dr. Althea - Crema 345 Relief',
    description: 'Crema calmante y reparadora para piel sensible y con necesidad de confort.',
    price: 39000,
    imageUrl: '/images/products/hidrantate_dr-althea-crema-345-relief.webp',
  },
  {
    slug: 'ksecret-crema-contorno-de-ojos-seoul-1988-eye-cream-retinal-liposome-4-fermented-bean',
    name: 'KSECRET - Crema Contorno de Ojos SEOUL 1988 Eye Cream: Retinal Liposome 4% + Fermented Bean',
    description: 'Contorno de ojos con retinal y bean fermentado para una mirada más cuidada.',
    price: 36000,
    imageUrl: '/images/products/Contorno de Ojos_ksecret-crema-contorno-de-ojos-seoul-1988-eye-cream-retinal-liposome-4-fermented-bean.webp',
  },
  {
    slug: 'skin1004-ampolla-facial-iluminadora-madagascar-centella-tone-brightening-capsule-ampoule-jumbo',
    name: 'SKIN1004 - Ampolla Facial Iluminadora Madagascar Centella Tone Brightening Capsule Ampoule Jumbo',
    description: 'Ampolla iluminadora con centella para aportar luminosidad y confort.',
    price: 48000,
    imageUrl: '/images/products/serums_skin1004-ampolla-facial-iluminadora-madagascar-centella-tone-brightening-capsule-ampoule-jumbo.webp',
  },
  {
    slug: 'medicube-serum-antiedad-pdrn-pink-peptide-serum',
    name: 'medicube - Sérum Antiedad PDRN Pink Peptide Serum',
    description: 'Sérum antiedad con péptidos y tecnología PDRN para reforzar la piel.',
    price: 45000,
    imageUrl: '/images/products/serums_medicube-serum-antiedad-pdrn-pink-peptide-serum.webp',
  },
  {
    slug: 'celimax-serum-the-vita-a-retinol-shot-tightening',
    name: 'celimax - Sérum The Vita-A Retinol Shot Tightening',
    description: 'Sérum con retinol para mejorar textura y firmeza.',
    price: 44000,
    imageUrl: '/images/products/serums_celimax-serum-the-vita-a-retinol-shot-tightening.webp',
  },
  {
    slug: 'medicube-serum-txa-niacinamide-15',
    name: 'medicube - Sérum TXA Niacinamide 15',
    description: 'Sérum de textura ligera para unificar tono y aportar luminosidad.',
    price: 43000,
    imageUrl: '/images/products/serums_medicube-txa-niacinamide-15.webp',
  },
  {
    slug: 'medicube-set-de-mascarillas-faciales-pdrn-pink-collagen-gel-mask-set',
    name: 'medicube - Set de Mascarillas Faciales PDRN Pink Collagen Gel Mask Set',
    description: 'Set de mascarillas con colágeno y tecnología PDRN para un ritual de cuidado.',
    price: 51000,
    imageUrl: '/images/products/mascarillas_medicube-set-de-mascarillas-faciales-pdrn-pink-collagen-gel-mask-set.webp',
  },
  {
    slug: 'medicube-mascarilla-envolvente-nocturna-collagen-night-wrapping-mask',
    name: 'medicube - Mascarilla Envolvente Nocturna Collagen Night Wrapping Mask',
    description: 'Mascarilla envolvente nocturna para dejar la piel más confortable y luminosa.',
    price: 46000,
    imageUrl: '/images/products/mascarillas_medicube-envolvente-nocturna-collagen-night-wrapping-mask.webp',
  },
];

const FALLBACK_PRODUCTS_BY_TYPE: Record<string, Array<Partial<Product> & { slug: string; name: string; description: string; price: number; imageUrl: string }>> = {
  limpiadores: [
    {
      slug: 'skin1004-limpiador-en-aceite',
      name: 'SKIN1004 - Limpiador en Aceite Madagascar',
      description: 'Limpiador en aceite suave con centella.',
      price: 90000,
      imageUrl: '/images/home/hero-product.webp',
    },
    {
      slug: 'tocobo-limpiador-vegan',
      name: 'TOCOBO - Aceite Limpiador Vegano Calamine',
      description: 'Aceite limpiador vegano con calamina para equilibrio.',
      price: 80000,
      imageUrl: '/images/home/hero-product.webp',
    },
  ],
  esencias: [
    {
      slug: 'esencia-hidratante-premium',
      name: 'Esencia Hidratante Premium',
      description: 'Esencia ligera para preparar la piel y reforzar la hidratación.',
      price: 39990,
      imageUrl: '/images/home/hero-product.webp',
    },
  ],
  exfoliantes: [
    {
      slug: 'exfoliante-gel-suave',
      name: 'Exfoliante Gel Suave',
      description: 'Renovación ligera para una piel más uniforme y luminosa.',
      price: 31990,
      imageUrl: '/images/home/hero-product.webp',
    },
  ],
  hidratantes: [
    {
      slug: 'medicube-crema-deep-vita-c',
      name: 'medicube - Crema Facial Deep Vita C Capsule Cream',
      description: 'Hidratante facial con vitamina C para luminosidad.',
      price: 110000,
      imageUrl: '/images/products/hidratante_medicube-crema-facial-deep-vita-c-capsule-cream.webp',
    },
    {
      slug: 'dr-althea-crema-345-relief',
      name: 'Dr. Althea - Crema 345 Relief',
      description: 'Crema calmante y reparadora para piel sensible.',
      price: 120000,
      imageUrl: '/images/products/hidrantate_dr-althea-crema-345-relief.webp',
    },
    {
      slug: 'aplb-snail-mucin-ginseng-cream',
      name: 'APLB - Snail Mucin Ginseng Facial Cream',
      description: 'Reparador con mucina de caracol y ginseng.',
      price: 85000,
      imageUrl: '/images/home/hero-product.webp',
    },
    {
      slug: 'cosrx-advanced-snail-92',
      name: 'COSRX - Advanced Snail 92 All In One Cream',
      description: 'Crema multiuso con mucina de caracol para reparación.',
      price: 80000,
      imageUrl: '/images/home/hero-product.webp',
    },
    {
      slug: 'celimax-ampolla-noni',
      name: 'celimax - Ampolla Facial Noni Ampoule Calming',
      description: 'Ampolla calmante con noni para piel sensible.',
      price: 90000,
      imageUrl: '/images/home/hero-product.webp',
    },
    {
      slug: 'skin1004-crema-calmante-madagascar',
      name: 'SKIN1004 - Crema calmante Madagascar Centella',
      description: 'Crema calmante con centella para confort diario.',
      price: 120000,
      imageUrl: '/images/home/hero-product.webp',
    },
  ],
  sueros: [
    {
      slug: 'anua-serum-azelaic',
      name: 'Anua - Sérum Facial Calmante Azelaic Acid',
      description: 'Sérum calmante con ácido azelaico para textura y rojeces.',
      price: 110000,
      imageUrl: '/images/home/hero-product.webp',
    },
    {
      slug: 'skin1004-ampolla-iluminadora',
      name: 'SKIN1004 - Ampolla Facial Iluminadora Madagascar Centella',
      description: 'Ampolla iluminadora con centella para resplandor.',
      price: 110000,
      imageUrl: '/images/products/serums_skin1004-ampolla-facial-iluminadora-madagascar-centella-tone-brightening-capsule-ampoule-jumbo.webp',
    },
    {
      slug: 'jumiso-niacinamide-20',
      name: 'JUMISO - Sérum Niacinamide 20',
      description: 'Sérum con niacinamida para unificar el tono y brillo.',
      price: 110000,
      imageUrl: '/images/home/hero-product.webp',
    },
    {
      slug: 'medicube-serum-pdrn-pink',
      name: 'medicube - Sérum Antiedad PDRN Pink Peptide',
      description: 'Sérum antiedad con PDRN y péptidos.',
      price: 110000,
      imageUrl: '/images/products/serums_medicube-serum-antiedad-pdrn-pink-peptide-serum.webp',
    },
  ],
  tonicos: [
    {
      slug: 'dr-althea-tonico',
      name: 'Dr. Althea - Tónico Facial',
      description: 'Tónico calmante y refrescante.',
      price: 90000,
      imageUrl: '/images/products/tonificador-facial.webp',
    },
    {
      slug: 'skin1004-tonico-madagascar',
      name: 'SKIN1004 - Tónico Madagascar Centella Toning',
      description: 'Tónico con centella para equilibrio y confort.',
      price: 90000,
      imageUrl: '/images/home/hero-product.webp',
    },
  ],
  'contorno-de-ojos': [
    {
      slug: 'ksecret-contorno-ojos',
      name: 'KSECRET - Crema Contorno de Ojos',
      description: 'Contorno de ojos con retinal y péptidos.',
      price: 75000,
      imageUrl: '/images/products/Contorno de Ojos_ksecret-crema-contorno-de-ojos-seoul-1988-eye-cream-retinal-liposome-4-fermented-bean.webp',
    },
    {
      slug: 'beauty-of-joseon-serum-contorno',
      name: 'Beauty of Joseon - Sérum Contorno de Ojos',
      description: 'Sérum específico para contorno con ingredientes calmantes.',
      price: 75000,
      imageUrl: '/images/home/hero-product.webp',
    },
    {
      slug: 'axis-y-serum-contorno',
      name: 'AXIS-Y - Sérum Contorno de Ojos',
      description: 'Contorno con colágeno y efecto tensante.',
      price: 65000,
      imageUrl: '/images/home/hero-product.webp',
    },
  ],
  'protectores-solares': [
    {
      slug: 'skin1004-protector-solar-madagascar-centella',
      name: 'SKIN1004 - Protector Solar Madagascar Centella',
      description: 'Protección solar con centella y ácido hialurónico.',
      price: 85000,
      imageUrl: '/images/products/protector-solar_madagascar-centella-hyalu-cica-water-fit-sun-serum.webp',
    },
    {
      slug: 'celimax-protector-oil-control',
      name: 'celimax - Protector Solar Oil Control Light',
      description: 'Protector solar oil control para piel mixta y grasa.',
      price: 75000,
      imageUrl: '/images/home/hero-product.webp',
    },
    {
      slug: 'vt-protector-pdrn-air-cloud',
      name: 'VT - Protector solar PDRN Air Cloud',
      description: 'Protección ligera con acabado aterciopelado.',
      price: 85000,
      imageUrl: '/images/home/hero-product.webp',
    },
  ],
  maquillaje: [
    {
      slug: 'base-luminosa-matte',
      name: 'Base Luminosa Matte',
      description: 'Acabado elegante para un look impecable y cómodo.',
      price: 39990,
      imageUrl: '/images/home/hero-product.webp',
    },
  ],
  mascarillas: [
    {
      slug: 'medicube-set-mascarillas-pdrn',
      name: 'medicube - Set de Mascarillas Faciales PDRN',
      description: 'Set de mascarillas con PDRN y colágeno para tratamiento.',
      price: 25000,
      imageUrl: '/images/products/mascarillas_medicube-set-de-mascarillas-faciales-pdrn-pink-collagen-gel-mask-set.webp',
    },
    {
      slug: 'medicube-mascarilla-envolvente-nocturna',
      name: 'medicube - Mascarilla Envolvente Nocturna',
      description: 'Mascarilla nocturna para reparación intensiva.',
      price: 120000,
      imageUrl: '/images/products/mascarillas_medicube-envolvente-nocturna-collagen-night-wrapping-mask.webp',
    },
  ],
};

function buildFallbackFeaturedProducts(): Product[] {
  return FEATURED_PRODUCTS.map((product) => ({
    id: product.slug,
    slug: product.slug,
    name: product.name,
    price: product.price,
    stock: 0,
    description: product.description,
    type: 'featured',
    solution: 'featured',
    imageUrl: product.imageUrl,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

function buildFallbackProductsByType(type: string): Product[] {
  const normalizedType = (type || '').toLowerCase();
  const products = FALLBACK_PRODUCTS_BY_TYPE[normalizedType] || FALLBACK_PRODUCTS_BY_TYPE.hidratantes || [];

  return products.map((product) => ({
    id: product.slug,
    slug: product.slug,
    name: product.name,
    price: product.price,
    stock: 0,
    description: product.description,
    type: normalizedType || 'producto',
    solution: normalizedType || 'producto',
    imageUrl: product.imageUrl,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

export function useProductsByType(type: string) {
  return useQuery({
    queryKey: ['products', 'type', type],
    queryFn: async () => {
      console.log(`[API] Fetching products by type: ${type}`);
      try {
        const result = await productApi.getByType(type);
        console.log(`[API] Response for type "${type}":`, result);
        return Array.isArray(result) && result.length > 0 ? result : buildFallbackProductsByType(type);
      } catch (error) {
        console.error(`[API] Error fetching type "${type}":`, error);
        return buildFallbackProductsByType(type);
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    enabled: !!type, // Solo ejecutar si type existe
  });
}

export function useFeaturedProducts(types: string[] = ['hidratantes', 'protectores-solares']) {
  return useQuery({
    queryKey: ['products', 'featured', types.join(',')],
    queryFn: async () => buildFallbackFeaturedProducts(),
    staleTime: 5 * 60 * 1000,
    enabled: types.length > 0,
  });
}

export function useProductsBySolution(solution: string) {
  return useQuery({
    queryKey: ['products', 'solution', solution],
    queryFn: async () => {
      try {
        const result = await productApi.getBySolution(solution);
        return Array.isArray(result) && result.length > 0 ? result : buildFallbackProductsByType(solution);
      } catch (error) {
        console.error(`[API] Error fetching solution "${solution}":`, error);
        return buildFallbackProductsByType(solution);
      }
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!solution,
  });
}

export function useProductsByCategory(category: string) {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: async () => {
      try {
        const result = await productApi.getCategory(category);
        return Array.isArray(result) && result.length > 0 ? result : buildFallbackProductsByType(category);
      } catch (error) {
        console.error(`[API] Error fetching category "${category}":`, error);
        return buildFallbackProductsByType(category);
      }
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!category,
  });
}

export function useAllProducts(filters?: { type?: string; solution?: string }) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      let products: Product[] = [];

      if (filters?.type) {
        products = await productApi.getByType(filters.type);
        if (!Array.isArray(products) || products.length === 0) {
          products = buildFallbackProductsByType(filters.type);
        }
      } else if (filters?.solution) {
        products = await productApi.getBySolution(filters.solution);
        if (!Array.isArray(products) || products.length === 0) {
          products = buildFallbackProductsByType(filters.solution);
        }
      }

      return products;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!(filters?.type || filters?.solution),
  });
}