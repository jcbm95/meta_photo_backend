# Meta photo

Backend en nodeJs

## Requisitos

- Data enrichment
- Filtering
- Pagination

## Configuración

1. Clona el repositorio: `git clone https://github.com/jcbm95/meta_photo_backend.git`
2. Instala las dependencias: `npm install`
3. Configura las variables de entorno en un archivo `.env`
4. Ejecuta el proyecto: `npm run dev`

## Estructura del Proyecto

El proyecto "Meta Photo" para la parte backend sigue una estructura organizada y modular. Cuento con controladores y rutas separadas para cada recurso (álbumes, fotos, todos, usuarios), lo cual facilita el mantenimiento y la escalabilidad. La configuración está claramente dividida entre desarrollo y producción, y el uso de TypeScript agrega tipado estático, lo que puede ayudar a prevenir errores comunes.

# Estructura del Proyecto Meta Photo

## Carpetas y Archivos Principales

1. **dist**

   - Contiene los archivos compilados y listos para producción. Aquí podrían estar los archivos JavaScript transpilados si estás usando TypeScript en tu proyecto.

2. **config**

   - `envs.js`: Archivo de configuración para manejar variables de entorno en JavaScript.

3. **presentation/todos**

   - `controller.js`: Controlador para manejar la lógica de negocio relacionada con "todos".
   - `routes.js`: Archivo de rutas que define los endpoints para los "todos".
   - `server.js`: Archivo del servidor para inicializar y configurar la aplicación específica de "todos".

4. **keys**

   - `server.crt` y `server.key`: Certificados SSL para habilitar HTTPS en el servidor.

5. **node_modules**

   - Carpeta que contiene todas las dependencias del proyecto instaladas a través de npm.

6. **public**

   - `css`: Carpeta para hojas de estilo CSS.
   - `index.html`: Archivo HTML principal que probablemente sirve como entrada para la aplicación web.

7. **src**

   - **config**
     - `envs.ts`: Archivo de configuración para variables de entorno en TypeScript.
   - **dtos**
     - `get-album.ts`, `get-photos.ts`, `get-users.ts`: Data Transfer Objects (DTOs) que definen la estructura de datos para las solicitudes y respuestas en estos endpoints.
   - **presentation**
     - **album**
       - `controller.ts`: Controlador para manejar la lógica de negocio relacionada con los álbumes.
       - `routes.ts`: Archivo de rutas que define los endpoints para los álbumes.
     - **photos**
       - `controller.ts`: Controlador para manejar la lógica de negocio relacionada con las fotos.
       - `routes.ts`: Archivo de rutas que define los endpoints para las fotos.
     - **todos**
       - `controller.ts`: Controlador para manejar la lógica de negocio relacionada con "todos".
       - `routes.ts`: Archivo de rutas que define los endpoints para los "todos".
     - **users**
       - `controller.ts`: Controlador para manejar la lógica de negocio relacionada con los usuarios.
       - `routes.ts`: Archivo de rutas que define los endpoints para los usuarios.
   - `server.ts`: Archivo del servidor para inicializar y configurar la aplicación principal en TypeScript.
   - `app.ts`: Archivo principal de configuración de la aplicación en TypeScript.

8. **.env**

   - Archivo que contiene variables de entorno que no deben ser compartidas públicamente (como claves API, URLs de bases de datos, etc.).

9. **.env.template**
   - Plantilla para el archivo .env, útil para otros desarrolladores que necesiten saber qué variables de entorno deben configurar.
