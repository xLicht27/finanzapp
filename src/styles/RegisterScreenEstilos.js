import { StyleSheet } from 'react-native';

// Estilos de Registro - Indicador superior de pasos
export const registroEstilos = (colores) => StyleSheet.create({
  fondoPrincipal: {
    flex: 1,
    backgroundColor: colores.fondoPrimario,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 28,
  },
  indicadorContenedor: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 20,
  },
  indicadorPaso: {
    width: 28,
    height: 4,
    borderRadius: 2,
    backgroundColor: colores.borde,
  },
  indicadorActivo: {
    backgroundColor: colores.accentVerde,
  },
  // Estilos de Registro - Títulos, subtítulos y badges
  pasoBadge: {
    color: colores.accentVerde,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginBottom: 6,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: colores.textoPrimario,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 13,
    color: colores.textoSecundario,
    textAlign: 'center',
    marginBottom: 28,
  },
  // Estilos de Registro - Campos de entrada, mensajes de error y volver
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
  volverContenedor: {
    alignItems: 'center',
    marginTop: 16,
  },
  textoVolver: {
    color: colores.textoSecundario,
    fontSize: 13,
  },
});
