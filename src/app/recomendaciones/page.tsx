"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

// Definir el tipo de datos
interface IA {
  id: number;
  nombre: string;
  emoji: string;
  paraQueSirve: string;
  diferencia: string;
  porQueUsarla: string;
}

interface IAsData {
  [key: string]: IA[];
}

export default function Recomendaciones() {
  const router = useRouter();
  const [iasData, setIasData] = useState<IAsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos desde la API
  useEffect(() => {
    const fetchIAs = async () => {
      try {
        const response = await fetch('/api');
        if (!response.ok) {
          throw new Error('Error al cargar los datos');
        }
        const data = await response.json();
        setIasData(data);
      } catch (err) {
        setError('No se pudieron cargar las recomendaciones');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchIAs();
  }, []);

  // Manejar scroll a anclas
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Cargando recomendaciones...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  if (!iasData) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>No hay datos disponibles</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎯 Recomendaciones de IA</h1>
      
      {/* IAs de Imágenes */}
      <section id="imagenes" className={styles.section}>
        <h2 className={styles.sectionTitle}>🎨 IAs de Generación de Imágenes</h2>
        <div className={styles.bubblesGrid}>
          {iasData.imagenes.map((ia) => (
            <div key={ia.id} className={styles.bubble}>
              <h3 className={styles.iaName}>{ia.nombre}</h3>
              <div className={styles.iaContent}>
                <div className={styles.iaItem}>
                  <span className={styles.label}>¿Para qué sirve?</span>
                  <p>{ia.paraQueSirve}</p>
                </div>
                <div className={styles.iaItem}>
                  <span className={styles.label}>Diferencia clave</span>
                  <p>{ia.diferencia}</p>
                </div>
                <div className={styles.iaItem}>
                  <span className={styles.label}>¿Por qué usarla?</span>
                  <p>{ia.porQueUsarla}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IAs de Video */}
      <section id="video" className={styles.section}>
        <h2 className={styles.sectionTitle}>🎬 IAs de Generación de Video</h2>
        <div className={styles.bubblesGrid}>
          {iasData.video.map((ia) => (
            <div key={ia.id} className={styles.bubble}>
              <h3 className={styles.iaName}>{ia.nombre}</h3>
              <div className={styles.iaContent}>
                <div className={styles.iaItem}>
                  <span className={styles.label}>¿Para qué sirve?</span>
                  <p>{ia.paraQueSirve}</p>
                </div>
                <div className={styles.iaItem}>
                  <span className={styles.label}>Diferencia clave</span>
                  <p>{ia.diferencia}</p>
                </div>
                <div className={styles.iaItem}>
                  <span className={styles.label}>¿Por qué usarla?</span>
                  <p>{ia.porQueUsarla}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IAs de Estudio */}
      <section id="estudio" className={styles.section}>
        <h2 className={styles.sectionTitle}>📚 IAs de Asistencia de Estudio</h2>
        <div className={styles.bubblesGrid}>
          {iasData.estudio.map((ia) => (
            <div key={ia.id} className={styles.bubble}>
              <h3 className={styles.iaName}>{ia.nombre}</h3>
              <div className={styles.iaContent}>
                <div className={styles.iaItem}>
                  <span className={styles.label}>¿Para qué sirve?</span>
                  <p>{ia.paraQueSirve}</p>
                </div>
                <div className={styles.iaItem}>
                  <span className={styles.label}>Diferencia clave</span>
                  <p>{ia.diferencia}</p>
                </div>
                <div className={styles.iaItem}>
                  <span className={styles.label}>¿Por qué usarla?</span>
                  <p>{ia.porQueUsarla}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IAs de Escritura */}
      <section id="escritura" className={styles.section}>
        <h2 className={styles.sectionTitle}>✍️ IAs de Escritura y Edición</h2>
        <div className={styles.bubblesGrid}>
          {iasData.escritura.map((ia) => (
            <div key={ia.id} className={styles.bubble}>
              <h3 className={styles.iaName}>{ia.nombre}</h3>
              <div className={styles.iaContent}>
                <div className={styles.iaItem}>
                  <span className={styles.label}>¿Para qué sirve?</span>
                  <p>{ia.paraQueSirve}</p>
                </div>
                <div className={styles.iaItem}>
                  <span className={styles.label}>Diferencia clave</span>
                  <p>{ia.diferencia}</p>
                </div>
                <div className={styles.iaItem}>
                  <span className={styles.label}>¿Por qué usarla?</span>
                  <p>{ia.porQueUsarla}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IAs de Programación */}
      <section id="programacion" className={styles.section}>
        <h2 className={styles.sectionTitle}>💻 IAs para Programadores</h2>
        <div className={styles.bubblesGrid}>
          {iasData.programacion.map((ia) => (
            <div key={ia.id} className={styles.bubble}>
              <h3 className={styles.iaName}>{ia.nombre}</h3>
              <div className={styles.iaContent}>
                <div className={styles.iaItem}>
                  <span className={styles.label}>¿Para qué sirve?</span>
                  <p>{ia.paraQueSirve}</p>
                </div>
                <div className={styles.iaItem}>
                  <span className={styles.label}>Diferencia clave</span>
                  <p>{ia.diferencia}</p>
                </div>
                <div className={styles.iaItem}>
                  <span className={styles.label}>¿Por qué usarla?</span>
                  <p>{ia.porQueUsarla}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IAs de Audio */}
      <section id="audio" className={styles.section}>
        <h2 className={styles.sectionTitle}>🎧 IAs de Audio y Música</h2>
        <div className={styles.bubblesGrid}>
          {iasData.audio.map((ia) => (
            <div key={ia.id} className={styles.bubble}>
              <h3 className={styles.iaName}>{ia.nombre}</h3>
              <div className={styles.iaContent}>
                <div className={styles.iaItem}>
                  <span className={styles.label}>¿Para qué sirve?</span>
                  <p>{ia.paraQueSirve}</p>
                </div>
                <div className={styles.iaItem}>
                  <span className={styles.label}>Diferencia clave</span>
                  <p>{ia.diferencia}</p>
                </div>
                <div className={styles.iaItem}>
                  <span className={styles.label}>¿Por qué usarla?</span>
                  <p>{ia.porQueUsarla}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IAs de Productividad */}
      <section id="productividad" className={styles.section}>
        <h2 className={styles.sectionTitle}>🚀 IAs de Productividad</h2>
        <div className={styles.bubblesGrid}>
          {iasData.productividad.map((ia) => (
            <div key={ia.id} className={styles.bubble}>
              <h3 className={styles.iaName}>{ia.nombre}</h3>
              <div className={styles.iaContent}>
                <div className={styles.iaItem}>
                  <span className={styles.label}>¿Para qué sirve?</span>
                  <p>{ia.paraQueSirve}</p>
                </div>
                <div className={styles.iaItem}>
                  <span className={styles.label}>Diferencia clave</span>
                  <p>{ia.diferencia}</p>
                </div>
                <div className={styles.iaItem}>
                  <span className={styles.label}>¿Por qué usarla?</span>
                  <p>{ia.porQueUsarla}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IAs Chatbots */}
      <section id="chatbots" className={styles.section}>
        <h2 className={styles.sectionTitle}>💼 Chatbots Empresariales</h2>
        <div className={styles.bubblesGrid}>
          {iasData.chatbots.map((ia) => (
            <div key={ia.id} className={styles.bubble}>
              <h3 className={styles.iaName}>{ia.nombre}</h3>
              <div className={styles.iaContent}>
                <div className={styles.iaItem}>
                  <span className={styles.label}>¿Para qué sirve?</span>
                  <p>{ia.paraQueSirve}</p>
                </div>
                <div className={styles.iaItem}>
                  <span className={styles.label}>Diferencia clave</span>
                  <p>{ia.diferencia}</p>
                </div>
                <div className={styles.iaItem}>
                  <span className={styles.label}>¿Por qué usarla?</span>
                  <p>{ia.porQueUsarla}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}