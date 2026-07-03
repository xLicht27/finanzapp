import { StyleSheet } from 'react-native';

// Estilos de Login - Estructura de fondo y scroll
export const loginEstilos = (colores) => StyleSheet.create({
  fondoPrincipal: {
    flex: 1,
    backgroundColor: colores.fondoPrimario,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 28,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 24,
  },
  // Estilos de Login - Cabecera, títulos y subtítulos
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: colores.textoPrimario,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 14,
    color: colores.textoSecundario,
    textAlign: 'center',
    marginBottom: 32,
  },
  // Estilos de Login - Mensaje de error e inputs
  contenedorError: {
    backgroundColor: 'rgba(248, 81, 73, 0.12)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colores.peligro,
  },
  textoError: {
    color: colores.peligro,
    fontSize: 13,
    textAlign: 'center',
  },
  grupoEntrada: {
    marginBottom: 16,
  },
  etiqueta: {
    color: colores.textoSecundario,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  contenedorInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colores.fondoTarjeta,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colores.borde,
    paddingHorizontal: 14,
    paddingVertical: 2,
  },
  iconoInput: {
    marginRight: 10,
  },
  entrada: {
    flex: 1,
    color: colores.textoPrimario,
    fontSize: 14,
    paddingVertical: 14,
  },
  // Estilos de Login - Enlace de olvido de contraseña y registro
  olvidaste: {
    alignSelf: 'flex-end',
    marginBottom: 8,
    marginTop: -4,
  },
  textoOlvidaste: {
    color: colores.accentVerde,
    fontSize: 13,
  },
  contenedorRegistro: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  textoRegistro: {
    fontSize: 14,
    color: colores.textoSecundario,
  },
  enlaceRegistro: {
    fontSize: 14,
    color: colores.accentVerde,
    fontWeight: '600',
  },
});
