# VetCare System - Backend

Este repositorio contiene el backend para el **Sistema de Gestión de Clínicas Veterinarias (VetCare System)**. Esta API RESTful está construida con Node.js, Express, TypeScript y Prisma, y se encarga de gestionar toda la lógica de negocio, la base de datos y la autenticación.

## Tecnologías Utilizadas

* **Node.js**: Entorno de ejecución de JavaScript.
* **Express**: Framework de servidor web para Node.js.
* **TypeScript**: Superset de JavaScript que añade tipado estático.
* **Prisma ORM**: ORM de "siguiente generación" para Node.js y TypeScript.
* **MySQL**: Base de datos relacional.
* **JSON Web Tokens (JWT)**: Para autenticación y protección de rutas.
* **Zod**: Para validación de esquemas y datos de entrada.
* **Bcrypt.js**: Para hashing (encriptación) de contraseñas.
* **ts-node-dev**: Para recarga automática del servidor en desarrollo.

---

## Configuración del Entorno de Desarrollo

Sigue estos pasos para levantar el proyecto en tu máquina local.

### 1. Prerrequisitos

* **Node.js** (v18 o superior).
* **NPM** (incluido con Node.js).
* **MAMP** (o cualquier servidor MySQL local). Este proyecto está pre-configurado con las credenciales por defecto de MAMP.
* Un cliente de API como **Postman** o **Thunder Client** (VS Code) para probar los endpoints.

### 2. Instalación

1.  Clona el repositorio:
    ```bash
    git clone [https://github.com/tu-usuario/vetcare-backend.git](https://github.com/tu-usuario/vetcare-backend.git)
    ```

2.  Navega a la carpeta del proyecto:
    ```bash
    cd vetcare-backend
    ```

3.  Instala todas las dependencias:
    ```bash
    npm install
    ```

### 3. Configuración de la Base de Datos (con MAMP)

1.  **Inicia MAMP** y asegúrate de que el servidor MySQL esté corriendo.
2.  Abre la herramienta **phpMyAdmin** desde el panel de MAMP.
3.  Crea una nueva base de datos:
    * Nombre de la base de datos: `vetcare_db`
    * Cotejamiento: `utf8mb4_general_ci` (recomendado)

### 4. Variables de Entorno

Este proyecto usa un archivo `.env` para manejar las variables de entorno.

1.  Crea un archivo llamado `.env` en la raíz del proyecto.
2.  Copia y pega el siguiente contenido. Estas son las credenciales *por defecto* de MAMP:

    ```env
    # URL de conexión a la Base de Datos (MAMP usa 'root'/'root' y el puerto 8889 por defecto)
    DATABASE_URL="mysql://root:root@localhost:8889/vetcare_db"

    # Puerto en el que correrá el servidor de Node
    PORT=4000

    # Secreto para firmar los JSON Web Tokens
    JWT_SECRET="un-secreto-muy-fuerte-y-dificil-de-adivinar-12345"
    ```
    > **Nota:** Si tu MAMP usa un puerto diferente para MySQL (como `3306`), ajústalo en la `DATABASE_URL`.

### 5. Sincronizar la Base de Datos

Una vez configurado el `.env`, corre el siguiente comando para que Prisma cree todas las tablas y relaciones en tu base de datos `vetcare_db`:

```bash
npx prisma migrate dev
```

### 6. Ejecucion del proyecto
Para iniciar el servidor en modo de desarrollo (con recarga automática), usa:
```Bash
npm run dev
```
