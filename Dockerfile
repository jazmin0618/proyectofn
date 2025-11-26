# 1. IMAGEN BASE
FROM node:lts-slim

# 2. DIRECTORIO DE TRABAJO BASE
WORKDIR /app

# 3. COPIA DE ARCHIVOS
COPY . .

# ---------------------------------------------
# 4. PASO DE BUILD DEL BACKEND (NestJS)
# ---------------------------------------------
RUN echo "⚙️ Instalando y construyendo el Backend..."
# Cambiamos temporalmente el WORKDIR al subproyecto
WORKDIR /app/backend 
RUN npm install 
RUN npm run build

# ---------------------------------------------
# 5. PASO DE BUILD DEL FRONTEND (Next.js)
# ---------------------------------------------
RUN echo "⚛️ Instalando y construyendo el Frontend..."
# Cambiamos el WORKDIR al subproyecto del frontend
WORKDIR /app/frontend
RUN npm install 
RUN npm run build

# ---------------------------------------------
# 6. CONFIGURACIÓN FINAL Y ARRANQUE
# ---------------------------------------------
# Volvemos al directorio raíz (/app) para el comando de inicio (CMD)
WORKDIR /app 
EXPOSE 3000

# El comando de inicio debe ejecutarse desde /app, pero apuntando a la carpeta backend.
CMD ["npm", "start:prod", "--prefix", "./backend"]