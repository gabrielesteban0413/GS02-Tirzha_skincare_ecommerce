import type { Metadata } from "next";
import { InfoPage } from "@/components/legal/InfoPage";

export const metadata: Metadata = {
  title: "Política de privacidad | Tirzha Skincare",
  description: "Conoce cómo protegemos tus datos personales, cómo los usamos y qué derechos tienes al comprar en Tirzha Skincare.",
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Política de privacidad"
      title="Tu información está protegida en cada compra"
      intro="En Tirzha Skincare tratamos tus datos con confidencialidad y solo los utilizamos para ofrecerte un servicio más preciso, seguro y personalizado."
      sections={[
        {
          title: "Qué información recopilamos",
          content: "Recopilamos datos como nombre, correo electrónico, teléfono, dirección de envío y datos de compra para procesar pedidos, responder consultas y mejorar tu experiencia."
        },
        {
          title: "Cómo usamos tus datos",
          content: "Utilizamos tu información para gestionar pedidos, proporcionar soporte, enviar actualizaciones relevantes y personalizar recomendaciones de productos según tus intereses."
        },
        {
          title: "Protección y confidencialidad",
          content: "Tus datos se almacenan de forma segura y no se venden ni comparten con terceros para fines comerciales, salvo cuando la ley lo exige o es necesario para completar un pedido."
        },
        {
          title: "Tus derechos",
          content: "Puedes solicitar el acceso, corrección o eliminación de tus datos en cualquier momento contactando con nuestro equipo de soporte."
        },
      ]}
      cta={{ href: "/contacto", label: "Solicitar información" }}
    />
  );
}
