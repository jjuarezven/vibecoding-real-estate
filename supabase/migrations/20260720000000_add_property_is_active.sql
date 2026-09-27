ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;

-- Los registros existentes quedan activos por defecto para conservar su visibilidad.
