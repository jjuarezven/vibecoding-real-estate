# LuxeEstate

Aplicación inmobiliaria construida con Next.js, Supabase y Tailwind CSS.

## Desarrollo

Instala las dependencias y ejecuta el servidor:

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Copia `.env.template` como `.env.local` y completa las variables públicas de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase-anon-key>
```

La `anon key` es una clave pública pensada para el cliente. Nunca agregues una `service_role key` al frontend ni al repositorio.

## Login con Google y GitHub

La ruta de autenticación social es `/login` y el callback es:

```text
http://localhost:3000/auth/callback
```

En producción reemplaza el dominio por el dominio real de la aplicación.

### Supabase

En el panel de Supabase:

1. Ve a **Authentication → Providers**.
2. Activa **Google** y/o **GitHub**.
3. Introduce el Client ID y Client Secret de cada proveedor.
4. En **Authentication → URL Configuration**, configura:
   - **Site URL**: `http://localhost:3000` durante el desarrollo.
   - **Additional Redirect URLs**: `http://localhost:3000/auth/callback` y la URL de producción correspondiente.

La callback URL que deben aceptar Google y GitHub normalmente tiene este formato:

```text
https://<project-ref>.supabase.co/auth/v1/callback
```

Usa la URL exacta mostrada por tu proyecto Supabase.

### Google Cloud Console

1. Crea o selecciona un proyecto en Google Cloud.
2. Configura la pantalla de consentimiento OAuth.
3. Crea un OAuth Client ID de tipo **Web application**.
4. Agrega la callback URL de Supabase como **Authorized redirect URI**.
5. Copia el Client ID y Client Secret en el proveedor Google de Supabase.

### GitHub OAuth App

1. En GitHub abre **Settings → Developer settings → OAuth Apps**.
2. Crea una nueva OAuth App.
3. Configura la homepage de la aplicación.
4. Agrega la callback URL de Supabase como **Authorization callback URL**.
5. Copia el Client ID y genera un Client Secret para introducirlos en Supabase.

## Flujo implementado

- `/login`: interfaz basada en el diseño social de referencia.
- Google Sign In mediante `supabase.auth.signInWithOAuth`.
- GitHub Sign In mediante `supabase.auth.signInWithOAuth`.
- `/auth/callback`: intercambio del código OAuth por una sesión.
- Middleware SSR para refrescar cookies de sesión.
- Estado global con `AuthProvider` y `useAuth`.
- Avatar de Google/GitHub en el navbar.
- Fallback con iniciales si no existe o falla el avatar.
- Menú de usuario y cierre de sesión.

## Validación

```bash
npm run build
npm run lint
```
