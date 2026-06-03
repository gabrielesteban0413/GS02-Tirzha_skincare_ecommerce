import { Header } from '@/components/layout/Header';
import '@/styles/globals.css';

export const metadata = {
  title: 'Skincare Ecommerce',
  description: 'Tu tienda de skincare profesional',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}