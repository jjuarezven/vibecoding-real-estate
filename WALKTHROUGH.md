# Walkthrough: Soporte Multi-Idioma (i18n)

Se ha completado la implementación completa del soporte multi-idioma para los idiomas **Español (ES)**, **Inglés (EN)** y **Francés (FR)** en toda la aplicación LuxeEstate.

---

## 1. Cambios Principales

### A. Diccionarios de Idiomas (`locales/`)
- `locales/es.json`: Español
- `locales/en.json`: Inglés
- `locales/fr.json`: Francés

Los diccionarios incluyen todas las áreas de la aplicación:
- **`navbar`**: Comprar / Alquilar / Vender / Guardados / Búsqueda / Perfil.
- **`hero`**: Título prefix y highlight ("Encuentra tu santuario" / "Find your sanctuary" / "Trouvez votre sanctuaire"), placeholder, botón de búsqueda, filtros y categorías (Todos, Casa, Apartamento, Villa, Ático).
- **`home`**: Colecciones destacadas, Nuevas en el mercado, pestañas (Comprar/Alquilar), conteo de propiedades y estados vacíos.
- **`badges`**: Traducción de insignias (`Exclusive` -> *Exclusiva*, `New Arrival` -> *Novedad*, `Design Award` -> *Premio de diseño*).
- **`gallery`**: Contador de fotos ("{count} fotos") y botón de ver más ("+{count} más").
- **`propertyCard`**: Etiquetas de venta/alquiler, precio mensual (`/mes`, `/mo`, `/mois`), habitaciones, baños y unidad de área (`m²`).
- **`propertyDetail`**: Ficha completa del inmueble (etiquetas de estado, especificaciones, descripción dinámica, ubicación, llamada a la acción y asesor).
- **`filtersModal`**: Modal de filtros traducido.
- **`pagination`**: Anterior, Siguiente y "Página X de Y".
- **`language`**: Nombres de idiomas.

---

### B. Selector de Idiomas con Banderas SVG Vectoriales
- **`components/FlagIcon.tsx`**: Renderiza banderas vectoriales SVG para inglés (`en`), español (`es`) y francés (`fr`).
- **`components/LanguageSelector.tsx`**: Selector accesible con cierre automático al hacer clic fuera y marcado del idioma activo.

---

### C. Persistencia en Cookie
- La preferencia del usuario se guarda en la cookie `NEXT_LOCALE` con una duración de 365 días mediante `js-cookie`.
- Si el usuario entra por primera vez, detecta automáticamente el idioma de su navegador (`navigator.language`).

---

### D. Componentes Actualizados
1. **`app/layout.tsx`**: Envoltorio global con `<LanguageProvider>`.
2. **`components/Navbar.tsx`**: Navegación traducida e inclusión de `<LanguageSelector />`.
3. **`components/HeroSection.tsx`**: Título, buscador, categorías y filtros interactivos traducidos.
4. **`components/HomeContent.tsx`**: Secciones, selector de pestañas, conteo de propiedades y estados vacíos.
5. **`components/FeaturedCard.tsx`**: Insignias, habitaciones, baños y unidad de área traducidas.
6. **`components/PropertyCard.tsx`**: Etiquetas de venta/alquiler y características traducidas.
7. **`components/PropertyGallery.tsx`**: Contador de fotos y etiqueta de más fotos traducidos.
8. **`components/PropertyDetailContent.tsx`**: Vista de detalle interactiva que recibe la propiedad.
9. **`app/properties/[slug]/page.tsx`**: Server Component que carga la propiedad y delega la visualización a `PropertyDetailContent`.
10. **`next.config.ts`**: Redirección permanente de `/propiedades/:slug` a `/properties/:slug` para preservar enlaces antiguos.
11. **`components/FiltersModal.tsx`**: Modal con opciones y amenidades traducidas.

---

## 2. Cómo agregar un nuevo idioma en el futuro

1. Crear el nuevo archivo JSON en `locales/<código>.json` (ejemplo: `locales/de.json` para alemán).
2. En `context/LanguageContext.tsx`:
   - Importar el nuevo JSON.
   - Añadir el código al tipo `SupportedLanguage`.
   - Añadirlo al mapa `locales` y a la lista `LANGUAGES`.
3. En `components/FlagIcon.tsx`:
   - Añadir el SVG de la bandera correspondiente para el nuevo idioma.

---

## 3. Validación

Ejecutar `npm run build` y `npm run lint` para validar los cambios.
