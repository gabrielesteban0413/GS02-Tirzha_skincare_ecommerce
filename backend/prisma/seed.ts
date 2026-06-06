import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Limpiar productos existentes
  await prisma.product.deleteMany({});

  await prisma.product.createMany({
    data: [
      // Hidratantes - Vitamin Section
      {
        name: 'Crema Hidratante Vitamina C',
        slug: 'crema-hidratante-vitamina-c',
        description: 'Crema hidratante premium con vitamina C para revitalizar la piel',
        price: 45.99,
        imageUrl: '/images/products/crema-hidratante-vitamina-c-main.webp',
        type: 'hidratantes',
        solution: 'deshidratacion',
        stock: 15,
      },
      {
        name: 'Gel Hidratante Aloe Vit B5',
        slug: 'gel-hidratante-aloe-vit-b5',
        description: 'Gel ligero con aloe vera y vitamina B5 para hidratación profunda',
        price: 28.50,
        imageUrl: '/images/products/gel-hidratante-aloe-vit-b5.webp',
        type: 'hidratantes',
        solution: 'deshidratacion',
        stock: 22,
      },
      {
        name: 'Leche Corporal Reparadora',
        slug: 'leche-corporal-reparadora',
        description: 'Leche corporal reparadora para piel seca y sensible',
        price: 32.00,
        imageUrl: '/images/products/leche-corporal-reparadora.webp',
        type: 'hidratantes',
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
      // Otros tipos
      {
        name: 'Limpiador Facial Suave',
        slug: 'limpiador-facial-suave',
        description: 'Limpiador suave para piel sensible',
        price: 19.99,
        imageUrl: 'https://via.placeholder.com/300',
        type: 'limpiadores',
        solution: 'irritacion-o-enrojecimiento',
        stock: 25,
      },
      {
        name: 'Sérum Vitamina C',
        slug: 'serum-vitamina-c',
        description: 'Sérum iluminador con vitamina C',
        price: 29.99,
        imageUrl: 'https://via.placeholder.com/300',
        type: 'sueros',
        solution: 'luminosidad-y-brillo',
        stock: 20,
      },
      {
        name: 'Protector Solar SPF50',
        slug: 'protector-solar-spf50',
        description: 'Protección solar alta para todo tipo de piel',
        price: 24.99,
        imageUrl: 'https://via.placeholder.com/300',
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