// Configuracion que ContentService utiliza para conectarse con Supabase.
// Esta clave es publicable y puede estar en el navegador porque la seguridad real
// se controla mediante las politicas RLS. Nunca se debe poner aqui service_role.
export const environment = {
  // Indica que esta es la configuracion de desarrollo.
  production: false,
  supabaseUrl: 'https://fgdrpawvidgaxmxnwfdi.supabase.co',
  supabaseAnonKey: 'sb_publishable_EhyO0dbHFP76Qp7X8BS14Q_AcA77cym',
};
