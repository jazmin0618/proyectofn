import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <br/>
        <h1 className={styles.title}>INTELIGENCIA ARTIFICIAL</h1>
        <br/><br/>
        {/* Pregunta 1: ¿QUÉ ES LA IA? */}
        <div className={styles.bubble}>
        <h2 className={styles.question}>¿QUÉ ES LA IA?</h2>
        <p className={styles.answer}>
            La Inteligencia Artificial (IA) es un campo de la informática dedicado a crear sistemas o máquinas
            que pueden simular la inteligencia humana para realizar tareas que normalmente requieren pensamiento,
            aprendizaje y toma de decisiones.
            <br/><br/>
            En esencia, la IA busca que las máquinas puedan:
               <ul>
                <li>Aprender: Adquirir información y reglas para usar la información (Aprendizaje Automático o Machine Learning).</li>
                <li>Razonar: Utilizar reglas para llegar a conclusiones aproximadas o definidas.</li>
                <li>Resolver problemas: Encontrar soluciones a problemas específicos.</li>
                <li>Percibir: Entender e interpretar información del entorno (visión, lenguaje).</li>
                <li>Comprender el lenguaje: Procesar el lenguaje natural (Procesamiento del Lenguaje Natural o PNL).</li>
             </ul>
            Un ejemplo clave de su funcionamiento es el Aprendizaje Automático (Machine Learning), donde un
            sistema no se programa explícitamente para una tarea, sino que aprende de grandes cantidades de datos para reconocer patrones y
            hacer predicciones o clasificaciones.
        </p>
    </div>
    <br/>

          {/* Pregunta 2: ¿POR QUÉ USAR LA IA? */}
    <div className={styles.bubble}>
        <h2 className={styles.question}>¿POR QUÉ USAR LA IA?</h2>
        <p className={styles.answer}>
            El uso de la IA está impulsado por varias ventajas fundamentales:
              <ol>
                <li>Automatización y Eficiencia<br/>
                    La IA puede realizar tareas repetitivas, mundanas o de alto volumen mucho más rápido y con mayor precisión que un humano. Esto libera a las personas para que se centren en tareas creativas, estratégicas o que requieran empatía humana.
                    <br/>
                    Ejemplo: En la fabricación, los robots impulsados por IA pueden ensamblar productos 24/7 sin fatiga.
                </li>
                    <li>Toma de Decisiones Basada en Datos (Big Data)<br/>
                    La IA puede analizar volúmenes masivos de datos (Big Data) en segundos e identificar patrones, correlaciones y tendencias que serían invisibles para un analista humano. Esto conduce a decisiones más informadas y mejores predicciones.
                    <br/>
                    Ejemplo: Los sistemas de recomendación de streaming predicen qué película o producto te gustará basándose en millones de interacciones de usuarios.
                </li>
                <li>Mejora de la Precisión y Reducción de Errores<br/>
                    En campos críticos como la medicina o las finanzas, la capacidad de la IA para procesar información sin sesgos emocionales y con un alto nivel de detalle reduce drásticamente el error humano.
                    <br/>
                    Ejemplo: La IA puede detectar tumores en radiografías con una precisión igual o superior a la de un radiólogo experimentado.
                </li>
                <li>Personalización a Escala<br/>
                    La IA permite a las empresas y servicios ofrecer experiencias y productos altamente personalizados a millones de usuarios simultáneamente.
                    <br/>
                    Ejemplo: Los asistentes virtuales adaptan sus respuestas y servicios a las preferencias individuales de cada usuario.
                </li>
            </ol>
        </p>
    </div>
<br/>
          {/* Pregunta 3: ¿ES NECESARIO USAR IA? */}
    <div className={styles.bubble}>
        <h2 className={styles.question}>¿ES NECESARIO USAR IA?</h2>
        <p className={styles.answer}>
            No es estrictamente "necesario" en el sentido de la supervivencia básica, pero se está volviendo indispensable
            para la competitividad, el progreso social y la eficiencia en el mundo moderno.
            <br/><br/>
            La IA es una tecnología fundamental que impulsa la mayoría de las innovaciones actuales:
            <ul>
                <li>Para las empresas: Es crucial para mantenerse competitivas, reducir costos, innovar productos y entender mejor a sus clientes.</li>
                <li>Para la investigación: Acelera el descubrimiento de nuevos medicamentos, materiales y soluciones a problemas globales.</li>
                <li>Para los individuos: Facilita la vida diaria (navegación GPS, filtros de spam, smartphones).</li>
            </ul>
            Podemos verlo como la electricidad en el siglo XX: no es necesaria para vivir, pero es impensable el mundo actual sin ella.
        </p>
    </div>
<br/>
          {/* Pregunta 4: ¿POR QUÉ HAY TANTAS IAS? */}
    <div className={styles.bubble}>
        <h2 className={styles.question}>¿POR QUÉ HAY TANTAS IAS?</h2>
        <p className={styles.answer}>
            La percepción de que "hay tantas IA" se debe a dos razones principales:
            <ol>
                <li>La IA es un Campo General con Múltiples Subdisciplinas:
                    La IA es un término paraguas que abarca muchas áreas especializadas, cada una resolviendo un tipo diferente de problema (Visión por Computadora, PNL, Aprendizaje Profundo).
                </li>
                <li>Modelos y Aplicaciones Específicas:
                    Dentro de estas subdisciplinas, se desarrollan cientos de modelos y aplicaciones específicas que a menudo se denominan "una IA".
                </li>
            </ol>
            <br/>
            La diversidad que observamos refleja la amplitud de problemas humanos que la tecnología de IA puede abordar, lo que resulta en una gran cantidad de soluciones especializadas.
        </p>
        </div>
      </main>
    </div>
  );
}