# HernanRios - Reto Técnico de Listado de Películas

## Descripción

Este es un proyecto de muestra desarrollado en Angular para listar y filtrar películas. El proyecto utiliza Angular 16, TypeScript, y SASS, y sigue el patrón de diseño MVVM (Model-View-ViewModel). Además, utiliza Angular Material y Bootstrap para la interfaz de usuario y RxJS para la programación reactiva.

## Estructura del Proyecto

La estructura del proyecto está organizada siguiendo el patrón MVVM y las mejores prácticas para mantener la claridad y escalabilidad:

src/
|---app/
    |-- core/   --------- Para servicios singleton, interceptores, guards, etc.
    |-- features/ ------- Para características principales de la aplicación
    │   |-- movies/ ----- Toda la funcionalidad referente con películas
    │       |-- components/ --- Componentes standalone hijos
    │       │   |- movie-list.component.ts  (standalone)
    │       │   |- movie-filter.component.ts (standalone)
    │       |-- models/ -------- Interfaces para películas
    │       |-- services/ ------ Servicios específicos de películas
    │       |-- movies-container.component.ts  --------- Componente contenedor (standalone)
    |-- shared/ --------- Para componentes, directivas y pipes compartidos
    |-- app.routes.ts ------ Archivo de enrutamiento

## Tecnologías Utilizadas

- **Framework:** Angular (Versión 16)
- **Lenguaje de Programación:** TypeScript, HTML, CSS
- **Preprocesador:** SASS
- **Programación Reactiva:** RxJS
- **UI Libraries:** Angular Material, Bootstrap
- **Patrón de Diseño:** MVVM (Model-View-ViewModel)
- **Principios SOLID**

## Configuración del Proyecto

### Instalación de Dependencias

- Clona el proyecto desde GitHub usando el siguiente comando: 
    git clone https://github.com/hernanrios5353/Hernan-Rios.git

- Navega al directorio del proyecto:
    cd Hernan-Rios

- Instala las dependencias del proyecto:
    npm install

- Ejecuta el servidor de desarrollo de Angular:
    ng serve

- La aplicación estará disponible en http://localhost:4200/ por defecto.

