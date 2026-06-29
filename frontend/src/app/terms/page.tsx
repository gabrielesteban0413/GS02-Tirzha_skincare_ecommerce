import type { Metadata } from "next";
import { InfoPage } from "@/components/legal/InfoPage";

export const metadata: Metadata = {
  title: "Términos y condiciones | Tirzha Skincare",
  description: "Consulta los términos de uso, compra y servicio de Tirzha Skincare para una experiencia segura y transparente.",
};

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Términos y condiciones"
      title="Condiciones de uso y compra en Tirzha Skincare"
      intro="Al comprar en Tirzha Skincare aceptas nuestras condiciones de compra, uso del sitio y políticas de servicio. Nuestro objetivo es que cada pedido sea claro, seguro y satisfactorio."
      sections={[
        {
          title: "Uso del sitio",
          content: "El sitio está destinado para consultas, selección de productos y gestión de pedidos. El usuario debe proporcionar información veraz y utilizar los servicios de forma responsable, respetando la propiedad intelectual y los derechos de terceros.",
        },
        {
          title: "Compras y pagos",
          content: "Los productos se reservan mediante la confirmación del pedido y la aceptación del pago. Tirzha Skincare puede modificar precios, promociones o disponibilidad sin previo aviso, siempre dentro de las condiciones vigentes en el momento de la compra.",
        },
        {
          title: "Envíos y entregas",
          content: "Los tiempos de entrega pueden variar según la ubicación, la disponibilidad del stock y los operadores logísticos. Tirzha Skincare no se responsabiliza por retrasos ocasionados por terceros o causas ajenas a su control.",
        },
        {
          title: "Responsabilidad del cliente",
          content: "Es responsabilidad del cliente revisar el pedido al recibirlo, notificar cualquier incidencia de forma inmediata y conservar la información de compra para posibles reclamos o devoluciones.",
        },
      ]}
      cta={{ href: "/contacto", label: "Contactar con soporte" }}
    />
  );
}
