# Pizzería Mamma Mia

## Descripción
Aplicación web de pizzería con sistema de autenticación de usuarios (registro, login y perfil) usando React, Node.js, Express y MongoDB.

## Requisitos previos
- Node.js
- MongoDB


## Instalación
**Backend**:
cd backend
npm install

**Frontend**:
cd frontend
npm install

## Ejecución
**Backend**:
cd backend
node server.js

**Frontend**:
cd frontend
npm start

## Endpoints de API
- POST /api/users — Registrar `{ nombre, email, password }`
- POST /api/users/login — Login `{ email, password }`
- GET /api/users/profile — Perfil (sin protección temporal)
- PUT /api/users/profile — Actualizar perfil (sin protección temporal)

## Uso con Postman
**Nota**: Temporalmente, las rutas de perfil no requieren token de autenticación.

## Licencia
MIT