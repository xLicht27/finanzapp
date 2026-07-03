import { StyleSheet } from 'react-native';

// Estilos de Perfil - Sección superior del avatar y detalles de usuario
export const perfilEstilos = (colores) => StyleSheet.create({
  fondoPrincipal: {
    flex: 1,
    backgroundColor: colores.fondoPrimario,
  },
  scroll: {
    padding: 20,
    paddingTop: 50,
  },
  cabecera: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  botonVolver: {
    padding: 4,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '700',
  },
  contenedorAvatar: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 2,
  },
  nombre: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  correo: {
    fontSize: 14,
  },
  // Estilos de Perfil - Tarjeta de detalles y filas de información
  tarjeta: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
  },
  etiquetaTarjeta: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 14,
  },
  filaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  textoInfo: {
    fontSize: 14,
  },
  // Estilos de Perfil - Botón de cierre de sesión
  botonCerrarSesion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(248, 81, 73, 0.1)',
    borderRadius: 10,
    paddingVertical: 14,
    borderWidth: 1,
  },
  textoCerrarSesion: {
    fontSize: 14,
    fontWeight: '600',
  },
});
