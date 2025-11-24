"use client";
import Enlace from "next/link";
import styles from "./grid.module.css";

// Esto viene de tu ias.json
const categorias = [
  { id: "imagenes", nombre: "Imágenes & Arte", emoji: "🎨", cantidad: 6 },
  { id: "video", nombre: "Video & Animación", emoji: "🎬", cantidad: 6 },
  { id: "estudio", nombre: "Educación & Estudio", emoji: "📚", cantidad: 6 },
  { id: "escritura", nombre: "Escritura & Texto", emoji: "✍️", cantidad: 5 },
  { id: "programacion", nombre: "Programación", emoji: "💻", cantidad: 5 },
  { id: "audio", nombre: "Audio & Música", emoji: "🎧", cantidad: 5 },
];

export default function GridCategorias() {
  return (
    <section className={styles.categorias}>
      <h2>Explora Herramientas de IA por Categoría</h2>
      <div className={styles.grid}>
        {categorias.map((categoria) => (
          <Enlace 
            key={categoria.id} 
            href={`/recomendaciones?categoria=${categoria.id}`}
            className={styles.tarjetaCategoria}
          >
            <div className={styles.emoji}>{categoria.emoji}</div>
            <h3>{categoria.nombre}</h3>
            <span>{categoria.cantidad} herramientas</span>
          </Enlace>
        ))}
      </div>
    </section>
  );
}