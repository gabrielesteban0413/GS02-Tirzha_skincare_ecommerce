import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany({});

  await prisma.product.createMany({
    data: [
      {
        name: 'celimax - Jabón Facial',
        slug: 'celimax-jabon-facial',
        description: 'Jabón facial suave para limpieza profunda y confort diario.',
        price: 90000,
        imageUrl: '/images/home/hero-product.webp',
        type: 'limpiadores',
        solution: 'limpieza',
        stock: 44,
      },
      {
        name: 'SKIN1004 - Limpiador en Aceite Madagascar Centella Light',
        slug: 'skin1004-limpiador-en-aceite-madagascar-centella-light',
        description: 'Limpiador en aceite suave con centella y confort para la piel.',
        price: 90000,
        imageUrl: '/images/home/hero-product.webp',
        type: 'limpiadores',
        solution: 'limpieza',
        stock: 44,
      },
      {
        name: 'TOCOBO - Aceite Limpiador Vegano Calamine Pore Control Cleansing Oil',
        slug: 'tocobo-aceite-limpiador-vegano-calamine-pore-control-cleansing-oil',
        description: 'Aceite limpiador vegano con calamina para una piel más equilibrada.',
        price: 80000,
        imageUrl: '/images/home/hero-product.webp',
        type: 'limpiadores',
        solution: 'limpieza',
        stock: 44,
      },
      {
        name: 'haruharu wonder - Aceite Limpiador Black Rice Moisture Deep Cleansing Oil',
        slug: 'haruharu-wonder-aceite-limpiador-black-rice-moisture-deep-cleansing-oil',
        description: 'Aceite limpiador con arroz negro para una limpieza profunda y nutritiva.',
        price: 85000,
        imageUrl: '/images/home/hero-product.webp',
        type: 'limpiadores',
        solution: 'limpieza',
        stock: 44,
      },
      {
        name: 'haruharu wonder - Gel Limpiador Black Rice Moisture 5.5',
        slug: 'haruharu-wonder-gel-limpiador-black-rice-moisture-5-5',
        description: 'Gel limpiador con arroz negro para una limpieza fresca y equilibrada.',
        price: 60000,
        imageUrl: '/images/home/hero-product.webp',
        type: 'limpiadores',
        solution: 'limpieza',
        stock: 44,
      },
      {
        name: 'SKIN1004 - Espuma Limpiadora Madagascar Centella',
        slug: 'skin1004-espuma-limpiadora-madagascar-centella',
        description: 'Espuma limpiadora suave con centella para piel sensible y confortable.',
        price: 75000,
        imageUrl: '/images/home/hero-product.webp',
        type: 'limpiadores',
        solution: 'limpieza',
        stock: 44,
      },
      {
        name: 'SKIN1004 - Protector Solar Madagascar Centella Hyalu-Cica Water-Fit Sun Serum',
        slug: 'skin1004-protector-solar-madagascar-centella-hyalu-cica-water-fit-sun-serum',
        description: 'Protección solar ligera con centella y ácido hialurónico.',
        price: 50000,
        imageUrl: '/images/products/protector-solar_madagascar-centella-hyalu-cica-water-fit-sun-serum.webp',
        type: 'protectores-solares',
        solution: 'proteccion-solar',
        stock: 18,
      },
      {
        name: 'Medicube - Crema Facial Deep Vita C Capsule Cream',
        slug: 'medicube-crema-facial-deep-vita-c-capsule-cream',
        description: 'Crema facial hidratante con vitamina C para un tono más luminoso.',
        price: 42000,
        imageUrl: '/images/products/hidratante_medicube-crema-facial-deep-vita-c-capsule-cream.webp',
        type: 'hidratantes',
        solution: 'deshidratacion',
        stock: 22,
      },
      {
        name: 'Dr. Althea - Crema 345 Relief',
        slug: 'dr-althea-crema-345-relief',
        description: 'Crema calmante y reparadora para piel sensible.',
        price: 39000,
        imageUrl: '/images/products/hidrantate_dr-althea-crema-345-relief.webp',
        type: 'hidratantes',
        solution: 'deshidratacion',
        stock: 15,
      },
      {
        name: 'KSECRET - Crema Contorno de Ojos SEOUL 1988 Eye Cream',
        slug: 'ksecret-crema-contorno-de-ojos-seoul-1988-eye-cream',
        description: 'Contorno de ojos con retinal liposome y péptidos.',
        price: 36000,
        imageUrl: '/images/products/Contorno de Ojos_ksecret-crema-contorno-de-ojos-seoul-1988-eye-cream-retinal-liposome-4-fermented-bean.webp',
        type: 'contorno-de-ojos',
        solution: 'antiarrugas',
        stock: 20,
      },
      {
        name: 'Medicube - Sérum Antiedad PDRN Pink Peptide Serum',
        slug: 'medicube-serum-antiedad-pdrn-pink-peptide-serum',
        description: 'Sérum antiedad con tecnología PDRN y péptidos.',
        price: 45000,
        imageUrl: '/images/products/serums_medicube-serum-antiedad-pdrn-pink-peptide-serum.webp',
        type: 'sueros',
        solution: 'antiarrugas',
        stock: 14,
      },
      {
        name: 'celimax - Sérum The Vita-A Retinol Shot Tightening',
        slug: 'celimax-serum-the-vita-a-retinol-shot-tightening',
        description: 'Sérum con retinol para renovar la textura y firmeza.',
        price: 44000,
        imageUrl: '/images/products/serums_celimax-serum-the-vita-a-retinol-shot-tightening.webp',
        type: 'sueros',
        solution: 'antiarrugas',
        stock: 13,
      },
      {
        name: 'Medicube - Sérum TXA Niacinamide 15',
        slug: 'medicube-serum-txa-niacinamide-15',
        description: 'Sérum de niacinamida para unificar el tono y reducir brillos.',
        price: 43000,
        imageUrl: '/images/products/serums_medicube-txa-niacinamide-15.webp',
        type: 'sueros',
        solution: 'poros-y-brillo',
        stock: 16,
      },
      {
        name: 'Medicube - Mascarilla Envolvente Nocturna Collagen Night Wrapping Mask',
        slug: 'medicube-mascarilla-envolvente-nocturna-collagen-night-wrapping-mask',
        description: 'Mascarilla nocturna con colágeno para nutrición profunda.',
        price: 46000,
        imageUrl: '/images/products/mascarillas_medicube-envolvente-nocturna-collagen-night-wrapping-mask.webp',
        type: 'mascarillas',
        solution: 'hidratacion',
        stock: 12,
      },
      {
        name: 'Medicube - Set de Mascarillas Faciales PDRN Pink Collagen Gel Mask Set',
        slug: 'medicube-set-de-mascarillas-faciales-pdrn-pink-collagen-gel-mask-set',
        description: 'Set de mascarillas con colágeno y cuidado intensivo.',
        price: 51000,
        imageUrl: '/images/products/mascarillas_medicube-set-de-mascarillas-faciales-pdrn-pink-collagen-gel-mask-set.webp',
        type: 'mascarillas',
        solution: 'hidratacion',
        stock: 10,
      },
      {
        name: 'Tonificador Facial Hidratante',
        slug: 'tonificador-facial-hidratante',
        description: 'Tónico hidratante con extractos naturales para equilibrio y confort.',
        price: 22990,
        imageUrl: '/images/products/tonificador-facial.webp',
        type: 'tonicos',
        solution: 'deshidratacion',
        stock: 18,
      },
    ],
  });

  console.log('OK - Seed completado - Productos creados');
}

main()
  .then(() => console.log('Done'))
  .catch((e) => {
    console.error('Error en seed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());