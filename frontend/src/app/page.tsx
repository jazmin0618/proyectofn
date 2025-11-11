import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>INTELIGENCIA ARTIFICIAL</h1>
        
        <div className={styles.bubblesContainer}>
          <div className={styles.bubble}>
            <h2 className={styles.question}>¿QUÉ ES LA IA?</h2>
            <p className={styles.answer}>
              La Inteligencia Artificial es la simulación de procesos de inteligencia humana 
              por parte de máquinas, especialmente sistemas informáticos.
            </p>
          </div>
          <div className={styles.bubble}>
            <h2 className={styles.question}>¿POR QUÉ USAR LA IA?</h2>
            <p className={styles.answer}>
              La IA permite automatizar tareas complejas, analizar grandes volúmenes de datos, 
              mejorar la eficiencia y crear soluciones innovadoras en diversos campos.
            </p>
          </div>

          <div className={styles.bubble}>
            <h2 className={styles.question}>¿ES NECESARIO USAR IA?</h2>
            <p className={styles.answer}>
              No siempre es necesaria, pero se ha vuelto esencial en muchos sectores para 
              mantener la competitividad y resolver problemas complejos de manera eficiente.
            </p>
          </div>

          <div className={styles.bubble}>
            <h2 className={styles.question}>¿POR QUÉ HAY TANTAS IAS?</h2>
            <p className={styles.answer}>
              Existen múltiples tipos de IA porque cada una está especializada en diferentes 
              tareas: algunas para reconocimiento de imágenes, otras para procesamiento de 
              lenguaje, análisis de datos, etc.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}