"use client";
import TarjetaIA from "@/componentes/ui/card/cardia";
import styles from "./lista.module.css";
import { useEffect, useState } from "react";

interface ListaHerramientasProps {
  datosIAs: { [key: string]: any[] } | null;
}

export default function ListaHerramientas({ datosIAs }: ListaHerramientasProps) {
      const [terminoBusqueda, setTerminoBusqueda] = useState("");
   useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const buscarParam = urlParams.get('buscar');
    if (buscarParam) {
      setTerminoBusqueda(buscarParam);
      
      // Hacer scroll a la sección si viene de un enlace del footer
      setTimeout(() => {
        const hash = window.location.hash;
        if (hash) {
          const elemento = document.getElementById(hash.replace('#', ''));
          if (elemento) {
            elemento.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 500);
    }
    }, []);
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
    { id: "chatbots", nombre: "💼 Chatbots Empresariales" },
    {id: "buscadores", nombre: "Buscadores"},
    {id: "multilenguaje", nombre: "Multilenguaje"}
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