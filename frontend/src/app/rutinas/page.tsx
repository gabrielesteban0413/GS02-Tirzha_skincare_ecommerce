import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/Footer";
import { FOOTER_CONTENT } from "@/data/home.content";

const routineSections = [
  {
    title: "Rutina de mañana",
    description:
      "Comienza el día con una piel limpia, equilibrada y protegida. La rutina matutina debe aportar hidratación ligera, confort y defensa frente a la contaminación, el sol y la fatiga acumulada.",
    steps: [
      "Limpia con una espuma suave que elimine el exceso de sebo sin resecar.",
      "Aplica un sérum con vitamina C o niacinamida para iluminar y reforzar la barrera.",
      "Termina con una crema hidratante ligera y un protector solar de amplio espectro.",
    ],
  },
  {
    title: "Rutina de noche",
    description:
      "La noche es el momento ideal para reparar, regenerar y restaurar la piel. Aquí el objetivo es recuperar elasticidad, calmar irritaciones y favorecer la renovación celular.",
    steps: [
      "Elimina maquillaje, suciedad y residuos con un limpiador eficaz pero respetuoso.",
      "Usa un tratamiento activo como retinol, salicílico o una fórmula reparadora según tu necesidad.",
      "Cierra con una crema nutritiva que ayude a restaurar el equilibrio durante el descanso.",
    ],
  },
  {
    title: "Rutina de fin de semana",
    description:
      "Los días de descanso son perfectos para tratar la piel con más intención. Puedes dedicar tiempo a mascarillas, exfoliaciones suaves o rituales de hidratación profunda.",
    steps: [
      "Realiza una exfoliación suave una vez a la semana para despejar impurezas y mejorar la textura.",
      "Aporta una mascarilla calmante o nutritiva para dar un impulso extra de confort.",
      "Finaliza con una crema rica que deje la piel sedosa y reforzada.",
    ],
  },
];

const products = [
  "Limpiador facial de espuma",
  "Sérum luminoso",
  "Crema hidratante diaria",
  "Protector solar matificante",
  "Tratamiento nocturno reparador",
];

export default function RoutinesPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,215,203,0.35),_transparent_55%)]">
      <Navbar />
      <section className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="rounded-[2rem] border border-[#f2d9d1] bg-[#fff9f8] p-8 shadow-sm md:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c05264]">
            Rutinas premium
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl">
            Tu piel merece una rutina pensada para su energía real.
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">
            En Tirzha diseñamos rutinas completas para limpiar, hidratar, reparar y proteger tu piel con fórmulas suaves, efectivas y fáciles de incorporar en tu día a día.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            {routineSections.map((section) => (
              <article key={section.title} className="rounded-[1.75rem] border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-gray-600">{section.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {section.steps.map((step) => (
                    <li key={step} className="flex gap-2">
                      <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#c05264]" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <aside className="rounded-[1.75rem] border border-[#f2d9d1] bg-white p-6 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c05264]">
              Recomendación de inicio
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-gray-900">Rutina esencial para comenzar</h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              Si estás empezando, una rutina simple y consistente funciona mejor que una lista larga de pasos. Prioriza limpieza, hidratación y protección solar.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-gray-700">
              {products.map((product) => (
                <li key={product} className="flex items-center justify-between rounded-full border border-gray-200 px-4 py-2">
                  <span>{product}</span>
                  <span className="text-[#c05264]">✓</span>
                </li>
              ))}
            </ul>
            <Link
              href="/productos"
              className="mt-6 inline-flex rounded-full bg-[#c05264] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#a84354]"
            >
              Explorar productos
            </Link>
          </aside>
        </div>
      </section>
      <Footer {...FOOTER_CONTENT} />
    </main>
  );
}
