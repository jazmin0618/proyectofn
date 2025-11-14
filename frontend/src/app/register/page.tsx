'use client';
import { useState } from 'react';
import { authAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    career: '',
    study_level: ''
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Registrando...');

    try {
      const result = await authAPI.register(formData);
      
      if (result.success) {
        localStorage.setItem('token', result.access_token);
        localStorage.setItem('user', JSON.stringify(result.user));
        setMessage('¡Registro exitoso! Redirigiendo...');
        router.push('/dashboard');
      } else {
        setMessage(result.message || 'Error en el registro');
      }
    } catch (error) {
      setMessage('Error de conexión con el servidor');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Crear Cuenta</h2>
        
        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        
        <input
          type="text"
          name="career"
          placeholder="Carrera que estudias"
          value={formData.career}
          onChange={handleChange}
          style={styles.input}
        />
        
        <select 
          name="study_level"
          value={formData.study_level}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Nivel de estudio</option>
          <option value="Bachillerato">Bachillerato</option>
          <option value="Universidad">Universidad</option>
          <option value="Maestría">Maestría</option>
          <option value="Doctorado">Doctorado</option>
        </select>
        
        <button type="submit" style={styles.button}>
          Registrarse
        </button>
        
        {message && <p style={styles.message}>{message}</p>}
        
        <p style={styles.link}>
          ¿Ya tienes cuenta? <a href="/login" style={styles.anchor}>Inicia sesión</a>
        </p>
      </form>
    </div>
  );
}

// Reutilizamos los mismos estilos
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