'use client';
import { useState } from 'react';
import { authAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Conectando...');

    try {
      const result = await authAPI.login(email, password);
      
      if (result.success) {
        localStorage.setItem('token', result.access_token);
        localStorage.setItem('user', JSON.stringify(result.user));
        setMessage('¡Login exitoso! Redirigiendo...');
        router.push('/dashboard');
      } else {
        setMessage(result.message || 'Error en el login');
      }
    } catch (error) {
      setMessage('Error de conexión con el servidor');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Iniciar Sesión</h2>
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        
        <button type="submit" style={styles.button}>
          Ingresar
        </button>
        
        {message && <p style={styles.message}>{message}</p>}
        
        <p style={styles.link}>
          ¿No tienes cuenta? <a href="/register" style={styles.anchor}>Regístrate</a>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  form: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center' as const,
    marginBottom: '1.5rem',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  message: {
    textAlign: 'center' as const,
    marginTop: '1rem',
    color: '#666',
  },
  link: {
    textAlign: 'center' as const,
    marginTop: '1rem',
  },
  anchor: {
    color: '#0070f3',
    textDecoration: 'none',
  },
};