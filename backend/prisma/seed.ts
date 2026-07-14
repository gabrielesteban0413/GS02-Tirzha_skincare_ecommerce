import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  await prisma.product.deleteMany({});

  await prisma.product.createMany({
    data: [
 
      {
        name: 'Protector Solar - Hyalu Cica Water Fit Sun Serum',
        slug: 'protector-solar-hyalu-cica-water-fit-sun-serum',
        description: 'Protector solar con centella y ácido hialurónico para piel hidratada y protegida.',
        price: 50.0,
        imageUrl: '/images/products/Protector Solar- Hyalu Cica Water Fit Sun Serum.png',
        type: 'protectores-solares',
        solution: 'proteccion-solar',
        stock: 15,
      },
      {
        name: 'Gel Hidratante Aloe Vit B5',
        slug: 'gel-hidratante-aloe-vit-b5',
        description: 'Gel ligero con aloe vera y vitamina B5 para hidratación profunda',
        price: 28.50,
        imageUrl: '/images/products/hidratante_medicube - Crema Facial Deep Vita C Capsule Cream.webp',
        type: 'hidratantes',
        solution: 'deshidratacion',
        stock: 22,
      },
      {
        name: 'Protector Solar- Hyalu Cica Water Fit Sun Serum',
        slug: 'protector-solar-hyalu-cica-water-fit-sun-serum',
        description: 'Protector solar con centella y ácido hialurónico para piel hidratada y protegida',
        price: 50.0,
        imageUrl: '/images/products/Protector Solar- Hyalu Cica Water Fit Sun Serum.png',
        type: 'protectores-solares',
        solution: 'proteccion-solar',
        stock: 15,
      },
        solution: 'deshidratacion',
        stock: 18,
      },
      {
        name: 'Sérum Facial Vitamina E',
        slug: 'serum-facial-vitamina-e',
        description: 'Sérum concentrado con vitamina E para nutrir y proteger',
        price: 38.75,
        imageUrl: '/images/products/suero-facial-vitamina-e-main.webp',
        type: 'hidratantes',
        solution: 'envejecimiento-prematuro',
        stock: 12,
      },
      {
        name: 'Mascarilla Hidratante Intensiva',
        slug: 'mascarilla-hidratante-intensiva',
        description: 'Mascarilla de tratamiento profundo con ácido hialurónico',
        price: 35.50,
        imageUrl: '/images/products/mascarilla-hidratante.webp',
        type: 'hidratantes',
        solution: 'deshidratacion',
        stock: 14,
      },
      {
        name: 'Tonificador Facial Hidratante',
        slug: 'tonificador-facial-hidratante',
        description: 'Tónico hidratante con extractos naturales',
        price: 22.99,
        imageUrl: '/images/products/tonificador-facial.webp',
        type: 'hidratantes',
        solution: 'deshidratacion',
        stock: 20,
      },
      {
        name: 'Emulsión Ligera Vitamina B3',
        slug: 'emulsion-ligera-vitamina-b3',
        description: 'Emulsión ligera con vitamina B3 para piel equilibrada',
        price: 32.99,
        imageUrl: '/images/products/emulsion-vitamina-b3.webp',
        type: 'hidratantes',
        solution: 'deshidratacion',
        stock: 18,
      },
      {
        name: 'Sérum Hidratante 24h',
        slug: 'serum-hidratante-24h',
        description: 'Sérum de larga duración con efecto hidratante',
        price: 41.00,
        imageUrl: '/images/products/serum-hidratante-24h.webp',
        type: 'hidratantes',
        solution: 'deshidratacion',
        stock: 16,
      },
      {
        name: 'Crema Noche Reparadora',
        slug: 'crema-noche-reparadora',
        description: 'Crema nocturna con nutrientes reparadores',
        price: 48.99,
        imageUrl: '/images/products/crema-noche-reparadora.webp',
        type: 'hidratantes',
        solution: 'deshidratacion',
        stock: 11,
      },
      {
        name: 'Contorno de Ojos Hidratante',
        slug: 'contorno-ojos-hidratante',
        description: 'Contorno de ojos especial para zona delicada',
        price: 33.50,
        imageUrl: '/images/products/contorno-ojos.webp',
        type: 'hidratantes',
        solution: 'deshidratacion',
        stock: 19,
      },
      {
        name: 'Esencia Hidratante Premium',
        slug: 'esencia-hidratante-premium',
        description: 'Esencia concentrada con ingredientes botánicos',
        price: 39.99,
        imageUrl: '/images/products/esencia-hidratante.webp',
        type: 'hidratantes',
        solution: 'deshidratacion',
        stock: 13,
      },
      // Otros tipos
      {
        name: 'Limpiador Facial Suave',
        slug: 'limpiador-facial-suave',
        description: 'Limpiador suave para piel sensible',
        price: 19.99,
        imageUrl: '/images/products/Protector Solar- Hyalu Cica Water Fit Sun Serum.png',
        type: 'limpiadores',
        solution: 'irritacion-o-enrojecimiento',
        stock: 25,
      },
      {
        name: 'Sérum Vitamina C',
        slug: 'serum-vitamina-c',
        description: 'Sérum iluminador con vitamina C',
        price: 29.99,
        imageUrl: '/images/products/Protector Solar- Hyalu Cica Water Fit Sun Serum.png',
        type: 'sueros',
        solution: 'luminosidad-y-brillo',
        stock: 20,
      },
      {
        name: 'Protector Solar SPF50',
        slug: 'protector-solar-spf50',
        description: 'Protección solar alta para todo tipo de piel',
        price: 24.99,
        imageUrl: '/images/products/Protector Solar- Hyalu Cica Water Fit Sun Serum.png',
        type: 'protectores-solares',
        solution: 'proteccion-solar',
        stock: 30,
      },
    ],
  });

  console.log('✅ Seed completado - Productos creados');
}

main()
  .then(() => console.log('Done'))
  .catch((e) => {
    console.error('Error en seed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());