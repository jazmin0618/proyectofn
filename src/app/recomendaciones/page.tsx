"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

export default function Recomendaciones() {
  const router = useRouter();

  useEffect(() => {
    // Manejar el scroll a anclas cuando la página carga
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

  const iasData = {
    imagenes: [
      {
        nombre: "Midjourney",
        paraQueSirve: "Creación de arte digital, ilustraciones y conceptos visuales con un marcado estilo estético. Ideal para concept art y diseños únicos.",
        diferencia: "Estilo artístico único y consistente. Sus imágenes suelen tener un toque más pictórico, dramático o cinemático.",
        porQueUsarla: "Si buscas impacto visual y un estilo artístico pulido sin necesidad de una gran configuración técnica."
      },
      {
        nombre: "DALL-E 3",
        paraQueSirve: "Generación de imágenes fotorrealistas y conceptos complejos a partir de descripciones muy detalladas. Excelente para marketing o contar una historia precisa.",
        diferencia: "Coherencia semántica superior. Entiende y respeta mejor las descripciones de prompt largas y complejas.",
        porQueUsarla: "Para obtener resultados rápidos, coherentes y precisos con descripciones complejas."
      },
      {
        nombre: "Stable Diffusion",
        paraQueSirve: "Generación de imágenes personalizadas y de código abierto. Se utiliza para investigación, desarrollo y para generar imágenes con control técnico avanzado.",
        diferencia: "Código abierto y personalización total. Permite ser ejecutada localmente y usar modelos entrenados por la comunidad.",
        porQueUsarla: "Si eres un desarrollador, investigador o creador avanzado que necesita control total sobre el proceso."
      },
      {
        nombre: "Adobe Firefly",
        paraQueSirve: "Generación de imágenes y manipulación de fotos integradas en el flujo de trabajo de Adobe.",
        diferencia: "Enfocado en la seguridad comercial (licencias) y la integración directa con Photoshop e Illustrator.",
        porQueUsarla: "Si eres un profesional del diseño que ya usa el ecosistema de Adobe y necesitas una IA con garantías de uso comercial."
      }
    ],
    video: [
      {
        nombre: "RunwayML (Gen-2)",
        paraQueSirve: "Generación y edición completa de video. Puede crear clips a partir de texto o imágenes, o aplicar efectos y estilos a videos existentes.",
        diferencia: "Potente 'Gen-2' que transforma texto en video o imagen en video con un alto grado de control.",
        porQueUsarla: "Si necesitas una herramienta versátil que no solo genere clips desde cero, sino que también ofrezca herramientas de edición avanzadas."
      },
      {
        nombre: "Pika Labs",
        paraQueSirve: "Generación de videos cortos y creativos a partir de texto e imágenes, con un enfoque en la velocidad y la accesibilidad.",
        diferencia: "Fácil de usar a través de Discord, con actualizaciones muy rápidas y un enfoque en clips dinámicos.",
        porQueUsarla: "Si eres un principiante o necesitas una herramienta con un precio más accesible para generar rápidamente pruebas de concepto."
      },
      {
        nombre: "Synthesia",
        paraQueSirve: "Creación de videos corporativos o educativos con avatares de IA realistas (humanos virtuales).",
        diferencia: "Se enfoca en la generación de presentadores y locuciones multilingües de alta calidad.",
        porQueUsarla: "Si tu objetivo es crear videos de capacitación, e-learning o marketing con un 'rostro humano' profesional."
      }
    ],
    estudio: [
      {
        nombre: "ChatGPT",
        paraQueSirve: "Asistencia general para aclarar conceptos, explicar temas complejos (historia, literatura, etc.), generar ideas para proyectos o practicar idiomas.",
        diferencia: "Versatilidad y conversación en lenguaje natural. Es el todoterreno, capaz de adaptarse a casi cualquier pregunta o necesidad académica.",
        porQueUsarla: "Es la herramienta más flexible y accesible para obtener explicaciones instantáneas, generar borradores de textos o tener un tutor 24/7."
      },
      {
        nombre: "Socratic (de Google)",
        paraQueSirve: "Resolver problemas y ampliar explicaciones de conceptos específicos en todas las materias (matemáticas, ciencias, humanidades).",
        diferencia: "Uso de cámara y enfoque educativo. Permite tomar una foto de un problema y te da no solo la respuesta, sino también explicaciones.",
        porQueUsarla: "Si necesitas entender el cómo de un ejercicio o concepto, especialmente si es visual (ejercicios de libros o apuntes)."
      },
      {
        nombre: "Wolfram Alpha",
        paraQueSirve: "Respuestas matemáticas y científicas precisas. Resuelve ecuaciones, integrales, analiza datos y proporciona información técnica detallada.",
        diferencia: "Motor de conocimiento computacional. Da resultados exactos y paso a paso para problemas complejos.",
        porQueUsarla: "Imprescindible para asignaturas STEM que requieren precisión y desglose de soluciones."
      }
    ],
    programacion: [
      {
        nombre: "GitHub Copilot",
        paraQueSirve: "Generación de código contextual y funciones completas mientras programas.",
        diferencia: "Integración perfecta con IDEs populares y sugerencias de alta precisión basadas en miles de millones de líneas de código.",
        porQueUsarla: "Para acelerar la escritura de código y automatizar tareas repetitivas."
      },
      {
        nombre: "Amazon CodeWhisperer",
        paraQueSirve: "Generación de código con foco en seguridad y optimización para AWS.",
        diferencia: "Escaneo de seguridad de código incluido y especialización en servicios AWS.",
        porQueUsarla: "Para desarrollo seguro y rápido de aplicaciones en infraestructura AWS."
      }
    ]
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎯 Recomendaciones de IA</h1>
      
      {/* IAs de Imágenes */}
      <section id="imagenes" className={styles.section}>
        <h2 className={styles.sectionTitle}>🎨 IAs de Generación de Imágenes</h2>
        <div className={styles.bubblesGrid}>
          {iasData.imagenes.map((ia, index) => (
            <div key={index} className={styles.bubble}>
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
          {iasData.video.map((ia, index) => (
            <div key={index} className={styles.bubble}>
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
          {iasData.estudio.map((ia, index) => (
            <div key={index} className={styles.bubble}>
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
          {iasData.programacion.map((ia, index) => (
            <div key={index} className={styles.bubble}>
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