import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Limpiador Facial Suave',
        slug: 'limpiador-facial-suave',
        description: 'Limpiador suave para piel sensible',
        price: 19.99,
        imageUrl: 'https://via.placeholder.com/300',
        type: 'limpiadores',
        solution: 'irritacion-o-enrojecimiento',
      },
      {
        name: 'Sérum Vitamina C',
        slug: 'serum-vitamina-c',
        description: 'Sérum iluminador con vitamina C',
        price: 29.99,
        imageUrl: 'https://via.placeholder.com/300',
        type: 'sueros',
        solution: 'luminosidad-y-brillo',
      },
      {
        name: 'Protector Solar SPF50',
        slug: 'protector-solar-spf50',
        description: 'Protección solar alta para todo tipo de piel',
        price: 24.99,
        imageUrl: 'https://via.placeholder.com/300',
        type: 'protectores-solares',
        solution: 'proteccion-solar',
      },
    ],
  });
}

main()
  .then(() => console.log('Seed completado'))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());