import type { Metadata } from "next";
import { InfoPage } from "@/components/legal/InfoPage";

export const metadata: Metadata = {
  title: "Envíos y devoluciones | Tirzha Skincare",
  description: "Descubre las condiciones de envío, seguimiento y devoluciones de Tirzha Skincare para pedidos nacionales.",
};

export default function ShippingPage() {
  return (
    <InfoPage
      eyebrow="Envíos y devoluciones"
      title="Envíos rápidos, seguimiento claro y devoluciones simples"
      intro="Ofrecemos envíos nacionales con seguimiento desde el momento en que tu pedido sale de nuestros almacenes, además de una política de devoluciones sencilla para proteger tu experiencia de compra."
      sections={[
        {
          title: "Tiempo de entrega",
          content: "Los tiempos estimados dependen de la zona de entrega y del método seleccionado. Normalmente, los pedidos se procesan en 24 a 48 horas hábiles y se despachan con seguimiento.",
        },
        {
          title: "Seguimiento del pedido",
          content: "Una vez despachado, recibirás un enlace de seguimiento para seguir el estado de tu envío en tiempo real y conocer la fecha estimada de entrega."
        },
        {
          title: "Devoluciones",
          content: "Si el producto no cumple tus expectativas, puedes solicitar una devolución dentro de los 15 días posteriores a la recepción del pedido, siempre que el producto esté en buen estado y con su empaque original."
        },
        {
          title: "Excepciones",
          content: "Las devoluciones no aplican para productos abiertos o usados, promociones especiales o artículos que hayan sufrido daños por uso indebido o manipulación externa."
        },
      ]}
      cta={{ href: "/contacto", label: "Solicitar ayuda con un pedido" }}
    />
  );
}
