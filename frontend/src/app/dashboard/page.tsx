'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) {
    return <div style={styles.loading}>Cargando...</div>;
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Bienvenido, {user.name}!</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Cerrar Sesión
        </button>
      </header>
      
      <div style={styles.content}>
        <div style={styles.card}>
          <h3>Tu información</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Carrera:</strong> {user.career || 'No especificada'}</p>
          <p><strong>Nivel:</strong> {user.study_level || 'No especificado'}</p>
        </div>
        
        <div style={styles.card}>
          <h3>Próximamente: Chatbot de IA</h3>
          <p>Aquí podrás obtener recomendaciones personalizadas de herramientas de IA según tus necesidades de estudio.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  logoutButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  content: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '1rem',
  },
  loading: {
    textAlign: 'center' as const,
    padding: '2rem',
    fontSize: '1.2rem',
  },
};