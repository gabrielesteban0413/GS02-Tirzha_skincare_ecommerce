"use client";

import { useParams } from "next/navigation";

export default function RoutineDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  if (!slug) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">Cargando detalles de la rutina...</div>
      </div>
    );
  }

  // Aquí luego conectarás con un hook real (useRoutine)
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Rutina: {slug}</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">
          Contenido detallado de la rutina. Próximamente se cargarán los pasos
          y productos recomendados.
        </p>
      </div>
    </div>
  );
}