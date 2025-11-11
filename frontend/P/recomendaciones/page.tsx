import styles from "./styles.module.css"; 

export default function Recomendaciones() {
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
        paraQueSirve: "Generación de imágenes fotorrealistas y conceptos complejos a partir de descripciones muy detalladas. Excelente para marketing.",
        diferencia: "Coherencia semántica superior. Entiende y respeta mejor las descripciones de prompt largas y complejas.",
        porQueUsarla: "Para obtener resultados rápidos, coherentes y precisos con descripciones complejas."
      },
      {
        nombre: "Stable Diffusion",
        paraQueSirve: "Generación de imágenes personalizadas y de código abierto. Para investigación y desarrollo con control técnico avanzado.",
        diferencia: "Código abierto y personalización total. Permite ejecutarse localmente y usar modelos entrenados por la comunidad.",
        porQueUsarla: "Si eres desarrollador o creador avanzado que necesita control total y privacidad."
      },
      {
        nombre: "Adobe Firefly",
        paraQueSirve: "Generación de imágenes y manipulación de fotos integradas en el flujo de trabajo de Adobe.",
        diferencia: "Enfocado en la seguridad comercial y la integración directa con Photoshop e Illustrator.",
        porQueUsarla: "Si eres profesional del diseño que ya usa el ecosistema Adobe y necesita garantías de uso comercial."
      }
    ],
    video: [
      {
        nombre: "RunwayML (Gen-2)",
        paraQueSirve: "Generación y edición completa de video. Puede crear clips a partir de texto o imágenes, o aplicar efectos y estilos.",
        diferencia: "Potente 'Gen-2' que transforma texto en video con alto grado de control y interfaz profesional.",
        porQueUsarla: "Si necesitas una herramienta versátil que no solo genere clips sino que también ofrezca edición avanzada."
      },
      {
        nombre: "Pika Labs",
        paraQueSirve: "Generación de videos cortos y creativos a partir de texto e imágenes, con enfoque en velocidad y accesibilidad.",
        diferencia: "Fácil de usar a través de Discord, con actualizaciones rápidas y enfoque en clips dinámicos.",
        porQueUsarla: "Para principiantes o necesidades de generar rápidamente pruebas de concepto o clips creativos."
      },
      {
        nombre: "Synthesia",
        paraQueSirve: "Creación de videos corporativos o educativos con avatares de IA realistas (humanos virtuales).",
        diferencia: "Se enfoca en generación de presentadores y locuciones multilingües de alta calidad.",
        porQueUsarla: "Para crear videos de capacitación o marketing con 'rostro humano' profesional sin grabar personas."
      }
    ],
    estudio: [
      {
        nombre: "ChatGPT",
        paraQueSirve: "Asistencia general para aclarar conceptos, explicar temas complejos, generar ideas o practicar idiomas.",
        diferencia: "Versatilidad y conversación en lenguaje natural. Capaz de adaptarse a casi cualquier pregunta académica.",
        porQueUsarla: "Es la herramienta más flexible para obtener explicaciones instantáneas o tener un tutor 24/7."
      },
      {
        nombre: "Socratic (Google)",
        paraQueSirve: "Resolver problemas y ampliar explicaciones de conceptos específicos en todas las materias.",
        diferencia: "Uso de cámara y enfoque educativo. Permite tomar foto de problemas y da explicaciones paso a paso.",
        porQueUsarla: "Si necesitas entender el cómo de un ejercicio o concepto, especialmente si es visual."
      },
      {
        nombre: "Wolfram Alpha",
        paraQueSirve: "Respuestas matemáticas y científicas precisas. Resuelve ecuaciones, integrales, analiza datos.",
        diferencia: "Motor de conocimiento computacional. Da resultados exactos y paso a paso para problemas complejos.",
        porQueUsarla: "Imprescindible para asignaturas STEM que requieren precisión y desglose de soluciones."
      },
      {
        nombre: "Photomath",
        paraQueSirve: "Solución instantánea de problemas de matemáticas con la cámara del móvil.",
        diferencia: "Especialización en soluciones visuales de problemas escritos a mano o impresos.",
        porQueUsarla: "Para ver solución paso a paso de ejercicios en papel y comprobar resultados al instante."
      }
    ],
    escritura: [
      {
        nombre: "Grammarly",
        paraQueSirve: "Corregir gramática, ortografía y estilo en trabajos, ensayos y correos.",
        diferencia: "Especialización en corrección avanzada. Ofrece sugerencias de tono, fluidez y vocabulario.",
        porQueUsarla: "Para asegurar que tus trabajos escritos son impecables antes de entregarlos."
      },
      {
        nombre: "Quillbot",
        paraQueSirve: "Parafrasear, resumir y comprobar plagio en textos.",
        diferencia: "Herramienta de parafraseo potente y rápida con diferentes modos de escritura.",
        porQueUsarla: "Para condensar información o reescribir fuentes de manera ética y original."
      },
      {
        nombre: "Resoomer",
        paraQueSirve: "Generar resúmenes automáticos de documentos extensos.",
        diferencia: "Enfoque en la síntesis. Extrae ideas principales y puntos clave.",
        porQueUsarla: "Para captar rápidamente la esencia de lecturas obligatorias o documentos largos."
      }
    ],
    programacion: [
      {
        nombre: "GitHub Copilot",
        paraQueSirve: "Generación de código contextual y funciones completas mientras programas.",
        diferencia: "Integración perfecta con IDEs populares y sugerencias de alta precisión.",
        porQueUsarla: "Para acelerar la escritura de código y automatizar tareas repetitivas."
      },
      {
        nombre: "Tabnine",
        paraQueSirve: "Autocompletado inteligente que aprende del estilo de codificación del usuario.",
        diferencia: "Privacidad y opciones para entrenar modelos en código base privado.",
        porQueUsarla: "Para mejorar productividad manteniendo consistencia del código en equipos."
      },
      {
        nombre: "Amazon CodeWhisperer",
        paraQueSirve: "Generación de código con enfoque en seguridad y optimización para AWS.",
        diferencia: "Escaneo de seguridad de código incluido y especialización en servicios AWS.",
        porQueUsarla: "Para desarrollo seguro y rápido de aplicaciones en infraestructura AWS."
      }
    ]
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎯 Recomendaciones de IA</h1>
      
      {/* IAs de Imágenes */}
      <section className={styles.section}>
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
      <section className={styles.section}>
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
      <section className={styles.section}>
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

      {/* IAs de Escritura */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>✍️ IAs de Escritura y Edición</h2>
        <div className={styles.bubblesGrid}>
          {iasData.escritura.map((ia, index) => (
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
      <section className={styles.section}>
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