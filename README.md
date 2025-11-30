# 🐾 VetCare System - Backend API

> API RESTful robusta y escalable para la gestión administrativa y clínica de centros veterinarios.

Este repositorio contiene el código fuente del servidor (Backend) del sistema **VetCare**. Ha sido construido siguiendo una arquitectura en capas, priorizando la integridad de datos, la seguridad mediante tipos estrictos y un rendimiento óptimo.

---

## 🛠 Tecnologías y Stack

El núcleo del servidor ha sido desarrollado utilizando un stack moderno basado en Node.js y TypeScript:

* **Runtime:** [Node.js](https://nodejs.org/) (Entorno de ejecución asíncrono).
* **Framework:** Express.js (Servidor web minimalista y flexible).
* **Lenguaje:** TypeScript (Strict mode) para un desarrollo seguro y mantenible.
* **ORM:** [Prisma](https://www.prisma.io/) (Manejo de base de datos tipo-seguro y migraciones).
* **Base de Datos:** MySQL (Relacional).
* **Validación:** [Zod](https://zod.dev/) (Validación de esquemas y parseo de datos de entrada).
* **Seguridad:** JWT (JSON Web Tokens) + Bcrypt (Hashing de contraseñas).

---

## 🚀 Guía de Instalación y Despliegue

Sigue estos pasos para levantar el servidor y la base de datos en tu entorno local.

### Prerrequisitos
* Node.js (v18 o superior)
* Servidor MySQL corriendo (XAMPP, MAMP, Docker o nativo)
* Postman (Opcional, para pruebas)

### 1. Clonar el repositorio
```bash
git clone [https://github.com/tu-usuario/vetcare-backend.git](https://github.com/tu-usuario/vetcare-backend.git)
cd vetcare-backend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configuración de Entorno
Crea un archivo `.env` en la raíz del proyecto basándote en el siguiente ejemplo. Asegúrate de que las credenciales de MySQL coincidan con tu sistema.

```env
# .env
PORT=4000
DATABASE_URL="mysql://root:root@localhost:8889/vetcare_db"
JWT_SECRET="tu_secreto_super_seguro_para_firmar_tokens"
```

### 4. Migración de Base de Datos
Ejecuta el siguiente comando para que Prisma cree las tablas y relaciones en tu MySQL:

```bash
npx prisma migrate dev --name init
```

### 5. Ejecutar servidor de desarrollo
```bash
npm run dev
```
_El servidor iniciará en `http://localhost:4000`_

---

## 🏗 Arquitectura del Backend

El backend sigue una **Arquitectura en Capas (Layered Architecture)**, separando claramente las responsabilidades para facilitar el mantenimiento y las pruebas.

### Diagrama de Arquitectura
```mermaid
flowchart TD
    Client(("Cliente / Frontend")) -->|HTTP Request| Router["Router (Express)"]
    
    subgraph Backend ["VetCare API Server"]
        Router -->|Intercepta| Middleware["Middleware (Auth & Roles)"]
        Middleware -->|Pasa control| Controller["Controllers (Manejo HTTP)"]
        
        Controller -->|Valida datos| Zod["Zod Schemas"]
        Controller -->|Llama| Service["Services (Lógica de Negocio)"]
        
        Service -->|Consulta| Prisma["Prisma Client (ORM)"]
    end
    
    Prisma <-->|SQL| DB[("MySQL Database")]
```

### Estructura de Directorios
Organización modular del código fuente (`src/`):

```
vetcare-backend/
├── src/
│   ├── config/           # Variables de entorno y configuraciones globales
│   ├── controllers/      # Controladores: Reciben Request -> Envían Response
│   │   ├── auth.controller.ts
│   │   ├── pet.controller.ts
│   │   └── ...
│   ├── middleware/       # Middlewares: Auth (JWT) y Verificación de Roles
│   ├── prisma/           # Instancia única del cliente Prisma
│   ├── routes/           # Definición de endpoints y aplicación de middlewares
│   ├── services/         # Lógica de negocio pura y consultas a BD
│   ├── utils/            # Funciones auxiliares
│   └── app.ts            # Punto de entrada de la aplicación
├── prisma/
│   ├── migrations/       # Historial de cambios SQL (.sql)
│   └── schema.prisma     # Modelado de datos (La fuente de la verdad)
├── .env                  # Variables sensibles
└── package.json
```

---

## 📊 Modelo de Datos (Entity-Relationship)

El sistema utiliza una base de datos relacional robusta. A continuación se muestra el diagrama ER de las entidades principales.

```mermaid
erDiagram
    User {
        string id PK
        string email
        string password
        enum role "ADMIN, VET, RECEPTIONIST"
    }
    Owner ||--|{ Pet : "posee"
    Owner {
        string id PK
        string name
        string email
        string phone
    }
    Pet ||--o{ Appointment : "asiste"
    Pet ||--o{ Treatment : "recibe"
    Pet {
        string id PK
        string name
        string species
        string ownerId FK
    }
    Vet ||--o{ Appointment : "atiende"
    Vet {
        string id PK
        string name
        string specialty
    }
    Appointment {
        string id PK
        datetime date
        enum status "SCHEDULED, COMPLETED, CANCELLED"
    }
```

---

## 🔐 Seguridad y Autenticación

El sistema implementa un flujo seguro basado en estándares de la industria.

1.  **Encriptación:** Las contraseñas se almacenan hasheadas utilizando `bcrypt`.
2.  **Tokens:** Se utiliza JWT (JSON Web Tokens) para sesiones stateless.
3.  **RBAC:** Control de Acceso Basado en Roles (Admin, Vet, Recepcionista).

### Diagrama de Secuencia: Login y Petición Protegida

```mermaid
sequenceDiagram
    participant Client as Cliente
    participant API as API Routes
    participant Auth as Auth Middleware
    participant Controller as Controller

    %% Login Flow
    Note over Client, Controller: Flujo de Inicio de Sesión
    Client->>API: POST /api/auth/login
    API->>Controller: Valida credenciales (Bcrypt)
    Controller-->>Client: Retorna Token JWT

    %% Protected Route Flow
    Note over Client, Controller: Flujo de Ruta Protegida
    Client->>API: GET /api/pets (Header: Bearer Token)
    API->>Auth: Intercepta Petición
    Auth->>Auth: Verifica Firma y Expiración
    
    alt Token Válido
        Auth->>Controller: Pasa control (req.user)
        Controller-->>Client: Respuesta JSON (200 OK)
    else Token Inválido
        Auth-->>Client: Error 401 Unauthorized
    end
```

---

## 📦 Documentación de API (Postman)

Se incluye una colección completa de Postman para probar todos los endpoints del sistema.

* **Ubicación:** `/docs/VetCare_API.postman_collection.json`
* **Contenido:**

## Documentacion de API swagger
Se incluyen los ejemplos de los endpoit desde `http://localhost:4000/api/docs/`. Antes de hacerlo, ejecute el comando `npm run swagger`
    * Auth (Login/Register)
    * Gestión de Mascotas y Dueños
    * Agenda de Citas
    * Historial Médico (Tratamientos)

> **Nota:** La colección está configurada para usar variables de entorno. Al hacer login, el token se guarda automáticamente para las siguientes peticiones.
