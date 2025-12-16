// Agrega esto al inicio de tu server.js
const express = require('express');
const cors = require('cors'); // <- Agregar esta línea

const app = express();

// CONFIGURAR CORS - AGREGAR ESTO
app.use(cors({
  origin: 'https://proyectofn.vercel.app', // Tu frontend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware existente
app.use(express.json());
// ... resto de tu código

// Ruta de LOGIN (crítica)
app.post('/auth/login', async (req, res) => {
  try {
    console.log("📥 Login recibido:", req.body.email);
    // Tu lógica de autenticación aquí...
    
    // EJEMPLO de respuesta que espera tu frontend:
    res.json({
      success: true,
      access_token: "token_generado_aqui",
      user: {
        id: 1,
        name: req.body.name,
        email: req.body.email
      }
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// Ruta de REGISTER
app.post('/auth/register', async (req, res) => {
  try {
    console.log("📥 Registro recibido:", req.body.email);
    // Tu lógica de registro aquí...
    
    // EJEMPLO de respuesta:
    res.json({
      success: true,
      access_token: "token_generado_aqui",
      user: {
        id: 1,
        name: req.body.name,
        email: req.body.email,
        career: req.body.career,
        study_level: req.body.study_level
      }
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
});