# 🛒 API de Tienda Virtual

Esta es una API REST construida con Node.js, Express y MySQL para gestionar productos y categorías de una tienda virtual. Utiliza una arquitectura **Modelo-Vista-Controlador (MVC)**, con validaciones robustas gracias a **Zod**, y se ejecuta en un entorno Docker para facilitar su despliegue y desarrollo.

---

## 📌 ¿Qué hace esta API?

- Permite registrar, actualizar, consultar y eliminar **categorías**.
- Permite registrar, actualizar, consultar y eliminar **productos**, asignándolos a una categoría.
- Asegura que los datos enviados cumplan validaciones como:
  - El nombre de productos y categorías debe ser único.
  - No se pueden crear productos con categorías inexistentes.
  - No se pueden eliminar categorías si tienen productos asignados.

---

## 🚀 Cómo ejecutar el proyecto

### 🛠 Requisitos

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [npm](https://www.npmjs.com/)

### ⚙️ Pasos para iniciar

1. Clona este repositorio o copia los archivos a tu máquina.
2. Crea el archivo `.env` con los datos de conexión:

   ```env
   DB_HOST=localhost
   DB_PORT=3308
   DB_USER=unah
   DB_PASSWORD=unah1234
   DB_NAME=tienda
   PORT=3000
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Levanta la base de datos con Docker:

   ```bash
   docker compose up -d
   ```

5. Ejecuta el servidor:
   ```bash
   npm run dev
   ```

---

## 🧪 Cómo probar los endpoints

Puedes probar los endpoints con herramientas como:

- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- Extensión de VS Code: **REST Client** usando el archivo `api.http` incluido

---

## 📚 Endpoints

### 🗂 Categorías

| Método | Ruta              | Descripción                   |
| ------ | ----------------- | ----------------------------- |
| GET    | `/categorias`     | Lista todas las categorías    |
| GET    | `/categorias/:id` | Obtiene una categoría por ID  |
| POST   | `/categorias`     | Crea una nueva categoría      |
| PUT    | `/categorias/:id` | Edita una categoría existente |
| DELETE | `/categorias/:id` | Elimina una categoría por ID  |

📝 **Ejemplo de creación:**

```json
POST /categorias
{
  "nombre": "Electrónica"
}
```

---

### 🛒 Productos

| Método | Ruta             | Descripción                 |
| ------ | ---------------- | --------------------------- |
| GET    | `/productos`     | Lista todos los productos   |
| GET    | `/productos/:id` | Obtiene un producto por ID  |
| POST   | `/productos`     | Crea un nuevo producto      |
| PUT    | `/productos/:id` | Edita un producto existente |
| DELETE | `/productos/:id` | Elimina un producto por ID  |

📝 **Ejemplo de creación:**

```json
POST /productos
{
  "nombre": "Laptop Gamer",
  "precio": 1499.99,
  "descripcion": "Laptop con GPU RTX 4060 y 16GB RAM",
  "disponible": true,
  "categoria_id": 1
}
```

---

## ✅ Validaciones importantes

- El nombre de una categoría debe ser **único y obligatorio**.
- No se puede eliminar una categoría si tiene productos asignados.
- Al crear un producto:

  - El `nombre` debe ser único.
  - El `precio` debe ser mayor a cero.
  - `categoria_id` debe existir en la base de datos.
  - El campo `disponible` es opcional (por defecto: `true`).

---

## 🐬 Base de datos (Docker)

Se incluye un archivo `docker-compose.yml` que levanta un contenedor de **MySQL 8** con los datos necesarios para iniciar. La base de datos se inicializa automáticamente con las tablas:

- `categorias`
- `productos`

Puedes personalizar los datos iniciales editando el archivo `init/init.sql`.

---

## 🧑‍💻 Autor

Desarrollado por **David Gevawer** para fines académicos y prácticos.

---

## 📂 Licencia

Este proyecto es de uso libre para fines educativos y de aprendizaje. No se recomienda usarlo directamente en producción sin mejoras de seguridad y autenticación.
