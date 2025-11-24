"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import GridCategorias from "@/componentes/desarrollo/recomendacion/grid/grid";
import AsistenteRecomendacion from "@/componentes/desarrollo/recomendacion/asistente/asistente";
import ListaHerramientas from "@/componentes/desarrollo/recomendacion/listacards/lista";

interface IAsData {
  [key: string]: any[];
}

export default function Recomendaciones() {
  const [iasData, setIasData] = useState<IAsData | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar datos desde la API (tu código actual)
  useEffect(() => {
    const fetchIAs = async () => {
      try {
        const response = await fetch('/api');
        if (!response.ok) throw new Error('Error al cargar los datos');
        const data = await response.json();
        setIasData(data);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchIAs();
  }, []);

  if (loading) {
    return <div className={styles.cargando}>Cargando recomendaciones...</div>;
  }

  return (
    <div className={styles.paginaRecomendaciones}>
      {/* HEADER DE LA PÁGINA */}
      <header className={styles.header}>
        <h1 className={styles.tituloPrincipal}>🎯 Recomendaciones de IA</h1>
        <p className={styles.subtitulo}>
          Encuentra las mejores herramientas de inteligencia artificial para tus necesidades específicas
        </p>
      </header>

      {/* ASISTENTE DE RECOMENDACIÓN (NUEVO) */}
      <section className={styles.seccionAsistente}>
        <AsistenteRecomendacion datosIAs={iasData} />
      </section>

      {/* GRID DE CATEGORÍAS (NUEVO) */}
      <section className={styles.seccionCategorias}>
        <h2 className={styles.tituloSeccion}>Explora por Categoría</h2>
        <GridCategorias datosIAs={iasData} />
      </section>

      {/* LISTA COMPLETA DE HERRAMIENTAS CON CARDS (✅ REEMPLAZA TU CÓDIGO VIEJO) */}
      <section className={styles.seccionHerramientas}>
        <h2 className={styles.tituloSeccion}>Todas las Herramientas de IA</h2>
        <ListaHerramientas datosIAs={iasData} /> {/* ✅ ESTO MUESTRA LAS CARDS */}
      </section>
    </div>
  );
}