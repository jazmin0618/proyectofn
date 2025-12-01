"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./favoritos.module.css";
interface IA {
  id: number;
  nombre: string;
  emoji: string;
  categoria: string;
  paraQueSirve: string;
}

export default function Favoritos() {
  const router = useRouter();
  const [favoritos, setFavoritos] = useState<IA[]>([]);
  const [usuario, setUsuario] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }

    const userObj = JSON.parse(userData);
    setUsuario(userObj);

    // Cargar favoritos
    const favoritosIds = JSON.parse(localStorage.getItem(`favoritos_${userObj.id}`) || '[]');
    
    // Cargar datos de IAs
    const cargarIAsFavoritas = async () => {
      try {
        const response = await fetch('/api');
        if (response.ok) {
          const todasIAsData = await response.json();
          const todasIAs: IA[] = [];
          Object.values(todasIAsData).forEach((categoria: any) => {
            todasIAs.push(...categoria);
          });
          
          const iasFavoritas = todasIAs.filter((ia: IA) => 
            favoritosIds.includes(ia.id)
          );
          setFavoritos(iasFavoritas);
        }
      } catch (error) {
        console.error('Error cargando favoritos:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarIAsFavoritas();
  }, [router]);

  const eliminarFavorito = (iaId: number) => {
    if (!usuario) return;
    
    const nuevosFavoritos = favoritos.filter(ia => ia.id !== iaId);
    setFavoritos(nuevosFavoritos);
    
    const favoritosIds = nuevosFavoritos.map(ia => ia.id);
    localStorage.setItem(`favoritos_${usuario.id}`, JSON.stringify(favoritosIds));
    
    // Actualizar contador en header
    window.dispatchEvent(new Event('storage'));
  };

  if (cargando) {
    return <div className={styles.cargando}>Cargando favoritos...</div>;
  }

  return (
    <div className={styles.paginaFavoritos}>
      <div className={styles.header}>
        <h1>❤️ Mis Favoritos</h1>
        <p>Herramientas de IA que has guardado</p>
      </div>

      {favoritos.length === 0 ? (
        <div className={styles.vacio}>
          <div className={styles.vacioEmoji}>😔</div>
          <h3>No tienes favoritos aún</h3>
          <p>Descubre herramientas increíbles y guárdalas aquí</p>
          <Link href="/recomendaciones" className={styles.botonExplorar}>
            🚀 Explorar Herramientas
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.contador}>
            {favoritos.length} herramienta{favoritos.length !== 1 ? 's' : ''} favorita{favoritos.length !== 1 ? 's' : ''}
          </div>
          
          <div className={styles.gridFavoritos}>
            {favoritos.map((ia) => (
              <div key={ia.id} className={styles.tarjetaFavorito}>
                <div className={styles.favoritoHeader}>
                  <span className={styles.emoji}>{ia.emoji}</span>
                  <h3>{ia.nombre}</h3>
                </div>
                <p className={styles.descripcion}>{ia.paraQueSirve}</p>
                <div className={styles.favoritoFooter}>
                  <span className={styles.categoria}>{ia.categoria}</span>
                  <div className={styles.acciones}>
                    <Link 
                      href={`/recomendaciones#${ia.categoria}`}
                      className={styles.botonVer}
                    >
                      Ver
                    </Link>
                    <button 
                      onClick={() => eliminarFavorito(ia.id)}
                      className={styles.botonEliminar}
                      title="Quitar de favoritos"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}