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