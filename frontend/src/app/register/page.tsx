'use client';
import { useState } from 'react';
import { authAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './register.module.css';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    career: '',
    study_level: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const result = await authAPI.register(formData);
      
      if (result.success) {
        localStorage.setItem('token', result.access_token);
        localStorage.setItem('user', JSON.stringify(result.user));
        setMessage('¡Registro exitoso! Redirigiendo...');
        
        // Forzar actualización del estado global
        window.dispatchEvent(new Event('storage'));
        
        setTimeout(() => {
          router.push('/perfil');
        }, 1000);
      } else {
        setError(result.message || 'Error en el registro');
      }
    } catch (error: any) {
      setError(error.message || 'Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Crear Cuenta</h1>
        
        {error && (
          <div className={styles.error}>
            ⚠️ {error}
          </div>
        )}

        {message && (
          <div className={styles.success}>
            ✅ {message}
          </div>
        )}
        
        <div className={styles.inputGroup}>
          <label>Nombre Completo</label>
          <input
            type="text"
            name="name"
            placeholder="María García"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="maria@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label>Carrera que estudias</label>
          <input
            type="text"
            name="career"
            placeholder="Ingeniería en Sistemas"
            value={formData.career}
            onChange={handleChange}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label>Nivel de estudio</label>
          <select 
            name="study_level"
            value={formData.study_level}
            onChange={handleChange}
          >
            <option value="">Selecciona tu nivel</option>
            <option value="Bachillerato">🎓 Bachillerato</option>
            <option value="Universidad">🎓 Universidad</option>
            <option value="Maestría">🎓 Maestría</option>
            <option value="Doctorado">🎓 Doctorado</option>
          </select>
        </div>
        
        <button 
          type="submit" 
          className={styles.button}
          disabled={loading}
        >
          {loading ? '🔄 Registrando...' : ' Crear mi cuenta'}
        </button>
        
        <p className={styles.loginLink}>
          ¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
}