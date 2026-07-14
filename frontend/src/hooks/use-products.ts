'use client';

import { useQuery } from '@tanstack/react-query';
import { productApi, Product } from '@/infrastructure/api/product.api';

const FEATURED_PRODUCTS: Array<Partial<Product> & { slug: string; name: string; description: string; price: number; imageUrl: string }> = [
  {
    slug: 'skin1004-protector-solar-madagascar-centella-hyalu-cica-water-fit-sun-serum',
    name: 'SKIN1004 - Protector Solar Madagascar Centella Hyalu-Cica Water-Fit Sun Serum',
    description: 'Protector solar con centella y ácido hialurónico para piel hidratada y protegida.',
    price: 50,
    imageUrl: '/images/products/protector Solar_Madagascar Centella Hyalu-Cica Water-Fit Sun Serum.webp',
  },
  {
    slug: 'medicube-crema-facial-deep-vita-c-capsule-cream',
    name: 'medicube - Crema Facial Deep Vita C Capsule Cream',
    description: 'Hidratante facial con vitamina C para un look luminoso y nutrido.',
    price: 42,
    imageUrl: '/images/products/medicube-crema-facial-deep-vita-c-capsule-cream.webp',
  },
  {
    slug: 'dr-althea-crema-345-relief',
    name: 'Dr. Althea - Crema 345 Relief',
    description: 'Crema calmante y reparadora para piel sensible y con necesidad de confort.',
    price: 39,
    imageUrl: '/images/products/hidrantate_Dr. Althea - Crema 345 Relief.webp',
  },
  {
    slug: 'ksecret-crema-contorno-de-ojos-seoul-1988-eye-cream-retinal-liposome-4-fermented-bean',
    name: 'KSECRET - Crema Contorno de Ojos SEOUL 1988 Eye Cream: Retinal Liposome 4% + Fermented Bean',
    description: 'Contorno de ojos con retinal y bean fermentado para una mirada más cuidada.',
    price: 36,
    imageUrl: '/images/products/Contorno de Ojos_KSECRET - SEOUL 1988.webp',
  },
  {
    slug: 'skin1004-ampolla-facial-iluminadora-madagascar-centella-tone-brightening-capsule-ampoule-jumbo',
    name: 'SKIN1004 - Ampolla Facial Iluminadora Madagascar Centella Tone Brightening Capsule Ampoule Jumbo',
    description: 'Ampolla iluminadora con centella para aportar luminosidad y confort.',
    price: 48,
    imageUrl: '/images/products/serums_Ampolla Facial Iluminadora Madagascar Centella Tone Brightening Capsule Ampoule Jumbo.webp',
  },
  {
    slug: 'medicube-serum-antiedad-pdrn-pink-peptide-serum',
    name: 'medicube - Sérum Antiedad PDRN Pink Peptide Serum',
    description: 'Sérum antiedad con péptidos y tecnología PDRN para reforzar la piel.',
    price: 45,
    imageUrl: '/images/products/serum-hidratante-24h.webp',
  },
  {
    slug: 'celimax-serum-the-vita-a-retinol-shot-tightening',
    name: 'celimax - Sérum The Vita-A Retinol Shot Tightening',
    description: 'Sérum con retinol para mejorar textura y firmeza.',
    price: 44,
    imageUrl: '/images/products/serum-vitamina-c.webp',
  },
  {
    slug: 'medicube-serum-txa-niacinamide-15',
    name: 'medicube - Sérum TXA Niacinamide 15',
    description: 'Sérum de textura ligera para unificar tono y aportar luminosidad.',
    price: 43,
    imageUrl: '/images/products/serum-hidratante-24h.webp',
  },
  {
    slug: 'medicube-set-de-mascarillas-faciales-pdrn-pink-collagen-gel-mask-set',
    name: 'medicube - Set de Mascarillas Faciales PDRN Pink Collagen Gel Mask Set',
    description: 'Set de mascarillas con colágeno y tecnología PDRN para un ritual de cuidado.',
    price: 51,
    imageUrl: '/images/products/mascarilla-hidratante.webp',
  },
  {
    slug: 'medicube-mascarilla-envolvente-nocturna-collagen-night-wrapping-mask',
    name: 'medicube - Mascarilla Envolvente Nocturna Collagen Night Wrapping Mask',
    description: 'Mascarilla envolvente nocturna para dejar la piel más confortable y luminosa.',
    price: 46,
    imageUrl: '/images/products/mascarilla-hidratante.webp',
  },
];

function buildFallbackFeaturedProducts(): Product[] {
  return FEATURED_PRODUCTS.map((product, index) => ({
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

export function useProductsByType(type: string) {
  return useQuery({
    queryKey: ['products', 'type', type],
    queryFn: async () => {
      console.log(`[API] Fetching products by type: ${type}`);
      try {
        const result = await productApi.getByType(type);
        console.log(`[API] Response for type "${type}":`, result);
        return result;
      } catch (error) {
        console.error(`[API] Error fetching type "${type}":`, error);
        throw error;
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
    queryFn: () => productApi.getBySolution(solution),
    staleTime: 5 * 60 * 1000,
    enabled: !!solution,
  });
}

export function useProductsByCategory(category: string) {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => productApi.getCategory(category),
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
      } else if (filters?.solution) {
        products = await productApi.getBySolution(filters.solution);
      }

      return products;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!(filters?.type || filters?.solution),
  });
}