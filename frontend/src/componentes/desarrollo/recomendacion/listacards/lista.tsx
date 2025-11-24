"use client";
import TarjetaIA from "@/componentes/ui/card/cardia";
import styles from "./lista.module.css";

interface ListaHerramientasProps {
  datosIAs: { [key: string]: any[] } | null;
}

export default function ListaHerramientas({ datosIAs }: ListaHerramientasProps) {
  if (!datosIAs) {
    return <div className={styles.error}>No hay datos disponibles</div>;
  }

  const categorias = [
    { id: "imagenes", nombre: "🎨 Generación de Imágenes" },
    { id: "video", nombre: "🎬 Generación de Video" },
    { id: "estudio", nombre: "📚 Asistencia de Estudio" },
    { id: "escritura", nombre: "✍️ Escritura y Edición" },
    { id: "programacion", nombre: "💻 Programación" },
    { id: "audio", nombre: "🎧 Audio y Música" },
    { id: "productividad", nombre: "🚀 Productividad" },
    { id: "chatbots", nombre: "💼 Chatbots Empresariales" }
  ];

  return (
    <div className={styles.listaHerramientas}>
      {categorias.map((categoria) => (
        <section key={categoria.id} id={categoria.id} className={styles.seccionCategoria}>
          <h2 className={styles.tituloCategoria}>{categoria.nombre}</h2>
          <div className={styles.gridCards}>
            {datosIAs[categoria.id]?.map((ia) => (
              <TarjetaIA 
                key={ia.id} 
                ia={ia} 
                categoria={categoria.nombre}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}